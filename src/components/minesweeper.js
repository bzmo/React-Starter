import React, { Component } from 'react';
import Board from './../model/board';
import Dashboard from './dashboard/dashboard';
import BoardC from './board/board.js'

class Minesweeper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
      board : [],
      scoreMinesCount: 0,
      isGameOver: true
    };

    // Init our timer call, with timer being the 1st set in this.state
    setInterval(() => {
      if (!this.state.isGameOver) {
        this.setState({time: ++this.state.timer});
      }
    }, 1000);
  }

  // Must be called with a difficulty found in the exported Board.DIFFICULTY_CONFIGURATIONS
  resetBoard(difficulty) {
    console.log("Reset the board at " + difficulty + " difficulty.");
    const board = Board.initNewBoard(difficulty.toUpperCase());
    const scoreMinesCount = Board.DIFFICULTY_CONFIGURATIONS[difficulty].minesCount;
    this.setState({ board, isGameOver: false, scoreMinesCount, timer: 0 });
  }

  // Updates the board at position [row, col]
  updateBoard(row, col) {
    console.log("Clicked on [" + row + ", " + col + "].");
    const click = [row, col];

    if (!this.state.isGameOver) {
      const isFlagged = Board.isFlagged(this.state.board, click);
      let isGameOver = !isFlagged && Board.isMine(this.state.board, click);  // Check before we update
      const board = Board.updateBoard(this.state.board, click);

      if (Board.isGameWon(board)) {
        isGameOver = true;
      }

      this.setState({ board, isGameOver });
    }
  }


  // Flags the board at position [row, col]
  flagSquare(row, col) {
    console.log("Flagged [" + row + ", " + col + "].")
    if (!this.state.isGameOver) {
      const click = [row, col];
      const isFlagged = Board.isFlagged(this.state.board, click);
      const isMine = Board.isMine(this.state.board, click);

      if (isFlagged) {
        this.setState({ scoreMinesCount : this.state.scoreMinesCount + 1 }); // Update score
      }
      if (!isFlagged) {
        this.setState({ scoreMinesCount : this.state.scoreMinesCount - 1});  // Update score
      }

      const board = Board.flagSquare(this.state.board, click);
      this.setState({ board });
    }
  }

  isRevealed(row, col) {
    return Board.isRevealed(this.state.board, [row, col]);
  }
  isFlagged(row, col) {
    return Board.isFlagged(this.state.board, [row, col]);
  }
  isMine(row, col) {
    return Board.isMine(this.state.board, [row, col]);
  }
  isExplodedMine(row, col) {
    return Board.isExplodedMine(this.state.board, [row, col]);
  }
  isDigit(row, col) {
    return Board.isDigit(this.state.board, [row, col]);
  }

  render() {
    return (
      <div className="container">
        <Dashboard minesCount={ this.state.scoreMinesCount }
                   onResetClick={ (difficulty) => this.resetBoard(difficulty) }
                   difficultyConfig= { Board.DIFFICULTY_CONFIGURATIONS }
                   timer={ this.state.timer }
                   isGameOver={ this.state.isGameOver }
        />
        <BoardC isGameOver={ () => { return this.state.isGameOver }}
                board={ this.state.board }
                flagSquare={ (row, col) => this.flagSquare(row, col) }
                isRevealed={ (row, col) => this.isRevealed(row, col) }
                isFlagged={ (row, col) => this.isFlagged(row, col) }
                isMine={ (row, col) => this.isMine(row, col) }
                onSquareClick={ (row, col) => this.updateBoard(row, col) }
                isExplodedMine={ (row, col) => this.isExplodedMine(row, col) }
                isDigit={ (row, col) => this.isDigit(row, col) }
        />
      </div>
    );
  }
}

export default Minesweeper;
