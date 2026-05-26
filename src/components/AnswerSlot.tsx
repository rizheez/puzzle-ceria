import { motion } from 'framer-motion';

interface AnswerSlotProps {
  letter?: string;
  index: number;
  isHinted?: boolean;
  onRemove: (index: number) => void;
}

export function AnswerSlot({ letter, index, isHinted = false, onRemove }: AnswerSlotProps) {
  return (
    <motion.button
      type="button"
      animate={isHinted ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.9, repeat: isHinted ? Infinity : 0 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => onRemove(index)}
      disabled={!letter}
      className={`flex h-13 w-11 items-center justify-center rounded-2xl border-4 border-dashed bg-white text-2xl font-black shadow-md disabled:cursor-default sm:h-16 sm:w-14 ${isHinted ? 'border-lime-400 text-lime-800 shadow-lime-100 ring-4 ring-lime-100' : 'border-emerald-300 text-emerald-700 shadow-emerald-100'}`}
      aria-label={letter ? `Hapus huruf ${letter}` : 'Kotak jawaban kosong'}
    >
      {letter ?? ''}
    </motion.button>
  );
}
