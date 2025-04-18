import React from 'react';
import './SudokuGrid.css';

const SudokuGrid: React.FC = () => {
  const grid = Array.from({ length: 6 }, () => Array(6).fill(''));

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div className="cell" key={colIndex}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
