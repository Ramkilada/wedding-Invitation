import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  url: string;
}

const tracks: Track[] = [
  {
    title: 'Royal Sitar & Tabla Melody',
    artist: 'Classical Indian Traditional',
    url: 'https://www.chosic.com/wp-content/uploads/2021/04/Warm-Memories-Emotional-Inspiring-Sitar-Music.mp3',
  },
  {
    title: 'Sacred Shenhai',
    artist: 'Traditional Wedding Instrumental',
    // Fallback royalty-free shehnai/wedding theme
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    title: 'Divine flute & Tanpura',
    artist: 'Meditation Instrumental',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [error, setError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(tracks[currentTrackIndex].url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Standard play-on-user-interaction warning or fallback
    const handleCanPlay = () => setError(false);
    const handleAudioError = () => setError(true);

    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleAudioError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current = null;
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setError(false);
        })
        .catch((err) => {
          console.error("Audio playback blocked by browser autocomplete/interactivity rules: ", err);
          // Try playing again after small delay or prompt
          setError(true);
        });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTrackChange = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    
    // Auto play new track
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 150);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Floating Player Panel */}
      <div className="royal-card rounded-full pl-4 pr-2 py-2 flex items-center gap-3 backdrop-blur-md shadow-2xl border border-yellow-600/30">
        
        {/* Animated Sound Waves (Visible only when playing) */}
        {isPlaying && (
          <div className="flex items-end gap-[2px] h-4 w-5 mr-1 mb-[2px]">
            <span className="w-[3px] bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0s' }} />
            <span className="w-[3px] bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '0.5s', animationDelay: '0.2s' }} />
            <span className="w-[3px] bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '1.1s', animationDelay: '0.4s' }} />
            <span className="w-[3px] bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.1s' }} />
          </div>
        )}

        {/* Track Title */}
        <div className="text-right hidden sm:block max-w-40 overflow-hidden text-ellipsis">
          <p className="text-[11px] font-sans font-semibold text-yellow-400 truncate tracking-wide">
            {tracks[currentTrackIndex].title}
          </p>
          <p className="text-[9px] font-sans text-stone-300 truncate">
            {tracks[currentTrackIndex].artist}
          </p>
        </div>

        {/* Rotating CD Icon */}
        <div className={`p-1 text-yellow-500 rounded-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
          <Disc className="w-5 h-5 text-yellow-500/80" />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center glow-gold"
          id="btn-play-music"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-white/10 text-stone-300 rounded-full transition-all duration-300"
          id="btn-mute-music"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Playlist dropdown (Compact mini drawer) */}
      <div className="group relative">
        <button className="text-[10px] text-yellow-500/70 hover:text-yellow-400 underline font-sans mr-4 tracking-wide cursor-pointer flex items-center gap-1">
          <Music className="w-3 h-3" /> Change Melody
        </button>
        
        {/* Popover list */}
        <div className="absolute right-0 top-5 bg-stone-950/95 border border-yellow-600/30 rounded-xl p-2 w-52 shadow-2xl opacity-0 scale-95 pointer-events-none group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50 backdrop-blur-lg">
          <p className="text-[10px] font-sans uppercase font-bold tracking-wider text-stone-400 px-2 py-1 border-b border-stone-800">
            Select Raga
          </p>
          <div className="flex flex-col gap-1 mt-1">
            {tracks.map((track, idx) => (
              <button
                key={idx}
                onClick={() => handleTrackChange(idx)}
                className={`text-left text-xs px-2 py-1.5 rounded-lg font-sans transition-all duration-200 ${
                  idx === currentTrackIndex
                    ? 'bg-yellow-500/20 text-yellow-400 font-medium'
                    : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                {track.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <span className="text-[9px] text-yellow-500/60 font-sans tracking-wide mr-4">
          Click Play to enjoy background sitar music 🌟
        </span>
      )}
    </div>
  );
}
