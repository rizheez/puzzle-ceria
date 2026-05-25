import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnswerSlot } from '../components/AnswerSlot';
import { GameHeader } from '../components/GameHeader';
import { ImageClueCard } from '../components/ImageClueCard';
import { LetterTile } from '../components/LetterTile';
import { SettingsModal } from '../components/SettingsModal';
import { SuccessModal } from '../components/SuccessModal';
import { levels } from '../data/levels';
import { useGameStore } from '../stores/gameStore';

export function GamePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const state = useGameStore();
  const level = levels.find((item) => item.id === state.currentLevelId) ?? levels[0];
  const usedChoiceIndexes = state.selectedLetters.map((selectedLetter) => selectedLetter?.choiceIndex).filter((index) => index !== undefined);
  const isLastLevel = level.id === levels.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-yellow-100 p-3 sm:p-5">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-md flex-col gap-4">
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

        <section className="rounded-[2rem] bg-white/90 p-4 shadow-xl shadow-sky-100">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-sky-600">Susun kata</p>
              <h2 className="text-2xl font-black text-slate-700">{level.label}</h2>
            </div>
            <span className="rounded-2xl bg-sky-100 px-3 py-2 font-black text-sky-800">Level {level.id}</span>
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

        <section className="rounded-[2rem] bg-white/90 p-4 shadow-xl shadow-sky-100">
          <div className="flex flex-wrap justify-center gap-3">
            {level.letters.map((letter, index) => (
              <LetterTile key={`${letter}-${index}`} letter={letter} index={index} isUsed={usedChoiceIndexes.includes(index)} onSelect={state.selectLetter} />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => void state.checkAnswer()} className="min-h-14 rounded-2xl bg-lime-400 px-4 text-lg font-black text-lime-950 shadow-lg shadow-lime-200">
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
        isMusicEnabled={state.isMusicEnabled}
        isSoundEnabled={state.isSoundEnabled}
        onToggleMusic={() => void state.toggleMusic()}
        onToggleSound={() => void state.toggleSound()}
        onResetProgress={() => {
          void state.resetProgress();
          setIsSettingsOpen(false);
        }}
        onClose={() => setIsSettingsOpen(false)}
      />
    </main>
  );
}
