import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameField from './components/GameField';
import level1 from './config/levels/level1';
import level2 from './config/levels/level2';
import { VECTOR_UP, VECTOR_LEFT, VECTOR_DOWN, VECTOR_RIGHT } from './config/vectors';
import level3 from './config/levels/level3';
import { SNAKE_MOVING_SPEED } from './config/snake';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0,
    }
  }
  onKeyDown(event) {
    if (event.key === ' ') {
      this.startMovingSnake();
    }
    if (event.key === 'ArrowUp') {
      this.turnSnake(VECTOR_UP);
    }
    if (event.key === 'ArrowLeft') {
      this.turnSnake(VECTOR_LEFT);
    }
    if (event.key === 'ArrowDown') {
      this.turnSnake(VECTOR_DOWN);
    }
    if (event.key === 'ArrowRight') {
      this.turnSnake(VECTOR_RIGHT);
    }
    if (event.key === 'x') {
      this.gameField.snake.extendTail();
    }
  }

  startMovingSnake() {
    this.snakeInterval = setInterval(
      this.moveSnake,
      SNAKE_MOVING_SPEED,
    )
  }

  moveSnake = () => {
    this.gameField.snake.move();
  }

  turnSnake(vector) {
    this.stopMovingSnake();
    this.gameField.snake.turn(vector);
    this.startMovingSnake();
  }

  stopMovingSnake() {
    clearInterval(this.snakeInterval);
  }

  levels = [
    level1,
    level2,
    level3,
  ];

  onLevelComplete = () => {
    console.log(this);
    console.log(this.state.level, this.levels.length)

    this.setState({
      level: this.state.level + 1
    });
  }


  onGameLost = () => {
    this.stopMovingSnake();
    this.setState({
      level: 0,
    });
  }

  onGameWon() {
    alert('game won');
  }


  render() {
    console.log('app updated');
    return (
      <div className="App" tabIndex="0" onKeyDown={e => this.onKeyDown(e)} >
        <GameField level={this.levels[this.state.level]} onLevelComplete={this.onLevelComplete} onSnakeDie={this.onGameLost} ref={gameField => this.gameField = gameField} />
      </div>
    );
  }
}

export default App;
