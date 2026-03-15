import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'SynthWave AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/300/300'
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Digital Ghost',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon2/300/300'
  },
  {
    id: '3',
    title: 'Midnight Drive',
    artist: 'Retro Future',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/neon3/300/300'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  }, []);

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-pink-100 p-6 rounded-3xl shadow-sm w-full max-w-md">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-rose-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="relative w-48 h-48 rounded-2xl object-cover shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-pink-900 tracking-tight">{currentTrack.title}</h3>
          <p className="text-rose-500 text-sm font-medium">{currentTrack.artist}</p>
        </div>

        <div className="w-full space-y-2">
          <div className="h-1.5 w-full bg-pink-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-pink-300 font-mono uppercase tracking-widest">
            <span>Sweet Music</span>
            <span>Stereo</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={handlePrev}
            className="text-pink-300 hover:text-rose-500 transition-colors"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 flex items-center justify-center bg-pink-500 text-white rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(244,114,182,0.3)]"
          >
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            className="text-pink-300 hover:text-rose-500 transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full px-4 text-pink-200">
          <Volume2 size={16} />
          <div className="h-1 flex-1 bg-pink-100 rounded-full">
            <div className="h-full w-2/3 bg-pink-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
