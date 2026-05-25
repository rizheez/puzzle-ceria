# Agent Instructions — Offline Mobile Game Puzzle Kata Anak

## Role
You are a senior mobile/web game developer. Build an offline-first educational word puzzle app for children using **React or Vue with Vite**, then wrap it into Android/iOS using **Capacitor**.

The app should feel cheerful, simple, colorful, and child-friendly, similar to a mobile version of a “Happy Word Puzzle” game.

If no stack is explicitly chosen, use **React + Vite + TypeScript + Tailwind CSS + Capacitor**.

## Main Goal
Create a mobile app where children learn Indonesian words by arranging letters based on an image clue.

Example flow:

1. Anak memasukkan nama.
2. Anak mulai bermain.
3. Aplikasi menampilkan gambar, misalnya gambar apel.
4. Aplikasi menampilkan kotak jawaban kosong.
5. Aplikasi menampilkan huruf acak.
6. Anak mengetuk huruf untuk menyusun jawaban.
7. Anak menekan tombol cek jawaban.
8. Jika benar, putar suara senang, beri bintang, dan buka level berikutnya.
9. Jika salah, tampilkan animasi lembut dan izinkan anak mencoba lagi.

## Language Requirement
All visible game text must use **Bahasa Indonesia**.

Use Bahasa Indonesia for:
- App title if shown to children
- Buttons
- Menus
- Instructions
- Success messages
- Error messages
- Empty state messages
- Settings labels
- Level labels
- Parent/child-facing text
- Modal text
- Toast/alert messages

Do not use English text in the actual game UI.

English is only allowed for:
- Code names
- File names
- Package names
- Developer comments
- Technical documentation inside the codebase

Recommended Indonesian UI text examples:

```txt
Mulai Bermain
Lanjutkan
Masukkan nama kamu
Cek Jawaban
Ulangi
Level Berikutnya
Kembali
Pengaturan
Musik
Suara
Reset Progres
Hebat!
Benar!
Jawaban kamu benar!
Hampir benar, coba lagi ya!
Susun hurufnya dulu ya!
Kamu mendapatkan 1 bintang!
```

## Recommended Stack
Use one of the following stacks.

### Preferred React Stack
- React 18+
- Vite
- TypeScript
- Tailwind CSS
- Zustand for state management
- Framer Motion for animations
- Capacitor for Android/iOS wrapper
- Howler.js for sound effects and background music
- @capacitor/preferences for local progress storage

### Alternative Vue Stack
- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- Pinia for state management
- VueUse Motion or CSS animation
- Capacitor for Android/iOS wrapper
- Howler.js for sound effects and background music
- @capacitor/preferences for local progress storage

## Offline-First Requirement
The app must work fully offline after installation.

Allowed offline features:
- Play all available levels
- Show images
- Play background music
- Play correct/wrong sound effects
- Save player name
- Save last unlocked level
- Save stars/progress
- Restart progress

Do not require internet for core gameplay.

Internet is only allowed temporarily during development for placeholder assets. Later, all assets must be downloaded and placed inside the local project.

## Asset Policy
For the first development version, use placeholder assets from the internet.

Acceptable temporary asset sources:
- Public domain images
- Free educational icons
- Open-source illustration libraries
- Placeholder image URLs
- Free sound effect sources

However, structure the project so all internet assets can be replaced easily with custom assets later.

Do not hardcode random remote URLs directly inside components. Store asset references inside level data or a central asset config.

Preferred format:

```ts
export interface WordLevel {
  id: number;
  word: string;
  label: string;
  image: string;
  letters: string[];
  hint?: string;
  audio?: string;
}

export const levels: WordLevel[] = [
  {
    id: 1,
    word: 'APEL',
    label: 'Apel',
    image: '/assets/images/apple.png',
    letters: ['A', 'L', 'P', 'E'],
    hint: 'Buah berwarna merah atau hijau',
  },
];
```

During early prototyping, remote URLs are allowed inside `levels.ts`, but add a clear comment:

```ts
// TODO: Ganti aset placeholder dari internet dengan aset lokal sebelum production build.
```

Before production, assets must be moved to:

```txt
src/assets/images/
src/assets/sounds/
src/assets/music/
src/assets/fonts/
```

## Game Interaction
Prioritize mobile-friendly interaction.

The first version should use **tap-based input**, not complex drag-and-drop.

