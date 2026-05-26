import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnswerSlot } from '../components/AnswerSlot';
import { ForestMascot } from '../components/ForestMascot';
import { GameHeader } from '../components/GameHeader';
import { ImageClueCard } from '../components/ImageClueCard';
import { LetterTile } from '../components/LetterTile';
import { SettingsModal } from '../components/SettingsModal';
import { ForestBackground } from '../components/ForestBackground';
import { SuccessModal } from '../components/SuccessModal';
import { levels } from '../data/levels';
import { useGameStore } from '../stores/gameStore';

const HINT_ATTEMPT_THRESHOLD = 2;

interface LetterHint {
  letter: string;
  slotIndex: number;
  slotNumber: number;
}

export function GamePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const state = useGameStore();
  const level = levels.find((item) => item.id === state.currentLevelId) ?? levels[0];
  const usedChoiceIndexes = state.selectedLetters.map((selectedLetter) => selectedLetter?.choiceIndex).filter((index) => index !== undefined);
  const isLastLevel = level.id === levels.length;
  const isCheckAnswerDisabled = isLastLevel && state.completedLevelIds.includes(level.id);
  const letterHint = getLetterHint(level.word, state.selectedLetters);
  const shouldShowLetterHint = state.wrongAttemptCount >= HINT_ATTEMPT_THRESHOLD && !isCheckAnswerDisabled && letterHint !== undefined;
  const mascotMood = state.feedback.kind === 'success' ? 'cheering' : shouldShowLetterHint ? 'thinking' : 'happy';
  const mascotMessage = getMascotMessage(state.feedback.kind, shouldShowLetterHint, letterHint);

  return (
    <main className="mobile-safe-area relative min-h-screen overflow-x-hidden bg-linear-to-br from-sky-200 via-cyan-100 to-lime-100">
      <ForestBackground />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col gap-4 sm:min-h-[calc(100vh-3rem)]">
        <GameHeader
          playerName={state.playerName}
          currentLevelId={level.id}
          totalLevels={levels.length}
          totalStars={state.totalStars}
          isMusicEnabled={state.isMusicEnabled}
          onToggleMusic={() => void state.toggleMusic()}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:items-start">
          <div className="grid gap-4">
            <ImageClueCard level={level} />
            <ForestMascot mood={mascotMood} message={mascotMessage} />
          </div>

          <div className="grid gap-4">
            <section className="rounded-[2rem] border-4 border-white/70 bg-white/90 p-4 shadow-xl shadow-emerald-200/60 backdrop-blur-sm sm:rounded-4xl lg:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-emerald-600">Susun kata</p>
                  <h2 className="text-2xl font-black text-slate-700">{level.label}</h2>
                </div>
                <span className="rounded-2xl bg-emerald-100 px-3 py-2 font-black text-emerald-800">Level {level.id}</span>
              </div>

              <motion.div animate={state.shouldShake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }} className="mt-5 flex flex-wrap justify-center gap-2">
                {state.selectedLetters.map((selectedLetter, index) => (
                  <AnswerSlot key={`${level.id}-${index}`} letter={selectedLetter?.letter} index={index} isHinted={shouldShowLetterHint && index === letterHint?.slotIndex} onRemove={state.removeLetter} />
                ))}
              </motion.div>

              {state.feedback.message ? (
                <p className={`mt-4 rounded-2xl p-3 text-center font-black ${state.feedback.kind === 'success' ? 'bg-lime-100 text-lime-800' : state.feedback.kind === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-rose-100 text-rose-800'}`}>
                  {state.feedback.message}
                </p>
              ) : null}
            </section>

            <section className="rounded-[2rem] border-4 border-white/70 bg-white/90 p-4 shadow-xl shadow-emerald-200/60 backdrop-blur-sm sm:rounded-4xl lg:p-5">
              <div className="flex flex-wrap justify-center gap-3">
                {level.letters.map((letter, index) => (
                  <LetterTile key={`${letter}-${index}`} letter={letter} index={index} isUsed={usedChoiceIndexes.includes(index)} isHinted={shouldShowLetterHint && letter === letterHint?.letter} onSelect={state.selectLetter} />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => void state.checkAnswer()}
                  disabled={isCheckAnswerDisabled}
                  className="min-h-14 rounded-2xl bg-lime-400 px-4 text-lg font-black text-lime-950 shadow-lg shadow-lime-200 transition active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                  Cek Jawaban
                </button>
                <button type="button" onClick={state.resetAnswer} className="min-h-14 rounded-2xl bg-orange-300 px-4 text-lg font-black text-orange-950 shadow-lg shadow-orange-200">
                  Ulangi
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={state.isSuccessModalOpen} isLastLevel={isLastLevel} onNext={() => void state.goToNextLevel()} onClose={state.closeSuccessModal} />
      <SettingsModal
        isOpen={isSettingsOpen}
        onResetProgress={() => {
          void state.resetProgress();
          setIsSettingsOpen(false);
        }}
        onClose={() => setIsSettingsOpen(false)}
      />
    </main>
  );
}

function getMascotMessage(feedbackKind: string, shouldShowLetterHint: boolean, letterHint?: LetterHint): string {
  if (feedbackKind === 'success') {
    return 'Hebat! Kamu berhasil menyusun katanya.';
  }

  if (shouldShowLetterHint && letterHint) {
    return `Belum tepat, kotak ke-${letterHint.slotNumber} perlu huruf ${letterHint.letter}.`;
  }

  return 'Lihat gambarnya, pilih huruf, lalu susun katanya.';
}

function getLetterHint(word: string, selectedLetters: Array<{ letter: string } | null>): LetterHint | undefined {
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
