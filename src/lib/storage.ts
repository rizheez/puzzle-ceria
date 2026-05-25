import { Preferences } from '@capacitor/preferences';
import { GAME_PROGRESS_STORAGE_KEY } from './constants';

export interface GameProgress {
  playerName: string;
  currentLevelId: number;
  unlockedLevelId: number;
  totalStars: number;
  completedLevelIds: number[];
  isMusicEnabled: boolean;
  isSoundEnabled: boolean;
}

export async function loadProgress(): Promise<GameProgress | null> {
  const value = await readStoredValue();

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as GameProgress;
  } catch {
    return null;
  }
}

export async function saveProgress(progress: GameProgress): Promise<void> {
  const value = JSON.stringify(progress);

  try {
    await Preferences.set({ key: GAME_PROGRESS_STORAGE_KEY, value });
  } catch {
    localStorage.setItem(GAME_PROGRESS_STORAGE_KEY, value);
  }
}

export async function clearProgress(): Promise<void> {
  try {
    await Preferences.remove({ key: GAME_PROGRESS_STORAGE_KEY });
  } catch {
    localStorage.removeItem(GAME_PROGRESS_STORAGE_KEY);
  }
}

async function readStoredValue(): Promise<string | null> {
  try {
    const result = await Preferences.get({ key: GAME_PROGRESS_STORAGE_KEY });
    return result.value;
  } catch {
    return localStorage.getItem(GAME_PROGRESS_STORAGE_KEY);
  }
}
