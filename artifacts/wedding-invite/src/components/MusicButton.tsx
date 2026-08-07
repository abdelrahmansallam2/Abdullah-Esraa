import { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { weddingConfig } from '@/data/weddingConfig';

const STORAGE_KEY = 'wedding-music-playing';

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(weddingConfig.musicPath);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEY, 'false');
    } else {
      audio.play().catch(() => {
        // Autoplay restrictions or missing file — fail silently, UI still toggles intent.
      });
      setIsPlaying(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      data-testid="button-toggle-music"
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
      aria-pressed={isPlaying}
      className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-[#1a3460] text-[#f2e6c2] shadow-lg shadow-[#1a3460]/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border border-[#c9a84c]/40"
    >
      {isPlaying ? (
        <Music className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
