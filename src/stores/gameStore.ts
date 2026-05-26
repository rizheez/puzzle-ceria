import { create } from 'zustand';
import { levels } from '../data/levels';
import { playEffect, setMusicEnabled } from '../lib/audio';
import { STAR_REWARD_PER_LEVEL } from '../lib/constants';
import { clearProgress, loadProgress, saveProgress, type GameProgress } from '../lib/storage';

interface SelectedLetter {
  letter: string;
  choiceIndex: number;
}

type FeedbackKind = 'idle' | 'success' | 'warning' | 'error';

interface Feedback {
  kind: FeedbackKind;
  message: string;
}

interface LetterHint {
  letter: string;
  slotIndex: number;
  slotNumber: number;
}

interface GameState extends GameProgress {
  isLoaded: boolean;
  selectedLetters: Array<SelectedLetter | null>;
  feedback: Feedback;
  wrongAttemptCount: number;
  isSuccessModalOpen: boolean;
  shouldShake: boolean;
  loadSavedProgress: () => Promise<void>;
  startGame: (playerName: string) => Promise<void>;
  selectLetter: (letter: string, choiceIndex: number) => void;
  removeLetter: (slotIndex: number) => void;
  resetAnswer: () => void;
  checkAnswer: () => Promise<void>;
  goToNextLevel: () => Promise<void>;
  closeSuccessModal: () => void;
  toggleMusic: () => Promise<void>;
  toggleSound: () => Promise<void>;
  resetProgress: () => Promise<void>;
}

const initialProgress: GameProgress = {
  playerName: '',
  currentLevelId: 1,
  unlockedLevelId: 1,
  totalStars: 0,
  completedLevelIds: [],
  isMusicEnabled: true,
  isSoundEnabled: true,
};

const emptyFeedback: Feedback = { kind: 'idle', message: '' };
const HINT_ATTEMPT_THRESHOLD = 2;

