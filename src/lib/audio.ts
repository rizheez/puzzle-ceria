type AudioKind = 'correct' | 'wrong' | 'tap';

let audioContext: AudioContext | null = null;
let musicOscillator: OscillatorNode | null = null;
let musicGain: GainNode | null = null;

export function playEffect(kind: AudioKind, isEnabled: boolean): void {
  if (!isEnabled) {
    return;
  }

  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  const frequency = kind === 'correct' ? 660 : kind === 'wrong' ? 180 : 420;

  oscillator.type = kind === 'wrong' ? 'sawtooth' : 'sine';
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(kind === 'wrong' ? 0.07 : 0.1, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.24);
}

export function setMusicEnabled(isEnabled: boolean): void {
  if (isEnabled) {
    startMusic();
    return;
  }

  stopMusic();
}

function startMusic(): void {
  if (musicOscillator) {
    return;
  }

  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.value = 220;
  gain.gain.value = 0.025;
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  musicOscillator = oscillator;
  musicGain = gain;
}

function stopMusic(): void {
  if (!musicOscillator) {
    return;
  }

  musicOscillator.stop();
  musicOscillator.disconnect();
  musicGain?.disconnect();
  musicOscillator = null;
  musicGain = null;
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
