import React from 'react';
import './SudokuGrid.css';
import Cell from './Cell';

const SudokuGrid: React.FC = () => {
  const grid = Array.from({ length: 6 }, () => Array(6).fill(''));

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((_, colIndex) => {
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
                <Cell row={rowIndex} col={colIndex} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
