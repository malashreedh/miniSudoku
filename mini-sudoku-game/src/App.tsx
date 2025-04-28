//EVERYTHING WORKING PERFECTLY!!!!
// src/App.tsx
import React, { useState } from 'react';
import Timer from './components/Timer';
import SudokuGrid from './components/SudokuGrid';
import WinModal from './components/WinModal';
import './App.css';

function App() {
  const [isWin, setIsWin] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const handlePause = () => setIsPaused(prev => !prev);
  const handleCloseWin = () => setIsWin(false);

  return (
    <div className="App" style={{ position: 'relative' }}>
      <h1>Mini Sudoku</h1>

      <Timer
        isWin={isWin}
        isPaused={isPaused}
        seconds={seconds}
        setSeconds={setSeconds}
      />

      <button onClick={handlePause} style={{ marginBottom: '10px' }}>
        {isPaused ? 'Resume Timer' : 'Pause Timer'}
      </button>

      {/* 💤 Paused message positioned lower */}
      {isPaused && (
        <div
          style={{
            position: 'absolute',
            top: '280px', // moved down
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            color: 'gray',
            background: 'white',
            padding: '20px 30px',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}
        >
          💤 Game Paused
        </div>
      )}

      {/* 🌟 Blur the board if paused */}
      <div
        style={{
          filter: isPaused ? 'blur(5px)' : 'none',
          pointerEvents: isPaused ? 'none' : 'auto',
          transition: 'filter 0.3s ease'
        }}
      >
        {/* Show win modal immediately if win */}
        {isWin && <WinModal onClose={handleCloseWin} />}
        <SudokuGrid setIsWin={setIsWin} isWin={isWin} />
      </div>
    </div>
  );
}

export default App;
