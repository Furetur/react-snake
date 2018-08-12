import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameField from './components/GameField';



class App extends Component {
  onKeyDown(event) {
    if (event.key === ' ') {
      this.gameField.snake.move();
    }
    if (event.key === 'ArrowUp') {
      this.gameField.snake.turn([0, -1]);
    }
    if (event.key === 'ArrowLeft') {
      this.gameField.snake.turn([-1, 0]);
    }
    if (event.key === 'ArrowDown') {
      this.gameField.snake.turn([0, 1]);
    }
    if (event.key === 'ArrowRight') {
      this.gameField.snake.turn([1, 0]);
    }
    if (event.key === 'x') {
      this.gameField.snake.extendTail();
    }
  }


  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={e => this.onKeyDown(e)} >
        <GameField gridHeight="20" gridWidth="15" ref={gameField => this.gameField = gameField} />
      </div>
    );
  }
}

export default App;
