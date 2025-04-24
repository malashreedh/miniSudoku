import { useState } from 'react';
import './App.css';
import SudokuGrid from './components/SudokuGrid';
import Timer from './components/Timer';

function App() {

  const [isWin, setIsWin] = useState(false);
  
  return (
    <div className="App">
      <h1>Mini Sudoku</h1>
      <Timer isWin={isWin} />
      <SudokuGrid setIsWin={setIsWin} isWin={isWin} />


    </div>
  );
}

export default App;
