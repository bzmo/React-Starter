let Minesweeper = (function MineSweeper() {
  /* Author: Bo Mo
   * Date: March 2017
   *
   * Implements the necessary data structures and operations for Minesweeper!
   */

  /* The Minesweeper board will be represented by a 2D array of characters:
   *  Example:
   *  [['E', 'E', 'E', 'E'],
   *   ['E', 'M', 'E', 'E'],
   *   ['E', 'E', 'E', 'E']]
   *
   *  Where the different types of characters represent the following:
   *  'E' - Unrevealed Empty Square
   *  'M' - Unrevealed Mine
   *  'B' - Revealed Blank Square
   *  '[1-8]' - Revealed Digit
   *  'X' - Revealed Mine
   *
   *  '?' will be used to flag unrevealed squares by appending '?': 'E?' or 'M?'
   *
   *  The idea for this project came from leetcode:
   *    https://leetcode.com/problems/minesweeper/#/description
   *
   *  For many of the below functions:
   *    board: char[][]
   *    click: int[row, col]
   */

  // Export this to know which difficulty levels exist
  const DIFFICULTY_CONFIGURATIONS = {
    // Restrict levels to a couple difficulties: "BEGINNER", "INTERMEDIATE", "EXPERT"
    BEGINNER: { row : 8, col: 8, minesCount: 10 },
    INTERMEDIATE: { row: 16, col: 16, minesCount: 40 },
    EXPERT: { row: 24, col: 24, minesCount: 99 }

    // TODO: Custom difficulty with custom board dimensions
  }

  // Private
  function generateRandomBoard(rowCount, colCount, mineCount) {
    const totalSquaresCount = rowCount * colCount;
    let board = [];

    // First, initialize a 2D array with the bombs at the start
    for (let i = 0; i < rowCount; i++) {
      let row = [];

      for (let j = 0; j < colCount; j++) {
        let char = 'E';

        if (mineCount > 0) {
          char = 'M';
          mineCount--;
        }

        row.push(char);
      }

      board.push(row);
    }

    // Repeatedly swap randomly chosen squares with the end of our board to
    //  shuffle our board
    for (let i = 0; i < rowCount * colCount; i++) {
      const swapIndex = Math.floor(Math.random() * (totalSquaresCount - i));
      const row = Math.floor(swapIndex / colCount);
      const col = swapIndex % rowCount;

      // Get indices for the end of our array which have not been swapped yet
      const rowEnd = Math.floor((totalSquaresCount - i - 1) / colCount);
      const colEnd = ((totalSquaresCount - i) % rowCount);

      // Perform our swap
      const tmp = board[row][col];
      board[row][col] = board[rowEnd][colEnd];
      board[rowEnd][colEnd] = tmp;
    }

    return board;
  }

  // Private
  function getAdjMinesCount(board, click) {
    const row = click[0];
    const col = click[1];
    let count = 0;

    // Check All 8 Adjacent positions
    count += isMine(board, [row, col - 1]) ? 1 : 0;     // Left
    count += isMine(board, [row, col + 1]) ? 1 : 0;     // Right
    count += isMine(board, [row - 1, col - 1]) ? 1: 0;  // Upper left
    count += isMine(board, [row - 1, col]) ? 1 : 0;     // Above
    count += isMine(board, [row - 1, col + 1]) ? 1 : 0; // Upper right
    count += isMine(board, [row + 1, col - 1]) ? 1 : 0; // Bottom left
    count += isMine(board, [row + 1, col]) ? 1 : 0;     // Bottom
    count += isMine(board, [row + 1, col + 1]) ? 1 : 0; // Bottom Right

    return count;
  }

  // Private
  function visit(board, click) {
    const rowsCount = board.length;
    const colsCount = board[0].length;
    const row = click[0];
    const col = click[1];

    // Check if 'click's position is within bounds
    if (row >= 0 && row < rowsCount && col >= 0 && col < colsCount) {

      // The square at 'click' is an 'Unrevealed Empty Square'
      if (board[row][col] === 'E') {
        let adjMinesCount = getAdjMinesCount(board, click);

        if (adjMinesCount !== 0) {
          board[row][col] = String.fromCharCode(48 + adjMinesCount);
        } else {
          board[row][col] = 'B';
          // Visit all adjacent spaces recursively
          visit(board, [row - 1, col - 1]);   // Upper Left
          visit(board, [row - 1, col]);       // Above
          visit(board, [row - 1, col + 1]);   // Upper Right
          visit(board, [row, col - 1]);       // Left
          visit(board, [row, col + 1]);       // Right
          visit(board, [row + 1, col - 1]);   // Bottom Left
          visit(board, [row + 1, col]);       // Below
          visit(board, [row + 1, col + 1]);   // Bottom Right
        }
      }
      /* Otherwise, the square is either an 'Unrevealed Mine' or a 'Revealed Blank Square' or a 'Digit',
       *  in which case we don't visit them recursively to avoid an infinite recursive loop.
       */
    }
 }

 // Private
 function revealAllMines(board) {
   const rows = board.length;
   const cols = board[0].length;

   for (let i = 0; i < rows; i++) {
     for (let j = 0; j < cols; j++) {
       const val = board[i][j];

       if (val.charAt(0) === 'M') {
         board[i][j] = 'X';
       }
     }
   }

   return board;
 }

 // Returns true if the square at position 'click' is a mine and false otherwise
 function isMine (board, click) {
   const rowsCount = board.length;
   const colsCount = board[0].length;
   const row = click[0];
   const col = click[1];

   // Check if the clicked position is within the bounds of the board
   if (row >= 0 && row < rowsCount && col >= 0 && col < colsCount) {
     if (board[row][col].charAt(0) === 'M' || board[row][col] === 'X') {
       return true;
     }
   }

   return false;
 }

 // Returns true if the square at position 'click' is an exploded mine and false otherwise
 function isExplodedMine(board, click) {
   const row = click[0];
   const col = click[1];
   return board[row][col].charAt(0) === 'X';
 }

 // Returns true if the square at position 'click' has a digit value and false otherwise
 function isDigit(board, click) {
   const row = click[0];
   const col = click[1];
   return board[row][col].charAt(0) >= '1' && board[row][col].charAt(0) <= '8';
 }

 // Returns true if the square at position click is flagged and false otherwise
 function isFlagged(board, click) {
   const row = click[0];
   const col = click[1];
   return board[row][col].length == 2;
 }

 // Returns true if the square at position click is revealed and false otherwise
 function isRevealed(board, click) {
   const row = click[0];
   const col = click[1];
   return !(board[row][col].charAt(0) === 'M' || board[row][col].charAt(0) === 'E');
 }

 // Returns true if the game is won and false otherwise
 function isGameWon(board) {
     const rows = board.length;
     const cols = board[0].length;

     // Return false the moment we find an 'Unrevealed Empty Square'
     for (let i = 0; i < rows; i++) {
       for (let j = 0; j < cols; j++) {
         if (board[i][j].charAt(0) == 'E') {
           return false;
         }
       }
     }

     return true;
 }

 // Return basically a 'controller', since these functions change the data in our underlying model
 return {
   updateBoard: (board, click) => {
      if (isFlagged(board, click)) { return board; }

      if (isMine(board, click)) {
        revealAllMines(board);
        return board; // End of Game
      }

      visit(board, click);
      return board;
    },
   initNewBoard: (difficulty) => {
       const rowCount = DIFFICULTY_CONFIGURATIONS[difficulty].row;
       const colCount = DIFFICULTY_CONFIGURATIONS[difficulty].col;
       const minesCount = DIFFICULTY_CONFIGURATIONS[difficulty].minesCount;

       return generateRandomBoard(rowCount, colCount, minesCount);
    },
   flagSquare: (board, click) => {
       const row = click[0];
       const col = click[1];
       const val = board[row][col];

       if (val === 'M' || val === 'E') {
         board[row][col] = val + '?';   // Append '?' to say the field is marked
       } else if (val === 'M?' || val === 'E?') {
         board[row][col] = val.charAt(0); // Get rid of '?'
       }

       return board;
     },
    DIFFICULTY_CONFIGURATIONS,
    isMine,
    isFlagged,
    isRevealed,
    isDigit,
    isExplodedMine,
    isGameWon
  }
})();

export default Minesweeper;
