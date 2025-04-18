import React, { useState } from 'react';
import './SudokuGrid.css';
import Cell from './Cell';

const SudokuGrid: React.FC = () => {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(6).fill(''))
  );

  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r, rowIndex) =>
      r.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setBoard(newBoard);
  };

  return (
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
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