Recommended behavior:
- Tap a letter tile to place it into the next empty answer slot.
- Tap an answer slot to remove the letter and return it to the choices.
- Disable already-used letter tiles.
- Add a reset answer button.
- Add a check answer button.

Drag-and-drop may be added later, but do not make it mandatory for the first version because mobile drag behavior can be less reliable for children.

## UI Direction
Design must be:
- Mobile-first
- Portrait orientation
- Large touch targets
- Rounded corners
- Soft shadows
- Pastel colors
- Cheerful but not crowded
- Easy for children to understand

Recommended layout:

```txt
Bagian atas:
- Judul aplikasi
- Tombol musik hidup/mati
- Jumlah bintang

Bagian utama:
- Indikator level
- Kartu gambar petunjuk
- Label kata atau petunjuk suara
- Kotak jawaban kosong

Bagian bawah:
- Tombol huruf acak
- Tombol cek jawaban
- Tombol ulangi
```

For mobile, do not copy desktop layout exactly. Convert it into a clean vertical layout.

## Screens / Pages
Create these screens.

### 1. Start Screen
Purpose:
- Ask the child’s name.
- Start the game.
- Toggle music.

Fields/components:
- App title
- Friendly mascot or illustration
- Name input with Indonesian placeholder: `Masukkan nama kamu`
- Start button: `Mulai Bermain`
- Continue button if progress exists: `Lanjutkan`

### 2. Game Screen
Purpose:
- Main puzzle gameplay.

Components:
- Header with player name, level, stars, music toggle
- Image clue card
- Answer slots
- Letter choices
- Check answer button: `Cek Jawaban`
- Reset button: `Ulangi`
- Next level button after success: `Level Berikutnya`

### 3. Level Complete Modal
Purpose:
- Celebrate correct answer.

Components:
- Star animation
- Message: `Hebat! Jawaban kamu benar!`
- Reward text: `Kamu mendapatkan 1 bintang!`
- Next level button: `Level Berikutnya`

### 4. Settings / Reset Modal
Purpose:
- Optional screen for resetting progress.

Components:
- Music toggle: `Musik`
- Sound toggle: `Suara`
- Reset progress button: `Reset Progres`
- Back button: `Kembali`

## State Management
Manage these states:

```ts
interface GameProgress {
  playerName: string;
  currentLevelId: number;
  unlockedLevelId: number;
  totalStars: number;
  completedLevelIds: number[];
  isMusicEnabled: boolean;
  isSoundEnabled: boolean;
}
```

Use local persistent storage:
- Prefer `@capacitor/preferences` for Capacitor mobile.
- Browser fallback can use `localStorage` during development.

Create a storage abstraction:

```txt
src/lib/storage.ts
```

So the app can switch storage implementation without changing components.

## Level Data
Create level data in:

```txt
src/data/levels.ts
```

Initial prototype levels:

```txt
APEL
BOLA
BUKU
KUCING
IKAN
MOBIL
RUMAH
MATA
SAPI
BUNGA
```

Each level should include:
- id
- word in uppercase
- display label in Bahasa Indonesia
- image path
- shuffled letters
- optional hint in Bahasa Indonesia
- optional audio clue

Example:

```ts
{
  id: 2,
  word: 'BOLA',
  label: 'Bola',
  image: '/assets/images/bola.png',
  letters: ['O', 'B', 'A', 'L'],
  hint: 'Benda yang sering ditendang saat bermain',
}
```

## Answer Checking Logic
Rules:
- Convert answer to uppercase.
- Compare selected letters with `level.word`.
- If correct:
  - Add star.
  - Mark level completed.
  - Unlock next level.
  - Save progress.
  - Play correct sound.
  - Show success animation.
  - Show Indonesian message: `Hebat! Jawaban kamu benar!`
- If wrong:
  - Play wrong sound.
  - Shake answer slots gently.
  - Do not punish harshly.
  - Show Indonesian message: `Hampir benar, coba lagi ya!`
- If answer is empty or incomplete:
  - Show Indonesian message: `Susun hurufnya dulu ya!`

## Audio
Audio requirements:
- Background music toggle.
- Correct answer sound.
- Wrong answer sound.
- Button click sound optional.

Use Howler.js or native HTML audio.

Audio files should later be stored in:

```txt
src/assets/sounds/
src/assets/music/
```

