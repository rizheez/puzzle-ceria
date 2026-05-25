import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnswerSlot } from '../components/AnswerSlot';
import { GameHeader } from '../components/GameHeader';
import { ImageClueCard } from '../components/ImageClueCard';
import { LetterTile } from '../components/LetterTile';
import { SettingsModal } from '../components/SettingsModal';
import { ForestBackground } from '../components/ForestBackground';
import { SuccessModal } from '../components/SuccessModal';
import { levels } from '../data/levels';
import { useGameStore } from '../stores/gameStore';

export function GamePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const state = useGameStore();
  const level = levels.find((item) => item.id === state.currentLevelId) ?? levels[0];
  const usedChoiceIndexes = state.selectedLetters.map((selectedLetter) => selectedLetter?.choiceIndex).filter((index) => index !== undefined);
  const isLastLevel = level.id === levels.length;
  const isCheckAnswerDisabled = isLastLevel && state.completedLevelIds.includes(level.id);

  return (
    <main className="mobile-safe-area relative min-h-screen overflow-x-hidden bg-linear-to-br from-sky-200 via-cyan-100 to-lime-100">
      <ForestBackground />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-sm flex-col gap-3 sm:min-h-[calc(100vh-3rem)] sm:max-w-md sm:gap-4">
        <GameHeader
          playerName={state.playerName}
          currentLevelId={level.id}
          totalLevels={levels.length}
          totalStars={state.totalStars}
          isMusicEnabled={state.isMusicEnabled}
          onToggleMusic={() => void state.toggleMusic()}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <ImageClueCard level={level} />

        <section className="rounded-[2rem] border-4 border-white/70 bg-white/90 p-4 shadow-xl shadow-emerald-200/60 backdrop-blur-sm sm:rounded-4xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-600">Susun kata</p>
              <h2 className="text-2xl font-black text-slate-700">{level.label}</h2>
            </div>
            <span className="rounded-2xl bg-emerald-100 px-3 py-2 font-black text-emerald-800">Level {level.id}</span>
          </div>

          <motion.div animate={state.shouldShake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }} className="mt-5 flex flex-wrap justify-center gap-2">
            {state.selectedLetters.map((selectedLetter, index) => (
              <AnswerSlot key={`${level.id}-${index}`} letter={selectedLetter?.letter} index={index} onRemove={state.removeLetter} />
            ))}
          </motion.div>

          {state.feedback.message ? (
            <p className={`mt-4 rounded-2xl p-3 text-center font-black ${state.feedback.kind === 'success' ? 'bg-lime-100 text-lime-800' : state.feedback.kind === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-rose-100 text-rose-800'}`}>
              {state.feedback.message}
            </p>
          ) : null}
        </section>

        <section className="rounded-[2rem] border-4 border-white/70 bg-white/90 p-4 shadow-xl shadow-emerald-200/60 backdrop-blur-sm sm:rounded-4xl">
          <div className="flex flex-wrap justify-center gap-3">
            {level.letters.map((letter, index) => (
              <LetterTile key={`${letter}-${index}`} letter={letter} index={index} isUsed={usedChoiceIndexes.includes(index)} onSelect={state.selectLetter} />
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
