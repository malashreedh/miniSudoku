//EVERYTHING IS WORKING!!!
import React from 'react';
import './Cell.css';

interface CellProps {
  row: number;
  col: number;
  value: string;
  isEditable: boolean;
  onChange: (row: number, col: number, value: string) => void;
}

const Cell: React.FC<CellProps> = ({ row, col, value, isEditable, onChange }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(row, col, e.target.value);
  };

  return (
    <input
      className="sudoku-cell"
      type="text"
      maxLength={1}
      value={value}
      onChange={handleInput}
      readOnly={!isEditable}
    />
  );
};

export default Cell;
