import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

interface StartPageProps {
  savedPlayerName: string;
  isMusicEnabled: boolean;
  onStart: (playerName: string) => void;
  onContinue: () => void;
  onToggleMusic: () => void;
}

export function StartPage({ savedPlayerName, isMusicEnabled, onStart, onContinue, onToggleMusic }: StartPageProps) {
  const [playerName, setPlayerName] = useState(savedPlayerName);
  const canStart = playerName.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (canStart) {
      onStart(playerName);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-200 via-pink-100 to-yellow-100 p-4">
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md rounded-[2.5rem] bg-white/95 p-6 text-center shadow-2xl shadow-sky-200">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-amber-200 text-6xl shadow-lg">☀</div>
        <h1 className="mt-5 text-4xl font-black text-sky-700">Puzzle Kata Ceria</h1>
        <p className="mt-3 text-lg font-bold text-slate-600">Ayo susun huruf dan tebak katanya!</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Masukkan nama kamu"
            className="min-h-14 rounded-2xl border-4 border-sky-200 bg-sky-50 px-4 text-center text-xl font-black text-slate-700 outline-none focus:border-sky-400"
          />
          <button type="submit" disabled={!canStart} className="min-h-14 rounded-2xl bg-lime-400 px-5 text-xl font-black text-lime-950 shadow-lg shadow-lime-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">
            Mulai Bermain
          </button>
          {savedPlayerName ? (
            <button type="button" onClick={onContinue} className="min-h-14 rounded-2xl bg-sky-300 px-5 text-xl font-black text-sky-950 shadow-lg shadow-sky-200">
              Lanjutkan
            </button>
          ) : null}
          <button type="button" onClick={onToggleMusic} className="min-h-12 rounded-2xl bg-pink-200 px-5 font-black text-pink-900">
            Musik: {isMusicEnabled ? 'Nyala' : 'Mati'}
          </button>
        </form>
      </motion.section>
    </main>
  );
}