export const useGameStore = create<GameState>((set, get) => ({
  ...initialProgress,
  isLoaded: false,
  selectedLetters: createEmptyAnswer(1),
  feedback: emptyFeedback,
  wrongAttemptCount: 0,
  isSuccessModalOpen: false,
  shouldShake: false,

  loadSavedProgress: async () => {
    const savedProgress = await loadProgress();
    const progress = savedProgress ?? initialProgress;

    set({
      ...progress,
      isLoaded: true,
      selectedLetters: createEmptyAnswer(progress.currentLevelId),
      feedback: emptyFeedback,
      wrongAttemptCount: 0,
      isSuccessModalOpen: false,
      shouldShake: false,
    });
    setMusicEnabled(progress.isMusicEnabled);
  },

  startGame: async (playerName) => {
    const progress: GameProgress = {
      ...initialProgress,
      playerName: playerName.trim(),
    };

    await persist(progress);
    set({
      ...progress,
      selectedLetters: createEmptyAnswer(progress.currentLevelId),
      feedback: { kind: 'success', message: `Selamat bermain, ${progress.playerName}!` },
      wrongAttemptCount: 0,
      isSuccessModalOpen: false,
      shouldShake: false,
    });
    setMusicEnabled(progress.isMusicEnabled);
  },

  selectLetter: (letter, choiceIndex) => {
    const selectedLetters = get().selectedLetters;

    if (selectedLetters.some((selectedLetter) => selectedLetter?.choiceIndex === choiceIndex)) {
      return;
    }

    const emptyIndex = selectedLetters.findIndex((selectedLetter) => selectedLetter === null);

    if (emptyIndex === -1) {
      return;
    }

    const nextSelectedLetters = [...selectedLetters];
    nextSelectedLetters[emptyIndex] = { letter, choiceIndex };
    playEffect('tap', get().isSoundEnabled);
    set({ selectedLetters: nextSelectedLetters, feedback: emptyFeedback, shouldShake: false });
  },

  removeLetter: (slotIndex) => {
    const nextSelectedLetters = [...get().selectedLetters];
    nextSelectedLetters[slotIndex] = null;
    playEffect('tap', get().isSoundEnabled);
    set({ selectedLetters: nextSelectedLetters, feedback: emptyFeedback, shouldShake: false });
  },

  resetAnswer: () => {
    playEffect('tap', get().isSoundEnabled);
    set({ selectedLetters: createEmptyAnswer(get().currentLevelId), feedback: emptyFeedback, wrongAttemptCount: 0, shouldShake: false });
  },

  checkAnswer: async () => {
    const state = get();
    const level = getCurrentLevel(state.currentLevelId);
    const answer = state.selectedLetters.map((selectedLetter) => selectedLetter?.letter ?? '').join('').toUpperCase();

    if (answer.length < level.word.length) {
      const wrongAttemptCount = state.wrongAttemptCount + 1;

      playEffect('wrong', state.isSoundEnabled);
      set({ feedback: { kind: 'warning', message: 'Susun hurufnya dulu ya!' }, wrongAttemptCount, shouldShake: true });
      resetShake(set);
      return;
    }

    if (answer !== level.word) {
      const wrongAttemptCount = state.wrongAttemptCount + 1;
      const letterHint = getLetterHint(level.word, state.selectedLetters);
      const message = wrongAttemptCount >= HINT_ATTEMPT_THRESHOLD && letterHint ? `Belum tepat, isi kotak ke-${letterHint.slotNumber} dengan huruf ${letterHint.letter} ya!` : 'Hampir benar, coba lagi ya!';

      playEffect('wrong', state.isSoundEnabled);
      set({ feedback: { kind: 'error', message }, wrongAttemptCount, shouldShake: true });
      resetShake(set);
      return;
    }

    const isCompleted = state.completedLevelIds.includes(level.id);
    const completedLevelIds = isCompleted ? state.completedLevelIds : [...state.completedLevelIds, level.id];
    const unlockedLevelId = Math.min(Math.max(state.unlockedLevelId, level.id + 1), levels.length);
    const totalStars = isCompleted ? state.totalStars : state.totalStars + STAR_REWARD_PER_LEVEL;
    const progress = toProgress({ ...state, completedLevelIds, unlockedLevelId, totalStars });

    await persist(progress);
    playEffect('correct', state.isSoundEnabled);
    set({
      completedLevelIds,
      unlockedLevelId,
      totalStars,
      feedback: { kind: 'success', message: 'Hebat! Jawaban kamu benar!' },
      wrongAttemptCount: 0,
      isSuccessModalOpen: true,
      shouldShake: false,
    });
  },

  goToNextLevel: async () => {
    const state = get();
    const nextLevelId = Math.min(state.currentLevelId + 1, levels.length);
    const progress = toProgress({ ...state, currentLevelId: nextLevelId });

    await persist(progress);
    set({
      currentLevelId: nextLevelId,
      selectedLetters: createEmptyAnswer(nextLevelId),
      wrongAttemptCount: 0,
      feedback:
        state.currentLevelId === levels.length
          ? { kind: 'success', message: 'Keren! Semua level sudah selesai!' }
          : emptyFeedback,
      isSuccessModalOpen: false,
      shouldShake: false,
    });
  },

  closeSuccessModal: () => set({ isSuccessModalOpen: false }),

  toggleMusic: async () => {
    const isMusicEnabled = !get().isMusicEnabled;
    const progress = toProgress({ ...get(), isMusicEnabled });

    await persist(progress);
    setMusicEnabled(isMusicEnabled);
    set({ isMusicEnabled });
  },

  toggleSound: async () => {
    const isSoundEnabled = !get().isSoundEnabled;
    const progress = toProgress({ ...get(), isSoundEnabled });

    await persist(progress);
    set({ isSoundEnabled });
  },

  resetProgress: async () => {
    await clearProgress();
    setMusicEnabled(initialProgress.isMusicEnabled);
    set({
      ...initialProgress,
      selectedLetters: createEmptyAnswer(initialProgress.currentLevelId),
      feedback: emptyFeedback,
      wrongAttemptCount: 0,
      isSuccessModalOpen: false,
      shouldShake: false,
    });
  },
}));

function getCurrentLevel(levelId: number) {
  return levels.find((level) => level.id === levelId) ?? levels[0];
}

function createEmptyAnswer(levelId: number): Array<SelectedLetter | null> {
  return Array.from({ length: getCurrentLevel(levelId).word.length }, () => null);
}

function getLetterHint(word: string, selectedLetters: Array<SelectedLetter | null>): LetterHint | undefined {
  const mismatchIndex = selectedLetters.findIndex((selectedLetter, index) => selectedLetter?.letter !== word[index]);

  if (mismatchIndex === -1) {
    return undefined;
  }

  return {
    letter: word[mismatchIndex],
    slotIndex: mismatchIndex,
    slotNumber: mismatchIndex + 1,
  };
}

function toProgress(state: GameProgress): GameProgress {
  return {
    playerName: state.playerName,
    currentLevelId: state.currentLevelId,
    unlockedLevelId: state.unlockedLevelId,
    totalStars: state.totalStars,
    completedLevelIds: state.completedLevelIds,
    isMusicEnabled: state.isMusicEnabled,
    isSoundEnabled: state.isSoundEnabled,
  };
}

async function persist(progress: GameProgress): Promise<void> {
  await saveProgress(progress);
}

function resetShake(set: (partial: Partial<GameState>) => void): void {
  window.setTimeout(() => set({ shouldShake: false }), 450);
}
