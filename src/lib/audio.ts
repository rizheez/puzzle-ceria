type AudioKind = 'correct' | 'wrong' | 'tap';

const BACKGROUND_MUSIC_SRC = '/audio/music_2.mp3';
const RIGHT_ANSWER_SOUND_SRC = '/audio/right_answer.mp3';
const WRONG_ANSWER_SOUND_SRC = '/audio/wrong_answer.mp3';
const BACKGROUND_MUSIC_VOLUME = 0.28;
const ANSWER_EFFECT_VOLUME = 0.8;
const EFFECT_FADE_IN_SECONDS = 0.02;
const EFFECT_DURATION_SECONDS = 0.24;
const EFFECT_FADE_OUT_SECONDS = 0.22;
const MIN_GAIN_VALUE = 0.001;
const TAP_FREQUENCY = 420;
const DEFAULT_EFFECT_VOLUME = 0.1;

let audioContext: AudioContext | null = null;
let backgroundMusic: HTMLAudioElement | null = null;
let rightAnswerSound: HTMLAudioElement | null = null;
let wrongAnswerSound: HTMLAudioElement | null = null;

export function playEffect(kind: AudioKind, isEnabled: boolean): void {
  if (!isEnabled) {
    return;
  }

  if (kind === 'correct' || kind === 'wrong') {
    void playAnswerSound(kind);
    return;
  }

  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(TAP_FREQUENCY, now);
  gain.gain.setValueAtTime(MIN_GAIN_VALUE, now);
  gain.gain.exponentialRampToValueAtTime(DEFAULT_EFFECT_VOLUME, now + EFFECT_FADE_IN_SECONDS);
  gain.gain.exponentialRampToValueAtTime(MIN_GAIN_VALUE, now + EFFECT_FADE_OUT_SECONDS);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + EFFECT_DURATION_SECONDS);
}

export function setMusicEnabled(isEnabled: boolean): void {
  if (isEnabled) {
    void startMusic();
    return;
  }

  stopMusic();
}

async function startMusic(): Promise<void> {
  const music = getBackgroundMusic();

  if (!music.paused) {
    return;
  }

  try {
    await music.play();
  } catch {
    stopMusic();
  }
}

function stopMusic(): void {
  if (!backgroundMusic) {
    return;
  }

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function getBackgroundMusic(): HTMLAudioElement {
  if (backgroundMusic) {
    return backgroundMusic;
  }

  backgroundMusic = new Audio(BACKGROUND_MUSIC_SRC);
  backgroundMusic.loop = true;
  backgroundMusic.volume = BACKGROUND_MUSIC_VOLUME;
  backgroundMusic.preload = 'auto';

  return backgroundMusic;
}

async function playAnswerSound(kind: 'correct' | 'wrong'): Promise<void> {
  const sound = getAnswerSound(kind);
  const playableSound = sound.cloneNode(true);

  if (!(playableSound instanceof HTMLAudioElement)) {
    return;
  }

  playableSound.volume = ANSWER_EFFECT_VOLUME;

  try {
    await playableSound.play();
  } catch {
    return;
  }
}

function getAnswerSound(kind: 'correct' | 'wrong'): HTMLAudioElement {
  if (kind === 'correct') {
    if (!rightAnswerSound) {
      rightAnswerSound = createEffectAudio(RIGHT_ANSWER_SOUND_SRC);
    }

    return rightAnswerSound;
  }

  if (!wrongAnswerSound) {
    wrongAnswerSound = createEffectAudio(WRONG_ANSWER_SOUND_SRC);
  }

  return wrongAnswerSound;
}

function createEffectAudio(src: string): HTMLAudioElement {
  const audio = new Audio(src);
  audio.volume = ANSWER_EFFECT_VOLUME;
  audio.preload = 'auto';

  return audio;
}

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume();
  }

  return audioContext;
}
