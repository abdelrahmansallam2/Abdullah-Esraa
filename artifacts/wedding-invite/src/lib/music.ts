import { weddingConfig } from '@/data/weddingConfig';

let audio: HTMLAudioElement | null = null;
let playing = false;

function ensureAudio(): HTMLAudioElement | null {
  if (audio) return audio;
  try {
    const element = new Audio(weddingConfig.musicPath);
    element.loop = true;
    element.volume = 0.5;
    element.addEventListener('playing', () => {
      playing = true;
    });
    element.addEventListener('pause', () => {
      playing = false;
    });
    element.addEventListener('ended', () => {
      playing = false;
    });
    audio = element;
  } catch {
    audio = null;
  }
  return audio;
}

export function getMusicAudio(): HTMLAudioElement | null {
  return ensureAudio();
}

export async function playMusic(): Promise<boolean> {
  const element = ensureAudio();
  if (!element) return false;
  try {
    await element.play();
    return true;
  } catch {
    return false;
  }
}

export function pauseMusic(): void {
  if (audio) audio.pause();
}

export function isMusicPlaying(): boolean {
  return playing;
}
