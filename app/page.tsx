'use strict';
'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useTypewriter } from './hooks/useTypewriter';

export default function Home() {
  const [stage, setStage] = useState<'card' | 'message' | 'question' | 'celebration'>('card');
  const [noPosition, setNoPosition] = useState<{ top: string; left: string; position: 'static' | 'fixed' }>({ top: 'auto', left: 'auto', position: 'static' });

  // Audio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Heartfelt messages - Expanded
  const messages = [
    "In a world full of people...",
    "My eyes always search for you.",
    "You make my heart smile in ways no one else can.",
    "Every moment with you is a favorite memory.",
    "So I have a very special question for you..."
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Reasons Why
  const reasons = [
    "You have the kindest heart ❤️",
    "Your smile lights up the room ✨",
    "You make me laugh when I'm down 😂",
    "You always support my crazy ideas 🚀",
    "You are just simply amazing 🌟",
    "I can be myself around you 🦄"
  ];
  const [showReasons, setShowReasons] = useState(false);

  // Background elements (Hearts + Words)
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number }[]>([]);
  const words = [
    { text: "Love", top: "15%", left: "10%", delay: "0s" },
    { text: "You", top: "25%", left: "80%", delay: "2s" },
    { text: "Forever", top: "70%", left: "15%", delay: "4s" },
    { text: "Bestie", top: "60%", left: "75%", delay: "1s" },
    { text: "Us", top: "85%", left: "50%", delay: "3s" }
  ];

  // Typewriter effect
  const { displayedText, isComplete } = useTypewriter(messages[currentMessageIndex], 40);

  useEffect(() => {
    // Generate hearts
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5 // 5-10s
    }));
    setHearts(newHearts);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startExperience = () => {
    setStage('message');
    // Try to play music on first interaction
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio autoplay failed:", e));
    }
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
    } else {
      setStage('question');
    }
  };

  const handleYesClick = () => {
    setStage('celebration');
    triggerConfetti();
  };

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoPosition({ top: `${y}px`, left: `${x}px`, position: 'fixed' });
  };

  return (
    <div className="container">
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        {/* Replaced with a more romantic piano tune */}
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio Control */}
      <div className="audio-control" onClick={toggleMusic}>
        {isPlaying ? '🔊' : '🔇'}
      </div>

      {/* Animated Gradient Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Floating Background Words */}
      {words.map((word, i) => (
        <div
          key={i}
          className="floating-word"
          style={{ top: word.top, left: word.left, animationDelay: word.delay }}
        >
          {word.text}
        </div>
      ))}

      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {stage === 'card' && (
        <div className="card" onClick={startExperience}>
          <div className="card-content">
            <h1>For My Favorite Person</h1>
            <p>To the girl who makes every day brighter.</p>
            <div className="heart-icon">❤️</div>
            <p className="tap-hint">Tap to open</p>
          </div>
        </div>
      )}

      {stage === 'message' && (
        <div className="message-content">
          <h2>Dear Bestie...</h2>
          <div className="message-text-container">
            <p className="message-text">{displayedText}</p>
          </div>
          {isComplete && (
            <button className="nextBtn" onClick={handleNextMessage}>
              {currentMessageIndex < messages.length - 1 ? "Next ❤️" : "Continue 🌹"}
            </button>
          )}
        </div>
      )}

      {stage === 'question' && (
        <div className="popup-content">
          <h2>Will you be my Valentine?</h2>
          <p>You mean the world to me! 🌹</p>
          <div className="buttons">
            <button className="yesBtn" onClick={handleYesClick}>Yes! 💖</button>
            <button
              className="noBtn"
              style={{ position: noPosition.position, top: noPosition.top, left: noPosition.left } as any}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No 😢
            </button>
          </div>
        </div>
      )}

      {stage === 'celebration' && (
        <div className="celebration">
          <div className="celebration-content">
            <h1>Yay! 💖</h1>
            <p>Congratulations! You are officially my Valentine!</p>
            <p>Can&apos;t wait to celebrate with you! 🎉</p>

            {!showReasons ? (
              <button
                className="nextBtn"
                style={{ marginTop: '20px' }}
                onClick={() => setShowReasons(true)}
              >
                Why I chose you... 📜
              </button>
            ) : (
              <div className="reasons-container">
                {reasons.map((reason, i) => (
                  <div key={i} className="reason-item">
                    {reason}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
