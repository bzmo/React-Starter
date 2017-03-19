
import React, { Component } from 'react';
import Square from './square';

const Board = ({board, isGameOver, flagSquare, isRevealed, isFlagged, isMine,
                  onSquareClick, isExplodedMine, isDigit}) => {
  let rowID = -1;
  const contents = board.map((row) => {
    let colID = 0; rowID++;
    return (
      <tr key={"row" + rowID}>
      {
        row.map((square) => {
          return (
            <Square key={rowID + " " + colID}
                    isGameOver={ isGameOver }
                    square={ square } row={ rowID } col={ colID++ }
                    flagSquare={ (row, col) => flagSquare(row, col) }
                    isRevealed={ (row, col) => isRevealed(row, col) }
                    isFlagged= { (row, col) => isFlagged(row, col) }
                    isMine={ (row, col) => isMine(row, col) }
                    onSquareClick={ (row, col) => onSquareClick(row, col) }
                    isExplodedMine={ (row, col) => isExplodedMine(row, col) }
                    isDigit={ (row, col) => isDigit(row, col) }
            />
          )
        })
      }
      </tr>
    );
  });

  return (
      <table className="table table-bordered">
        <tbody>
          { contents }
        </tbody>
      </table>
    )
  }

export default Board;
