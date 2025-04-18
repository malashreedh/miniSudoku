import './App.css';
import SudokuGrid from './components/SudokuGrid';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <h1>Mini Sudoku</h1>
      <Timer />
      <SudokuGrid />
    </div>
  );
}

export default App;
