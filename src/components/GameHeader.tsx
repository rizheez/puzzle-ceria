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
    <header className="flex items-center justify-between gap-3 rounded-3xl bg-white/90 p-3 shadow-lg shadow-sky-100">
      <div>
        <p className="text-sm font-bold text-slate-500">Halo, {playerName}</p>
        <h1 className="text-xl font-black text-sky-700">Level {currentLevelId} dari {totalLevels}</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-2xl bg-yellow-200 px-3 py-2 text-base font-black text-yellow-800">★ {totalStars}</span>
        <button type="button" onClick={onToggleMusic} className="min-h-12 rounded-2xl bg-pink-200 px-3 font-black text-pink-800">
          {isMusicEnabled ? 'Musik Nyala' : 'Musik Mati'}
        </button>
        <button type="button" onClick={onOpenSettings} className="min-h-12 rounded-2xl bg-slate-200 px-3 font-black text-slate-700">
          Atur
        </button>
      </div>
    </header>
  );
}
