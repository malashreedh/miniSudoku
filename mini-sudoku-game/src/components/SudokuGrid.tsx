//EVERYTHING WORKING
import React, { useState } from 'react';
import './SudokuGrid.css';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import {
  Board,
  Cell as SudokuCell,
  cloneBoard,
  generatePuzzleOnePerBox,
  isBoardSolved,
} from '../utils/sudoku';

interface SudokuGridProps {
  setIsWin: (value: boolean) => void;
  isWin: boolean;
}

const SIZE = 6;
const BLOCK_ROWS = 2;  // each mini-block is 2 rows
const BLOCK_COLS = 3;  // each mini-block is 3 columns

const SudokuGrid: React.FC<SudokuGridProps> = ({ setIsWin, isWin }) => {
  // 1-per-box starting puzzle
  const [initialPuzzle, setInitialPuzzle] = useState<Board>(
    generatePuzzleOnePerBox()
  );
  const [board, setBoard] = useState<Board>(cloneBoard(initialPuzzle));
  // store conflicts as "r,c" strings
  const [conflicts, setConflicts] = useState<Set<string>>(new Set());

  // scan entire board for duplicates among user entries
  const computeAllConflicts = (b: Board): Set<string> => {
    const conflictSet = new Set<string>();
    const tag = (r: number, c: number) => `${r},${c}`;

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = b[r][c];
        // only check user-entered (non-prefilled) cells with a value
        if (cell.value !== null && !initialPuzzle[r][c].readOnly) {
          const v = cell.value;

          // ROW
          for (let cc = 0; cc < SIZE; cc++) {
            if (cc === c) continue;
            if (b[r][cc].value === v) {
              // if other is prefilled → only mark this user cell
              if (initialPuzzle[r][cc].readOnly) {
                conflictSet.add(tag(r, c));
              } else {
                // both user-entered → mark both
                conflictSet.add(tag(r, c));
                conflictSet.add(tag(r, cc));
              }
            }
          }

          // COLUMN
          for (let rr = 0; rr < SIZE; rr++) {
            if (rr === r) continue;
            if (b[rr][c].value === v) {
              if (initialPuzzle[rr][c].readOnly) {
                conflictSet.add(tag(r, c));
              } else {
                conflictSet.add(tag(r, c));
                conflictSet.add(tag(rr, c));
              }
            }
          }

          // BLOCK (2×3)
          const br = Math.floor(r / BLOCK_ROWS) * BLOCK_ROWS;
          const bc = Math.floor(c / BLOCK_COLS) * BLOCK_COLS;
          for (let rr = br; rr < br + BLOCK_ROWS; rr++) {
            for (let cc = bc; cc < bc + BLOCK_COLS; cc++) {
              if (rr === r && cc === c) continue;
              if (b[rr][cc].value === v) {
                if (initialPuzzle[rr][cc].readOnly) {
                  conflictSet.add(tag(r, c));
                } else {
                  conflictSet.add(tag(r, c));
                  conflictSet.add(tag(rr, cc));
                }
              }
            }
          }
        }
      }
    }

    return conflictSet;
  };

  const handleChange = (row: number, col: number, value: string) => {
    // never edit prefilled
    if (initialPuzzle[row][col].readOnly) return;

    // parse & update
    const intValue = parseInt(value, 10);
    const newBoard = cloneBoard(board);
    newBoard[row][col].value = isNaN(intValue) ? null : intValue;
    setBoard(newBoard);

    // calculate conflicts
    const newConflicts = computeAllConflicts(newBoard);
    setConflicts(newConflicts);

    // if no conflicts and solved → win
    if (newConflicts.size === 0 && isBoardSolved(newBoard)) {
      setIsWin(true);
    } else if (newConflicts.size > 0) {
      setIsWin(false);
    }
  };

  const handleReset = () => {
    setBoard(cloneBoard(initialPuzzle));
    setConflicts(new Set());
    setIsWin(false);
  };

  const handleNewGame = () => {
    const newPuzzle = generatePuzzleOnePerBox();
    setInitialPuzzle(newPuzzle);
    setBoard(cloneBoard(newPuzzle));
    setConflicts(new Set());
    setIsWin(false);
  };

  const handleHint = () => {
    /* disabled */
  };

  return (
    <>
      <div className="grid-container">
        {board.map((rowArr, r) => (
          <div className="row" key={r}>
            {rowArr.map((cell: SudokuCell, c) => {
              const isPrefilled = initialPuzzle[r][c].readOnly;
              const keyTag = `${r},${c}`;
              const isConflicted = conflicts.has(keyTag);

              // choose background: red for conflict, grey for prefilled, white otherwise
              let bg: string | undefined;
              if (isConflicted) bg = '#ffcccc';
              else if (isPrefilled) bg = '#f0f0f0';

              return (
                <div
                  key={keyTag}
                  style={{
                    borderRight:
                      (c + 1) % BLOCK_COLS === 0 ? '2px solid black' : '1px solid #ccc',
                    borderBottom:
                      (r + 1) % BLOCK_ROWS === 0 ? '2px solid black' : '1px solid #ccc',
                    borderLeft: c === 0 ? '2px solid black' : undefined,
                    borderTop: r === 0 ? '2px solid black' : undefined,
                    backgroundColor: bg
                  }}
                >
                  <Cell
                    row={r}
                    col={c}
                    value={cell.value !== null ? cell.value.toString() : ''}
                    isEditable={!isPrefilled}
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
