import React from 'react';
import './Cell.css';

interface CellProps {
  row: number;
  col: number;
  value: string;
  onChange: (row: number, col: number, value: string) => void;
  isEditable: boolean;
}

const Cell: React.FC<CellProps> = ({ row, col, value, onChange, isEditable }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input === '' || /^[1-6]$/.test(input)) {
      onChange(row, col, input);
    }
  };

  return (
    <input
      className={`sudoku-cell ${!isEditable ? 'locked-cell' : ''}`}
      type="text"
      maxLength={1}
      value={value}
      onChange={handleInput}
      readOnly={!isEditable}
    />
  );
};

export default Cell;
