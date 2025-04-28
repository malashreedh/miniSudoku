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
    <div className="App">
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

      {isWin && <WinModal onClose={handleCloseWin} />}

      {isPaused ? (
        <div style={{ fontSize: '1.5rem', margin: '20px', color: 'gray' }}>
          💤 Game Paused
        </div>
      ) : (
        <SudokuGrid setIsWin={setIsWin} isWin={isWin} />
      )}
    </div>
  );
}

export default App;
