import { motion } from 'framer-motion';

type MascotMood = 'happy' | 'thinking' | 'cheering';

interface ForestMascotProps {
  mood: MascotMood;
  message: string;
}

export function ForestMascot({ mood, message }: ForestMascotProps) {
  const eyeClassName = mood === 'happy' ? 'h-1.5 w-3 rounded-b-full border-b-[3px] border-emerald-950' : 'h-2.5 w-2.5 rounded-full bg-emerald-950';

  return (
    <section className="flex items-center gap-3 rounded-[1.75rem] border-4 border-white/70 bg-white/90 p-3 shadow-xl shadow-emerald-200/60 backdrop-blur-sm">
      <motion.div
        animate={mood === 'cheering' ? { y: [0, -6, 0], rotate: [-3, 3, -3] } : { y: [0, -2, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="relative flex h-20 w-20 shrink-0 items-center justify-center"
      >
        <div className="absolute bottom-0 h-14 w-16 rounded-[1.7rem] bg-emerald-300 shadow-lg shadow-emerald-100" />
        <div className="absolute top-0 h-12 w-14 rounded-full bg-lime-300 shadow-md shadow-lime-100" />
        <div className="absolute top-2 left-3 h-5 w-5 rounded-full bg-lime-200" />
        <div className="absolute top-2 right-3 h-5 w-5 rounded-full bg-lime-200" />
        <div className="absolute top-7 left-6 flex w-8 items-center justify-between">
          <span className={eyeClassName} />
          <span className={eyeClassName} />
        </div>
        <div className="absolute top-11 h-2 w-6 rounded-b-full border-b-4 border-emerald-950" />
        <div className="absolute -right-1 bottom-5 h-7 w-3 rotate-[-22deg] rounded-full bg-emerald-300" />
      </motion.div>

      <div className="min-w-0 flex-1 rounded-[1.4rem] bg-lime-100 px-4 py-3 shadow-inner">
        <p className="text-base font-black leading-snug text-emerald-800">{message}</p>
      </div>
    </section>
  );
}
