import { AnimatePresence, motion } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onResetProgress: () => void;
  onClose: () => void;
}

export function SettingsModal({
  isOpen,
  onResetProgress,
  onClose,
}: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-sm rounded-4xl border-4 border-white/80 bg-white p-6 shadow-2xl shadow-emerald-200" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
            <h2 className="text-center text-2xl font-black text-emerald-700">Pengaturan</h2>
            <div className="mt-5 grid gap-3">
              <button type="button" onClick={onResetProgress} className="min-h-12 rounded-2xl bg-rose-200 px-4 font-black text-rose-900">
                Reset Progres
              </button>
              <button type="button" onClick={onClose} className="min-h-12 rounded-2xl bg-slate-200 px-4 font-black text-slate-700">
                Kembali
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
