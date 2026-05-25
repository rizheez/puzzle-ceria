export interface WordLevel {
  id: number;
  word: string;
  label: string;
  image: string;
  letters: string[];
  hint?: string;
  audio?: string;
}

// TODO: Ganti aset placeholder dari internet dengan aset lokal sebelum production build.
export const levels: WordLevel[] = [
  {
    id: 1,
    word: 'APEL',
    label: 'Apel',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
    letters: ['A', 'L', 'P', 'E'],
    hint: 'Buah berwarna merah atau hijau',
  },
  {
    id: 2,
    word: 'BOLA',
    label: 'Bola',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=500&q=80',
    letters: ['O', 'B', 'A', 'L'],
    hint: 'Benda yang sering ditendang saat bermain',
  },
  {
    id: 3,
    word: 'BUKU',
    label: 'Buku',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
    letters: ['U', 'B', 'K', 'U'],
    hint: 'Tempat membaca cerita dan belajar',
  },
  {
    id: 4,
    word: 'KUCING',
    label: 'Kucing',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80',
    letters: ['C', 'K', 'I', 'U', 'N', 'G'],
    hint: 'Hewan lucu yang suka mengeong',
  },
  {
    id: 5,
    word: 'IKAN',
    label: 'Ikan',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=500&q=80',
    letters: ['A', 'I', 'N', 'K'],
    hint: 'Hewan yang berenang di air',
  },
  {
    id: 6,
    word: 'MOBIL',
    label: 'Mobil',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=500&q=80',
    letters: ['B', 'M', 'I', 'O', 'L'],
    hint: 'Kendaraan yang berjalan di jalan raya',
  },
  {
    id: 7,
    word: 'RUMAH',
    label: 'Rumah',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=500&q=80',
    letters: ['M', 'R', 'H', 'U', 'A'],
    hint: 'Tempat tinggal bersama keluarga',
  },
  {
    id: 8,
    word: 'MATA',
    label: 'Mata',
    image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?auto=format&fit=crop&w=500&q=80',
    letters: ['A', 'M', 'T', 'A'],
    hint: 'Bagian tubuh untuk melihat',
  },
  {
    id: 9,
    word: 'SAPI',
    label: 'Sapi',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80',
    letters: ['P', 'S', 'I', 'A'],
    hint: 'Hewan ternak yang menghasilkan susu',
  },
  {
    id: 10,
    word: 'BUNGA',
    label: 'Bunga',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=500&q=80',
    letters: ['N', 'B', 'A', 'G', 'U'],
    hint: 'Tanaman indah yang berwarna-warni',
  },
];
