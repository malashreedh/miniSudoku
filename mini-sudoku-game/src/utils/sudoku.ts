export type Cell = {
    value: number | null;
    readOnly: boolean;
};
export type Board = Cell[][];

const BOARD_SIZE = 6;
const BLOCK_ROWS = 2;
const BLOCK_COLS = 3;
const POSSIBLE_VALUES = [1,2,3,4,5,6];

//creating an empty 6x6 sudoku board
export function createEmptyBoard(): Board {
    return Array.from({ length: BOARD_SIZE }, () =>
      Array.from({length: BOARD_SIZE }, () =>
        ({value: null, readOnly: false}))
    );
}

//Deep copy to avoid mutation
export function cloneBoard(board: Board): Board {
    return board.map(row =>
        row.map(cell => ({ ...cell }))
    );
}

//Checking for validity based on sudoku rules (no same number in row/column/block)
export function isValidMove(board: Board, row: number, col: number, value: number): boolean{
    //legal number:
    if (value<1 || value > BOARD_SIZE) return false;
    //row and column
    for (let i = 0; i<BOARD_SIZE; i++){
        if (i !== col && board[row][i].value === value) return false;
        if (i !== row && board[i][col].value === value) return false;
    }
    //block
    const blockRowStart = Math.floor(row/BLOCK_ROWS)*BLOCK_ROWS;
    const blockColStart = Math.floor(col/BLOCK_COLS)*BLOCK_COLS;
    for (let r=blockRowStart; r<blockRowStart + BLOCK_ROWS; r++){
        for (let c=blockColStart; c<blockColStart + BLOCK_COLS; c++){
            if((r!==row || c!==col) && board[r][c].value===value){
                return false;
            }
        }
    }
    return true;
}
//check for complete and correct board
export function isBoardSolved(board: Board): boolean {
    for (let row=0; row< BOARD_SIZE; row++){
        for (let col=0; col<BOARD_SIZE; col++){
            const cell = board[row][col];
            if(!cell.value || !isValidMove(board, row, col, cell.value)) {
                return false;
            }
        }
    }
    return true;
}
//basic generator to fill a few VALID & RANDOM cells
export function generatePuzzle(clues: number=10): Board {
    const board = createEmptyBoard();
    let filled=0;
    while (filled<clues) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        if (board[row][col].value !== null) continue;
        const values = shuffle([...POSSIBLE_VALUES]);
        for (const val of values) {
            if (isValidMove(board, row, col, val)){
                board[row][col] = {value:val, readOnly: true};
                filled++;
                break;
            }
        }
    }
    return board;
}
//shuffle function
function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}
