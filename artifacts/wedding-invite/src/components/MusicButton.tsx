import { useEffect, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { getMusicAudio, isMusicPlaying, pauseMusic, playMusic } from '@/lib/music';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = getMusicAudio();
    if (!audio) return;
    const sync = () => setIsPlaying(!audio.paused);
    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    setIsPlaying(isMusicPlaying());
    return () => {
      audio.removeEventListener('play', sync);
      audio.removeEventListener('pause', sync);
    };
  }, []);

  const handleToggle = () => {
    if (isMusicPlaying()) {
      pauseMusic();
      setIsPlaying(false);
    } else {
      void playMusic().then((started) => setIsPlaying(started));
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
