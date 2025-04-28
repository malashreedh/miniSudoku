//EVERYTHING IS WORKING!!!
import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import {
  Board,
  Cell as SudokuCell,
  cloneBoard,
  generateFullSolution,
  generatePuzzleFromSolution,
  isBoardSolved,
  solvePuzzle
} from '../utils/sudoku';

interface SudokuGridProps {
  setIsWin: (value: boolean) => void;
  isWin: boolean;
}

const SIZE = 6;
const BLOCK_ROWS = 2;
const BLOCK_COLS = 3;

const SudokuGrid: React.FC<SudokuGridProps> = ({ setIsWin, isWin }) => {
  const [solution, setSolution] = useState<Board>(generateFullSolution());
  const [initialPuzzle, setInitialPuzzle] = useState<Board>(
    generatePuzzleFromSolution(solution)
  );
  const [board, setBoard] = useState<Board>(cloneBoard(initialPuzzle));
  const [conflicts, setConflicts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newSolution = generateFullSolution();
    setSolution(newSolution);
    const newPuzzle = generatePuzzleFromSolution(newSolution);
    setInitialPuzzle(newPuzzle);
    setBoard(cloneBoard(newPuzzle));
    setConflicts(new Set());
    setIsWin(false);
  }, []); // only once on mount

  const computeAllConflicts = (b: Board): Set<string> => {
    const s = new Set<string>();
    const tag = (r: number, c: number) => `${r},${c}`;

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = b[r][c];
        if (cell.value !== null && !initialPuzzle[r][c].readOnly) {
          const v = cell.value;
          for (let cc = 0; cc < SIZE; cc++) {
            if (cc !== c && b[r][cc].value === v && !initialPuzzle[r][cc].readOnly) {
              s.add(tag(r, c));
              s.add(tag(r, cc));
            }
          }
          for (let rr = 0; rr < SIZE; rr++) {
            if (rr !== r && b[rr][c].value === v && !initialPuzzle[rr][c].readOnly) {
              s.add(tag(r, c));
              s.add(tag(rr, c));
            }
          }
          const br = Math.floor(r / BLOCK_ROWS) * BLOCK_ROWS;
          const bc = Math.floor(c / BLOCK_COLS) * BLOCK_COLS;
          for (let rr = br; rr < br + BLOCK_ROWS; rr++) {
            for (let cc = bc; cc < bc + BLOCK_COLS; cc++) {
              if ((rr !== r || cc !== c) && b[rr][cc].value === v && !initialPuzzle[rr][cc].readOnly) {
                s.add(tag(r, c));
                s.add(tag(rr, cc));
              }
            }
          }
        }
      }
    }
    return s;
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (initialPuzzle[row][col].readOnly) return;
    const iv = parseInt(value, 10);
    const nb = cloneBoard(board);
    nb[row][col].value = isNaN(iv) ? null : iv;
    setBoard(nb);

    const cs = computeAllConflicts(nb);
    setConflicts(cs);
    if (cs.size === 0 && isBoardSolved(nb)) setIsWin(true);
    else if (cs.size > 0) setIsWin(false);
  };

  const handleReset = () => {
    setBoard(cloneBoard(initialPuzzle));
    setConflicts(new Set());
    setIsWin(false);
  };

  const handleNewGame = () => {
    const newSolution = generateFullSolution();
    const newPuzzle = generatePuzzleFromSolution(newSolution);
    setSolution(newSolution);
    setInitialPuzzle(newPuzzle);
    setBoard(cloneBoard(newPuzzle));
    setConflicts(new Set());
    setIsWin(false);
  };

  const handleHint = () => {
    if (isWin) return;
    const empties: [number, number][] = [];
    board.forEach((rowArr, r) =>
      rowArr.forEach((cell, c) => {
        if (cell.value === null) empties.push([r, c]);
      })
    );
    if (!empties.length) return;
    const [r, c] = empties[Math.floor(Math.random() * empties.length)];
    const nb = cloneBoard(board);
    nb[r][c].value = solution[r][c].value;
    nb[r][c].readOnly = true;
    setBoard(nb);

    const cs = computeAllConflicts(nb);
    setConflicts(cs);
    if (cs.size === 0 && isBoardSolved(nb)) setIsWin(true);
  };

  return (
    <>
      <div className="grid-container">
        {board.map((rowArr, r) => (
          <div className="row" key={r}>
            {rowArr.map((cell: SudokuCell, c) => {
              const isPref = initialPuzzle[r][c].readOnly;
              const tag = `${r},${c}`;
              const isConf = conflicts.has(tag);
              const bg = isConf ? '#ffcccc' : isPref ? '#f0f0f0' : undefined;

              return (
                <div
                  key={tag}
                  style={{
                    borderRight: (c + 1) % BLOCK_COLS === 0 ? '2px solid black' : '1px solid #ccc',
                    borderBottom: (r + 1) % BLOCK_ROWS === 0 ? '2px solid black' : '1px solid #ccc',
                    borderLeft: c === 0 ? '2px solid black' : undefined,
                    borderTop: r === 0 ? '2px solid black' : undefined,
                    backgroundColor: bg,
                  }}
                >
                  <Cell
                    row={r}
                    col={c}
                    value={cell.value !== null ? cell.value.toString() : ''}
                    isEditable={!isPref}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isWin && (
        <div style={{ marginTop: 12, color: 'green', fontSize: '1.25rem' }}>
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
