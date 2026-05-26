import { motion } from 'framer-motion';

interface LetterTileProps {
  letter: string;
  index: number;
  isUsed: boolean;
  onSelect: (letter: string, index: number) => void;
}

export function LetterTile({ letter, index, isUsed, onSelect }: LetterTileProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={() => onSelect(letter, index)}
      disabled={isUsed}
      className="h-13 min-w-13 rounded-2xl bg-amber-300 px-4 text-2xl font-black text-amber-900 shadow-lg shadow-amber-200 transition active:scale-95 disabled:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:h-16 sm:min-w-16 sm:px-5"
      aria-label={`Pilih huruf ${letter}`}
    >
      {letter}
    </motion.button>
  );
}
