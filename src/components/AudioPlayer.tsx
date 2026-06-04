import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 50,
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
      />
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isPlaying ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isPlaying ? '0 0 15px rgba(255,255,255,0.1)' : 'none',
        }}
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </motion.button>
    </motion.div>
  );
}
