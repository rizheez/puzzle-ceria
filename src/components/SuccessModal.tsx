import { AnimatePresence, motion } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  isLastLevel: boolean;
  onNext: () => void;
  onClose: () => void;
}

const CONFETTI_PIECES = [
  'left-8 top-10 bg-pink-300',
  'left-16 top-20 bg-sky-300',
  'right-10 top-12 bg-lime-300',
  'right-16 top-24 bg-amber-300',
  'left-12 bottom-24 bg-purple-300',
  'right-12 bottom-28 bg-rose-300',
];

export function SuccessModal({ isOpen, isLastLevel, onNext, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-white/80 bg-white p-6 text-center shadow-2xl shadow-emerald-200 sm:rounded-4xl"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
          >
            {CONFETTI_PIECES.map((className) => (
              <motion.span
                key={className}
                className={`absolute h-3 w-3 rounded-full ${className}`}
                animate={{ y: [0, 18, 0], rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            ))}
            <motion.div animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.2, 1] }} className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-300 shadow-lg shadow-yellow-100">
              <span className="h-10 w-10 rounded-full bg-amber-400 shadow-[0_0_0_0.35rem_rgba(250,204,21,0.35)]" />
            </motion.div>
            <h2 className="mt-3 text-3xl font-black text-emerald-700">Hebat!</h2>
            <p className="mt-2 text-lg font-bold text-slate-700">Jawaban kamu benar!</p>
            <p className="mt-2 rounded-2xl bg-yellow-100 p-3 font-black text-yellow-800">Kamu mendapatkan 1 bintang!</p>
            <button type="button" onClick={isLastLevel ? onClose : onNext} className="mt-5 min-h-12 w-full rounded-2xl bg-lime-400 px-5 font-black text-lime-950 shadow-lg shadow-lime-200">
              {isLastLevel ? 'Tutup' : 'Level Berikutnya'}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
