import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { MUSIC_URL } from '../constants';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.4; // Slightly lower volume for background
    audioRef.current = audio;

    console.log("AudioPlayer mounted, attempting playback...");

    // Attempt auto-play immediately
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio started successfully.");
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Auto-play prevented by browser policy. Interaction needed.", error);
          setIsPlaying(false);
        });
    }

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
      className="fixed bottom-6 right-6 z-50 p-3 bg-stone-900/90 text-stone-100 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 hover:bg-stone-800 backdrop-blur-sm"
      aria-label="Toggle Music"
    >
      {isPlaying ? <Pause size={20} /> : <Music size={20} />}
    </button>
  );
};

export default AudioPlayer;