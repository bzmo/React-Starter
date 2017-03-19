import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Minesweeper from './components/minesweeper';
import Info from './components/info';

class App extends Component {
  constructor (props) {
      super(props);
  }

  render() {
    return (
      <div>
        <Info />
        <Minesweeper />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
