import React, { useState } from 'react';
import './SudokuGrid.css';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import {
  Board,
  Cell as SudokuCell,
  cloneBoard,
  generatePuzzle,
  isBoardSolved
} from '../utils/sudoku';

interface SudokuGridProps {
  setIsWin: (value: boolean) => void;
  isWin: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ setIsWin, isWin }) => {
  const [initialPuzzle, setInitialPuzzle] = useState<Board>(generatePuzzle(10));
  const [board, setBoard] = useState<Board>(cloneBoard(initialPuzzle));

  const handleChange = (row: number, col: number, value: string) => {
    const intValue = parseInt(value);
    const newBoard = cloneBoard(board);

    if (!isNaN(intValue)) {
      newBoard[row][col].value = intValue;
    } else {
      newBoard[row][col].value = null;
    }

    setBoard(newBoard);

    if (isBoardSolved(newBoard)) {
      setIsWin(true);
    }
  };

  const handleHint = () => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col].value === null) {
          const newBoard = cloneBoard(board);
          newBoard[row][col].value = generatePuzzle(1)[row][col].value;
          newBoard[row][col].readOnly = true;
          setBoard(newBoard);

          if (isBoardSolved(newBoard)) {
            setIsWin(true);
          }

          return;
        }
      }
    }
  };

  const handleReset = () => {
    setBoard(cloneBoard(initialPuzzle));
    setIsWin(false);
  };

  const handleNewGame = () => {
    const newPuzzle = generatePuzzle(10);
    setInitialPuzzle(newPuzzle);
    setBoard(cloneBoard(newPuzzle));
    setIsWin(false);
  };

  return (
    <>
      <div className="grid-container">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell: SudokuCell, colIndex: number) => {
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
                    value={cell.value ? cell.value.toString() : ''}
                    isEditable={!cell.readOnly}
                    onChange={handleChange}
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
