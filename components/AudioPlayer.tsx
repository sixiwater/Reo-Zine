import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { MUSIC_URL } from '../constants';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-3 bg-stone-900 text-stone-100 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 opacity-80 hover:opacity-100"
      aria-label="Toggle Music"
    >
      {isPlaying ? <Pause size={20} /> : <Music size={20} />}
    </button>
  );
};

export default AudioPlayer;