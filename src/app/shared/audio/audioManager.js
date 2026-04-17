const AUDIO_KEY = "hand-betting-game-audio-muted";

const listeners = new Set();

let muted = loadMutedPreference();
let unlocked = false;
let audioContext = null;

function loadMutedPreference() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUDIO_KEY) === "1";
}

function persistMutedPreference(value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUDIO_KEY, value ? "1" : "0");
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function getContext() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    audioContext = new AudioContextClass();
  }

  return audioContext;
}

function scheduleTone({
  type = "sine",
  frequency = 440,
  duration = 0.08,
  gain = 0.07,
  attack = 0.005,
  decay = 0.08,
  when = 0,
}) {
  const context = getContext();

  if (!context) {
    return;
  }

  const startAt = context.currentTime + when;
  const stopAt = startAt + duration;

  const oscillator = context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.linearRampToValueAtTime(gain, startAt + attack);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, stopAt + decay);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(startAt);
  oscillator.stop(stopAt + decay + 0.02);
}

function scheduleNoiseBurst({ when = 0, duration = 0.055, gain = 0.22, tone = 2400 }) {
  const context = getContext();

  if (!context) {
    return;
  }

  const sampleRate = context.sampleRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
  }

  const source = context.createBufferSource();
  source.buffer = buffer;

  const bandpass = context.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(tone, context.currentTime + when);
  bandpass.Q.setValueAtTime(0.65, context.currentTime + when);

  const gainNode = context.createGain();
  const startAt = context.currentTime + when;
  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.linearRampToValueAtTime(gain, startAt + 0.008);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration + 0.08);

  source.connect(bandpass);
  bandpass.connect(gainNode);
  gainNode.connect(context.destination);

  source.start(startAt);
  source.stop(startAt + duration + 0.1);
}

function playPattern(soundKey) {
  switch (soundKey) {
    case "click":
      scheduleTone({ type: "square", frequency: 520, duration: 0.04, gain: 0.045 });
      break;
    case "deal":
      scheduleTone({ type: "triangle", frequency: 290, duration: 0.06, gain: 0.05 });
      scheduleTone({ type: "triangle", frequency: 360, duration: 0.06, gain: 0.04, when: 0.03 });
      break;
    case "win":
      scheduleTone({ type: "sine", frequency: 440, duration: 0.09, gain: 0.06 });
      scheduleTone({ type: "sine", frequency: 554, duration: 0.1, gain: 0.06, when: 0.07 });
      scheduleTone({ type: "sine", frequency: 659, duration: 0.11, gain: 0.06, when: 0.14 });
      break;
    case "clap":
      scheduleNoiseBurst({ when: 0, gain: 0.24, tone: 2200 });
      scheduleNoiseBurst({ when: 0.09, gain: 0.26, tone: 2600 });
      scheduleNoiseBurst({ when: 0.18, gain: 0.23, tone: 2400 });
      scheduleNoiseBurst({ when: 0.31, gain: 0.21, tone: 2800 });
      break;
    case "lose":
      scheduleTone({ type: "sawtooth", frequency: 300, duration: 0.09, gain: 0.05 });
      scheduleTone({ type: "sawtooth", frequency: 240, duration: 0.12, gain: 0.05, when: 0.07 });
      break;
    case "draw":
      scheduleTone({ type: "triangle", frequency: 420, duration: 0.07, gain: 0.04 });
      scheduleTone({ type: "triangle", frequency: 420, duration: 0.07, gain: 0.035, when: 0.09 });
      break;
    case "game-over":
      scheduleTone({ type: "sawtooth", frequency: 260, duration: 0.1, gain: 0.06 });
      scheduleTone({ type: "sawtooth", frequency: 200, duration: 0.13, gain: 0.06, when: 0.09 });
      scheduleTone({ type: "sine", frequency: 150, duration: 0.14, gain: 0.05, when: 0.2 });
      break;
    default:
      break;
  }
}

export function unlockAudio() {
  const context = getContext();

  if (!context) {
    return false;
  }

  unlocked = true;

  if (context.state === "suspended") {
    context.resume().catch(() => {
      // Ignore resume race errors in browsers.
    });
  }

  return true;
}

export function playSound(soundKey) {
  if (muted || !unlocked) {
    return;
  }

  playPattern(soundKey);
}

export function isMuted() {
  return muted;
}

export function setAudioMuted(value) {
  muted = Boolean(value);
  persistMutedPreference(muted);
  emitChange();
}

export function toggleAudioMuted() {
  setAudioMuted(!muted);
  return muted;
}

export function subscribeAudio(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
