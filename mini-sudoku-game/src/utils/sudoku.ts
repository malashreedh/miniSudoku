//EVERYTHING IS WORKING PERFECTLY!!!
export type Cell = {
    value: number | null;
    readOnly: boolean;
  };
  export type Board = Cell[][];
  
  // Constants
  const BOARD_SIZE = 6;
  const BLOCK_ROWS = 2;
  const BLOCK_COLS = 3;
  const POSSIBLE_VALUES = [1, 2, 3, 4, 5, 6];
  
  // Create an empty 6x6 board
  export function createEmptyBoard(): Board {
    return Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({
        value: null,
        readOnly: false,
      }))
    );
  }
  
  // Deep clone a board
  export function cloneBoard(board: Board): Board {
    return board.map(row => row.map(cell => ({ ...cell })));
  }
  
  // Check if placing a value is valid
  export function isValidMove(board: Board, row: number, col: number, value: number): boolean {
    if (value < 1 || value > BOARD_SIZE) return false;
  
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (i !== col && board[row][i].value === value) return false;
      if (i !== row && board[i][col].value === value) return false;
    }
  
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
  
  // Check if the board is fully solved
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
  
  // Solve the board (backtracking)
  export function solvePuzzle(board: Board): boolean {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c].value === null) {
          for (let v of shuffle([...POSSIBLE_VALUES])) {
            if (isValidMove(board, r, c, v)) {
              board[r][c].value = v;
              if (solvePuzzle(board)) return true;
              board[r][c].value = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  // Fully fill a board with a correct solution
  export function generateFullSolution(): Board {
    const board = createEmptyBoard();
    solvePuzzle(board);
    return board;
  }
  
  // Create a puzzle by removing cells but keeping a few clues
  export function generatePuzzleFromSolution(solution: Board, clues: number = 6): Board {
    const puzzle = cloneBoard(solution).map(row =>
      row.map(cell => ({ value: cell.value, readOnly: false }))
    );
  
    let cells = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        cells.push([r, c]);
      }
    }
  
    shuffle(cells);
  
    let removed = 0;
    const maxRemove = BOARD_SIZE * BOARD_SIZE - clues;
  
    for (let [r, c] of cells) {
      if (removed >= maxRemove) break;
      puzzle[r][c].value = null;
      removed++;
    }
  
    // Mark remaining cells as readOnly
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (puzzle[r][c].value !== null) {
          puzzle[r][c].readOnly = true;
        }
      }
    }
  
    return puzzle;
  }
  
  // Shuffle helper
  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  