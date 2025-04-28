// src/components/Timer.tsx
import React, { useEffect, useRef } from 'react';

interface TimerProps {
  isWin: boolean;
  isPaused: boolean;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ isWin, isPaused, seconds, setSeconds }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If won or paused, stop the timer
    if (isWin || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Otherwise, start if not already running
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isWin, isPaused, setSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
      ⏱️ Time: {formatTime(seconds)}
    </div>
  );
};

export default Timer;
