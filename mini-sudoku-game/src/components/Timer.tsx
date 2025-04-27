import React, { useEffect, useState, useRef } from 'react';

interface TimerProps {
  isWin: boolean;
  isPaused: boolean;
}

const Timer: React.FC<TimerProps> = ({ isWin, isPaused }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isWin || isPaused) {
      // Game is won or paused --> stop the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isWin, isPaused]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
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
