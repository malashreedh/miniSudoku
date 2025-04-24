import React, { useState } from 'react';
import './SudokuGrid.css';
import Cell from './Cell';
import ControlPanel from './ControlPanel';

interface SudokuGridProps {
    setIsWin: (value: boolean) => void;
    isWin: boolean;
  }
  

// Puzzle 1 and its solution
const initialPuzzle1 = [
  ['1', '', '', '', '', ''],
  ['', '', '', '', '', '3'],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
];

const solution1 = [
  ['1', '2', '3', '4', '5', '6'],
  ['4', '5', '6', '1', '2', '3'],
  ['2', '3', '1', '5', '6', '4'],
  ['5', '6', '4', '2', '3', '1'],
  ['3', '1', '2', '6', '4', '5'],
  ['6', '4', '5', '3', '1', '2'],
];

// Puzzle 2 and its solution
const initialPuzzle2 = [
  ['', '', '3', '', '', '6'],
  ['', '', '', '1', '', ''],
  ['2', '', '', '', '', ''],
  ['', '', '', '', '3', ''],
  ['', '', '1', '', '', ''],
  ['6', '', '', '', '', ''],
];

const solution2 = [
  ['1', '2', '3', '4', '5', '6'],
  ['4', '5', '6', '1', '2', '3'],
  ['2', '3', '1', '5', '6', '4'],
  ['5', '6', '4', '2', '3', '1'],
  ['3', '1', '2', '6', '4', '5'],
  ['6', '4', '5', '3', '1', '2'],
];

const SudokuGrid: React.FC<SudokuGridProps> = ({ setIsWin, isWin }) => {
    const [puzzle, setPuzzle] = useState<string[][]>(initialPuzzle1);
    const [board, setBoard] = useState<string[][]>(initialPuzzle1);
  const [solution, setSolution] = useState<string[][]>(solution1);

  const checkForWin = (currentBoard: string[][]) => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (currentBoard[row][col] !== solution[row][col]) {
          return false;
        }
      }
    }
    return true;
  };
  

  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setBoard(newBoard);
  
    if (checkForWin(newBoard)) {
      setIsWin(true);
    }
  };
  
  const handleHint = () => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (board[row][col] === '') {
          const newBoard = [...board];
          newBoard[row][col] = solution[row][col];
          setBoard(newBoard);

          if (checkForWin(newBoard)) {
            setIsWin(true);
          }

          return;
        }
      }
    }
  };


  const handleReset = () => {
    setBoard(puzzle);
    setIsWin(false);

  };
  
  const handleNewGame = () => {
    setPuzzle(initialPuzzle2);      // Update the current puzzle
    setBoard(initialPuzzle2);       // Set the board
    setSolution(solution2);         // Set the solution
    setIsWin(false);

  };  

  return (
    <>
      <div className="grid-container">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((value, colIndex) => {
              const isRightBlock = (colIndex + 1) % 2 === 0;
              const isBottomBlock = (rowIndex + 1) % 3 === 0;

              const cellStyle = {
                borderRight: isRightBlock ? '2px solid black' : '1px solid #ccc',
                borderBottom: isBottomBlock ? '2px solid black' : '1px solid #ccc',
                borderLeft: colIndex === 0 ? 'none' : '',
                borderTop: rowIndex === 0 ? 'none' : '',
              };

              return (
                <div key={`${rowIndex}-${colIndex}`} style={cellStyle}>
                  <Cell
                    row={rowIndex}
                    col={colIndex}
                    value={value}
                    onChange={handleChange}
                    isEditable={puzzle[rowIndex][colIndex] === ''}
                    />


                </div>
              );
            })}
          </div>
        ))}
      </div>
      {isWin && (
  <div style={{ fontSize: '1.4rem', marginTop: '15px', color: 'green' }}>
    🎉 You solved the puzzle!
  </div>
)}

      <ControlPanel
        onHint={handleHint}
        onReset={handleReset}
        onNewGame={handleNewGame}
      />
    </>
  );
};

export default SudokuGrid;
