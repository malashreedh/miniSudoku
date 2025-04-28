// EVERYTHING WORKING
export type Cell = {
    value: number | null;
    readOnly: boolean;
  };
  export type Board = Cell[][];
  
  // constants
  const BOARD_SIZE = 6;
  const BLOCK_ROWS = 3;
  const BLOCK_COLS = 2;
  const POSSIBLE_VALUES = [1, 2, 3, 4, 5, 6];
  
  // create an empty 6x6 board
  export function createEmptyBoard(): Board {
    return Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({
        value: null,
        readOnly: false,
      }))
    );
  }
  
  // deep copy the board
  export function cloneBoard(board: Board): Board {
    return board.map(row =>
      row.map(cell => ({ ...cell }))
    );
  }
  
  // check if move is valid
  export function isValidMove(board: Board, row: number, col: number, value: number): boolean {
    if (value < 1 || value > BOARD_SIZE) return false;
  
    // row and column check
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (i !== col && board[row][i].value === value) return false;
      if (i !== row && board[i][col].value === value) return false;
    }
  
    // block check
    const blockRowStart = Math.floor(row / BLOCK_ROWS) * BLOCK_ROWS;
    const blockColStart = Math.floor(col / BLOCK_COLS) * BLOCK_COLS;
  
    for (let r = blockRowStart; r < blockRowStart + BLOCK_ROWS; r++) {
      for (let c = blockColStart; c < blockColStart + BLOCK_COLS; c++) {
        if ((r !== row || c !== col) && board[r][c].value === value) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  // check if board is completely solved
  export function isBoardSolved(board: Board): boolean {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = board[row][col];
        if (!cell.value || !isValidMove(board, row, col, cell.value)) {
          return false;
        }
      }
    }
    return true;
  }
  
  // (optional) old random puzzle generator
  export function generatePuzzle(clues: number = 10): Board {
    const board = createEmptyBoard();
    let filled = 0;
  
    while (filled < clues) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (board[row][col].value !== null) continue;
  
      const values = shuffle([...POSSIBLE_VALUES]);
      for (const val of values) {
        if (isValidMove(board, row, col, val)) {
          board[row][col] = { value: val, readOnly: true };
          filled++;
          break;
        }
      }
    }
  
    return board;
  }
  
  // final preferred generator: 1 per block
  export function generatePuzzleOnePerBox(): Board {
    const board = createEmptyBoard();
  
    for (let blockRow = 0; blockRow < BOARD_SIZE / BLOCK_ROWS; blockRow++) {
      for (let blockCol = 0; blockCol < BOARD_SIZE / BLOCK_COLS; blockCol++) {
        const startRow = blockRow * BLOCK_ROWS;
        const startCol = blockCol * BLOCK_COLS;
  
        const blockCells: [number, number][] = [];
        for (let r = startRow; r < startRow + BLOCK_ROWS; r++) {
          for (let c = startCol; c < startCol + BLOCK_COLS; c++) {
            blockCells.push([r, c]);
          }
        }
  
        const [randomRow, randomCol] = blockCells[Math.floor(Math.random() * blockCells.length)];
        const values = shuffle([...POSSIBLE_VALUES]);
        for (const val of values) {
          if (isValidMove(board, randomRow, randomCol, val)) {
            board[randomRow][randomCol] = { value: val, readOnly: true };
            break;
          }
        }
      }
    }
  
    return board;
  }
  
  // shuffle utility
  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
// in src/utils/sudoku.ts

/**
 * Solve the board in-place. Returns true if solved.
 */
export function solvePuzzle(board: Board): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c].value === null) {
        for (let v of POSSIBLE_VALUES) {
          if (isValidMove(board, r, c, v)) {
            board[r][c].value = v;
            if (solvePuzzle(board)) return true;
            board[r][c].value = null;
          }
        }
        return false; // no valid value
      }
    }
  }
  return true; // no empties left => solved
}
