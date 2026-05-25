import type { WordLevel } from '../data/levels';

interface ImageClueCardProps {
  level: WordLevel;
}

export function ImageClueCard({ level }: ImageClueCardProps) {
  return (
    <section className="rounded-[2rem] border-4 border-white/70 bg-white/90 p-3 shadow-xl shadow-emerald-200/60 backdrop-blur-sm sm:rounded-4xl sm:p-4">
      <div className="overflow-hidden rounded-3xl bg-sky-100 shadow-inner">
        <img src={level.image} alt={`Gambar ${level.label}`} className="h-40 w-full object-cover sm:h-60" />
      </div>
      <div className="mt-3 rounded-3xl bg-lime-100 p-3 text-center shadow-inner sm:mt-4 sm:p-4">
        <p className="text-sm font-bold uppercase tracking-wide text-lime-700">Petunjuk</p>
        <p className="mt-1 text-base font-black text-slate-700 sm:text-lg">{level.hint}</p>
      </div>
    </section>
  );
}
