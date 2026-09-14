/**
 * Authentic mechanical keyboard sound engine.
 *
 * Uses real acoustic recordings of mechanical switch keypresses
 * with organic pitch & velocity variation for lifelike realism.
 */

let audioCtx: AudioContext | null = null;
const bufferCache: Record<string, AudioBuffer> = {};
let isPreloading = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctor) {
      audioCtx = new Ctor();
    }
  }
  if (audioCtx?.state === 'suspended') {
    try {
      audioCtx.resume().catch(() => {});
    } catch {}
  }
  return audioCtx;
}

const SOUND_URLS: Record<string, string> = {
  key: '/sounds/key.wav',
  space: '/sounds/space.wav',
  enter: '/sounds/enter.wav',
  backspace: '/sounds/backspace.wav',
};

/**
 * Preloads mechanical switch wav files into memory for zero-latency playback.
 */
export async function preloadSounds(): Promise<void> {
  if (typeof window === 'undefined' || isPreloading) return;
  isPreloading = true;
  const ctx = getAudioContext();
  if (!ctx) return;

  await Promise.all(
    Object.entries(SOUND_URLS).map(async ([name, url]) => {
      if (bufferCache[name]) return;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const arrayBuf = await res.arrayBuffer();
          const audioBuf = await ctx.decodeAudioData(arrayBuf);
          bufferCache[name] = audioBuf;
        }
      } catch {
        // Network or format error, fallback will handle
      }
    })
  );
}

export type KeySoundType = 'key' | 'space' | 'enter' | 'backspace';

/**
 * Plays an authentic mechanical keyboard sound with dynamic acoustic variation.
 */
export function playKeySound(type: KeySoundType = 'key', volume = 0.16): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Trigger preload in background if not yet loaded
    if (!bufferCache[type] && !isPreloading) {
      preloadSounds();
    }

    const buffer = bufferCache[type] || bufferCache['key'];
    if (buffer) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Realistic pitch variation (±5%) so every keystroke has a unique physical tone
      source.playbackRate.value = 0.95 + Math.random() * 0.1;

      // Warm low-pass filter to roll off sharp highs and deliver a deep, pleasant thock
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 5500;

      const gain = ctx.createGain();
      // Natural velocity variation
      const dynamicVol = volume * (0.88 + Math.random() * 0.24);
      gain.gain.setValueAtTime(dynamicVol, ctx.currentTime);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(0);
      return;
    }

    // Physical modelling fallback if wav buffers are still downloading
    playFallbackImpulse(ctx, type, volume);
  } catch {
    // Silently ignore audio playback restrictions
  }
}

/**
 * Physics-based mechanical impulse fallback (no harsh beeps, pure filtered impact noise).
 */
function playFallbackImpulse(ctx: AudioContext, type: KeySoundType, volume: number): void {
  const now = ctx.currentTime;
  const bufSize = Math.floor(ctx.sampleRate * 0.035);
  const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const decay = bufSize * 0.15;

  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / decay);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = type === 'space' ? 400 : type === 'enter' ? 500 : 700 + Math.random() * 150;
  filter.Q.value = 2.0;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
}
