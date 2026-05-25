import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ForestBackground } from '../components/ForestBackground';
import { SpeakerIcon } from '../components/SpeakerIcon';

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
    <main className="mobile-safe-area relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-sky-200 via-cyan-100 to-lime-100">
      <ForestBackground />
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-sm rounded-[2.2rem] border-4 border-white/80 bg-white/90 p-5 text-center shadow-2xl shadow-emerald-200/70 backdrop-blur-sm sm:max-w-md sm:rounded-[2.5rem] sm:p-7"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-200 shadow-lg shadow-amber-100 sm:h-28 sm:w-28">
          <span className="h-14 w-14 rounded-full bg-amber-300 shadow-[0_0_1.5rem_rgba(251,191,36,0.55)] sm:h-16 sm:w-16" />
        </div>
        <h1 className="mt-5 text-3xl font-black leading-tight text-emerald-700 sm:text-4xl">Puzzle Kata Ceria</h1>
        <p className="mt-3 text-base font-bold text-slate-600 sm:text-lg">Ayo bermain di hutan ceria dan susun katanya!</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:gap-4">
          <input
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Masukkan nama kamu"
            className="min-h-14 rounded-[1.4rem] border-4 border-emerald-100 bg-lime-50 px-4 text-center text-lg font-black text-slate-700 shadow-inner outline-none focus:border-emerald-300 sm:text-xl"
          />
          <button type="submit" disabled={!canStart} className="min-h-14 rounded-[1.4rem] bg-lime-400 px-5 text-lg font-black text-lime-950 shadow-lg shadow-lime-200 transition active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:text-xl">
            Mulai Bermain
          </button>
          {savedPlayerName ? (
            <button type="button" onClick={onContinue} className="min-h-14 rounded-[1.4rem] bg-sky-300 px-5 text-lg font-black text-sky-950 shadow-lg shadow-sky-200 transition active:scale-95 sm:text-xl">
              Lanjutkan
            </button>
          ) : null}
          <button
            type="button"
            onClick={onToggleMusic}
            className="mx-auto flex min-h-12 w-16 items-center justify-center rounded-[1.4rem] bg-pink-200 px-5 text-pink-900 shadow-md shadow-pink-100 transition active:scale-95"
            aria-label={isMusicEnabled ? 'Matikan musik' : 'Nyalakan musik'}
          >
            <SpeakerIcon isEnabled={isMusicEnabled} />
          </button>
        </form>
      </motion.section>
    </main>
  );
}
