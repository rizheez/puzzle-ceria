import type { WordLevel } from '../data/levels';

interface ImageClueCardProps {
  level: WordLevel;
}

export function ImageClueCard({ level }: ImageClueCardProps) {
  return (
    <section className="rounded-[2rem] bg-white p-4 shadow-xl shadow-sky-100">
      <div className="overflow-hidden rounded-[1.5rem] bg-sky-100">
        <img src={level.image} alt={`Gambar ${level.label}`} className="h-48 w-full object-cover sm:h-60" />
      </div>
      <div className="mt-4 rounded-2xl bg-lime-100 p-4 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-lime-700">Petunjuk</p>
        <p className="mt-1 text-lg font-black text-slate-700">{level.hint}</p>
      </div>
    </section>
  );
}
