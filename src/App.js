import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameField from './components/GameField';



class App extends Component {
  onKeyDown(event) {
    if (event.key === ' ') {
      this.gameField.snake.move();
    }
    if (event.key === 'w') {
      this.gameField.snake.turn([0, -1]);
    }
    if (event.key === 'a') {
      this.gameField.snake.turn([-1, 0]);
    }
    if (event.key === 's') {
      this.gameField.snake.turn([0, 1]);
    }
    if (event.key === 'd') {
      this.gameField.snake.turn([1, 0]);
    }
    if (event.key === 'x') {
      this.gameField.snake.extendTail();
    }
  }


  render() {
    return (
      <div className="App" tabIndex="0" onKeyPress={e => this.onKeyDown(e)} >
        <GameField gridHeight="20" gridWidth="15" ref={gameField => this.gameField = gameField} />
      </div>
    );
  }
}

export default App;
