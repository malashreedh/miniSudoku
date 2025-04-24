import React, { useEffect, useState, useRef } from 'react';

interface TimerProps {
  isWin: boolean;
}

const Timer: React.FC<TimerProps> = ({ isWin }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only start the timer if game is not won
    if (!isWin && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // If the user wins, stop the timer
    if (isWin && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Clean up when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isWin]);

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
