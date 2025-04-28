import { useState } from 'react';
import './App.css';
import SudokuGrid from './components/SudokuGrid';
import Timer from './components/Timer';

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isWin, setIsWin] = useState(false);
  
  return (
    <div className="App">
      <h1>Mini Sudoku</h1>
      <Timer isWin={isWin} isPaused={isPaused} />
      <button
        onClick={() => setIsPaused(prev => !prev)}
        style={{ marginBottom: '10px' }}
      >
        {isPaused ? 'Resume Timer' : 'Pause Timer'}
      </button>
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
