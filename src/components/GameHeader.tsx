import { SettingsIcon } from './SettingsIcon';
import { SpeakerIcon } from './SpeakerIcon';

interface GameHeaderProps {
  playerName: string;
  currentLevelId: number;
  totalLevels: number;
  totalStars: number;
  isMusicEnabled: boolean;
  onToggleMusic: () => void;
  onOpenSettings: () => void;
}

export function GameHeader({
  playerName,
  currentLevelId,
  totalLevels,
  totalStars,
  isMusicEnabled,
  onToggleMusic,
  onOpenSettings,
}: GameHeaderProps) {
  return (
    <header className="grid gap-3 rounded-[2rem] border-4 border-white/70 bg-white/90 p-3 shadow-lg shadow-emerald-200/60 backdrop-blur-sm sm:flex sm:items-center sm:justify-between sm:rounded-4xl">
      <div>
        <p className="text-sm font-bold text-slate-500">Halo, {playerName}</p>
        <h1 className="text-xl font-black text-emerald-700">Level {currentLevelId} dari {totalLevels}</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
        <span className="flex min-h-11 items-center justify-center gap-1.5 rounded-2xl bg-yellow-200 px-3 py-2 text-base font-black text-yellow-800 shadow-md shadow-yellow-100">
          <span className="h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_0_0.18rem_rgba(250,204,21,0.3)]" />
          {totalStars}
        </span>
        <button
          type="button"
          onClick={onToggleMusic}
          className="flex min-h-11 items-center justify-center rounded-2xl bg-pink-200 px-3 text-pink-800 shadow-md shadow-pink-100 transition active:scale-95 sm:min-h-12"
          aria-label={isMusicEnabled ? 'Matikan musik' : 'Nyalakan musik'}
        >
          <SpeakerIcon isEnabled={isMusicEnabled} />
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex min-h-11 items-center justify-center rounded-2xl bg-emerald-100 px-3 text-emerald-800 shadow-md shadow-emerald-100 transition active:scale-95 sm:min-h-12"
          aria-label="Buka pengaturan"
        >
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
}
