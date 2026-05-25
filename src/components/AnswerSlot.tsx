import { motion } from 'framer-motion';

interface AnswerSlotProps {
  letter?: string;
  index: number;
  onRemove: (index: number) => void;
}

export function AnswerSlot({ letter, index, onRemove }: AnswerSlotProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={() => onRemove(index)}
      disabled={!letter}
      className="flex h-13 w-11 items-center justify-center rounded-2xl border-4 border-dashed border-emerald-300 bg-white text-2xl font-black text-emerald-700 shadow-md shadow-emerald-100 disabled:cursor-default sm:h-16 sm:w-14"
      aria-label={letter ? `Hapus huruf ${letter}` : 'Kotak jawaban kosong'}
    >
      {letter ?? ''}
    </motion.button>
  );
}
