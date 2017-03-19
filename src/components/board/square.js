import React from 'react';

/*
 * The Square component displays a single square with the appropriate color/picture
 */

const Square = ({row, col, onSquareClick, flagSquare, square, isRevealed, isFlagged,
                      isMine, isGameOver, isExplodedMine, isDigit}) => {

  // Returns the correct value to display: digit, .png, or ''
  function getDisplayValue(val) {
    if (isExplodedMine(row, col)) {
      return ( <img src="./img/mine.png" height="20" width="20" /> )
    }
    if (isFlagged(row, col)) {
      return ( <img src="./img/flag.png" height="20" width="20" /> )
    }
    if (isDigit(row, col)) { return val; }

    return '';
  }

  // Returns the correct CSS class that we want the component to have
  function getClassName() {
    if (isMine(row, col) && isGameOver()) { return "square-mined" }
    if (isRevealed(row, col)) { return "square-clicked"; }
    return "square";
  }

  return(
    <td className={ getClassName() }
        key={"row" + row + "col" + col}
        onContextMenu= { () => flagSquare(row, col) }
        onClick={ () => onSquareClick(row, col) }>
      { getDisplayValue(square) }
    </td>
  );
}

export default Square;
