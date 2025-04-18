import React, { useState } from 'react';
import './Cell.css';

interface CellProps {
  row: number;
  col: number;
}

const Cell: React.FC<CellProps> = ({ row, col }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow only 1-6 or empty
    if (input === '' || (/^[1-6]$/.test(input))) {
      setValue(input);
    }
  };

  return (
    <input
      className="sudoku-cell"
      type="text"
      maxLength={1}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Cell;