Do not auto-play sound before user interaction because mobile browsers may block it.
Start music after the child presses the start button or taps the music button.

## Accessibility and Child-Friendly UX
Use:
- Large buttons, minimum 48px height.
- Clear labels in Bahasa Indonesia.
- Strong contrast.
- Friendly error messages.
- No scary failure state.
- No ads.
- No external links inside the child gameplay screen.
- No unnecessary permissions.

Recommended messages:

```txt
Correct: “Hebat! Jawaban kamu benar!”
Wrong: “Hampir benar, coba lagi ya!”
Empty answer: “Susun hurufnya dulu ya!”
Level complete: “Kamu berhasil menyelesaikan level ini!”
All levels complete: “Keren! Semua level sudah selesai!”
```

## Capacitor Requirements
Set up Capacitor after the web version works.

Commands:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
npm run build
npx cap add android
npx cap sync
npx cap open android
```

Capacitor config should use the Vite build output:

```ts
webDir: 'dist'
```

The app should not request unnecessary permissions.

## Android Build Notes
For Android:
- Test portrait layout.
- Test offline after install.
- Test music toggle.
- Test progress persistence after closing the app.
- Test on small and large phones.

Later production build should use Android App Bundle/AAB.

## Project Structure
Recommended structure:

```txt
src/
  assets/
    images/
    sounds/
    music/
    fonts/
  components/
    AnswerSlot.tsx
    LetterTile.tsx
    GameHeader.tsx
    ImageClueCard.tsx
    SuccessModal.tsx
    SettingsModal.tsx
  data/
    levels.ts
  lib/
    audio.ts
    storage.ts
    shuffle.ts
  pages/
    StartPage.tsx
    GamePage.tsx
  stores/
    gameStore.ts
  App.tsx
  main.tsx
```

For Vue, use `.vue` files and Pinia store, but keep the same conceptual structure.

## Code Conventions
Use strict TypeScript.

Rules:
- No `any`.
- Use interfaces for object shapes.
- Use named exports for components and utilities.
- Keep components small.
- Separate game logic from UI.
- Avoid magic numbers; use constants.
- Use clear function names.
- Keep level data separate from components.

Example constants:

```ts
export const STAR_REWARD_PER_LEVEL = 1;
export const MIN_TOUCH_TARGET_SIZE = 48;
```

## Styling Rules
Use Tailwind CSS.

Design style:
- Rounded `2xl` or `3xl`
- Pastel backgrounds
- Soft shadows
- Big text
- Large spacing
- Avoid dense UI

Example class direction:

```txt
min-h-screen bg-sky-200 p-4
rounded-3xl bg-white shadow-xl
text-slate-700 font-bold
```

## Development Phases

### Phase 1 — Web Prototype
Build:
- Start screen
- Game screen
- 10 levels
- Tap letters
- Check answer
- Save progress locally
- Basic sounds
- All visible UI text in Bahasa Indonesia

### Phase 2 — Mobile Polish
Improve:
- Animations
- Better child-friendly layout
- Success modal
- Music toggle
- Portrait optimization
- Offline asset packaging

### Phase 3 — Capacitor Android
Build:
- Capacitor wrapper
- Android project
- APK/AAB testing
- Offline testing
- Progress persistence testing

### Phase 4 — Custom Assets
Replace:
- Placeholder images
- Placeholder audio
- Placeholder music
- Placeholder mascot
- App icon
- Splash screen

## Important Restrictions
Do not build backend in the first version.
Do not add login in the first version.
Do not require internet for gameplay.
Do not add ads.
Do not add analytics/tracking.
Do not request camera, location, contacts, or microphone permission.
Do not make drag-and-drop mandatory in the first version.
Do not use English text in the child-facing game UI.

## Output Expectation
When generating code, produce a complete runnable project setup.

Minimum expected commands:

```bash
npm install
npm run dev
npm run build
npx cap sync
```

The app should be easy to run as a web app first, then converted to Android with Capacitor.

## Final App Behavior
The final app should feel like a simple offline educational game:

- Anak membuka aplikasi.
- Anak memasukkan nama.
- Anak memainkan puzzle kata.
- Anak mendapatkan bintang.
- Progres tersimpan.
- Aplikasi tetap berjalan tanpa internet.
- Semua teks game menggunakan Bahasa Indonesia.
- Aset dapat diganti nanti dengan gambar dan suara milik sendiri.
