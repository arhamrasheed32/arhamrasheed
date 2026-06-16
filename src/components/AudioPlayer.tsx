'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Attempt to play immediately on mount. If blocked by browser policy, fallback to interaction listeners.
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.3 // Default volume
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          setHasInteracted(true)
        } catch (err) {
          console.warn("Autoplay blocked by browser. Waiting for interaction.", err)
        }
      }
    }

    playAudio()

    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.3
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        }).catch((err) => {
          console.warn("Audio playback failed:", err)
        })
      }
    }

    if (!hasInteracted) {
      window.addEventListener('click', handleInteraction, { once: true })
      window.addEventListener('scroll', handleInteraction, { once: true })
      window.addEventListener('keydown', handleInteraction, { once: true })
      window.addEventListener('touchstart', handleInteraction, { once: true })
    }

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [hasInteracted])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
        setHasInteracted(true)
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/interstellar.mp3"
        loop
        className="hidden"
      />
      
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={toggleMute}
        className="fixed bottom-8 left-10 z-[100] p-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-white/50 hover:text-white/90 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110" />
        )}
      </motion.button>
    </>
  )
}
