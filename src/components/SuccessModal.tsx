import { AnimatePresence, motion } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  isLastLevel: boolean;
  onNext: () => void;
  onClose: () => void;
}

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
            className="w-full max-w-sm rounded-[2rem] border-4 border-white/80 bg-white p-6 text-center shadow-2xl shadow-emerald-200 sm:rounded-4xl"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
          >
            <motion.div animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.2, 1] }} className="mx-auto h-16 w-16 rounded-full bg-yellow-300 shadow-lg shadow-yellow-100" />
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
