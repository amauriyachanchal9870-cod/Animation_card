'use strict';
'use client';

import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [stage, setStage] = useState<'card' | 'question' | 'celebration'>('card');
  const [noPosition, setNoPosition] = useState<{ top: string; left: string; position: 'static' | 'fixed' }>({ top: 'auto', left: 'auto', position: 'static' });

  // Confetti logic
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

  const handleYesClick = () => {
    setStage('celebration');
    triggerConfetti();
  };

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100); // 100 approx width
    const y = Math.random() * (window.innerHeight - 50); // 50 approx height
    setNoPosition({ top: `${y}px`, left: `${x}px`, position: 'fixed' });
  };

  return (
    <div className="container">
      {stage === 'card' && (
        <div className="card" onClick={() => setStage('question')}>
          <div className="card-content">
            <h1>For My Favorite Person</h1>
            <p>To the girl who makes every day brighter.</p>
            <div className="heart-icon">❤️</div>
            <p className="tap-hint">Tap to open</p>
          </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
