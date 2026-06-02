import { motion } from 'framer-motion';

interface LetterTileProps {
  letter: string;
  index: number;
  isUsed: boolean;
  isHinted?: boolean;
  onSelect: (letter: string, index: number) => void;
}

export function LetterTile({ letter, index, isUsed, isHinted = false, onSelect }: LetterTileProps) {
  return (
    <motion.button
      type="button"
      animate={isHinted && !isUsed ? { y: [0, -6, 0], scale: [1, 1.08, 1] } : { y: 0, scale: 1 }}
      transition={{ duration: 0.9, repeat: isHinted && !isUsed ? Infinity : 0 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onSelect(letter, index)}
      disabled={isUsed}
      className={`h-13 min-w-13 rounded-2xl px-4 text-2xl font-black shadow-lg transition active:scale-95 disabled:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:h-16 sm:min-w-16 sm:px-5 ${isHinted && !isUsed ? 'bg-lime-300 text-lime-950 shadow-lime-200 ring-4 ring-white' : 'bg-amber-300 text-amber-900 shadow-amber-200'}`}
      aria-label={`Pilih huruf ${letter}`}
    >
      {letter}
    </motion.button>
  );
}
