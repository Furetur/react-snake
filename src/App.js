import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameField from './components/GameField';
import level1 from './config/levels/level1';
import level2 from './config/levels/level2';
import { VECTOR_UP, VECTOR_LEFT, VECTOR_DOWN, VECTOR_RIGHT } from './config/vectors';
import level3 from './config/levels/level3';
import { SNAKE_MOVING_SPEED } from './config/snake';
import vectorsAreOpposite from './utils/vectorsAreOpposite';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attempt: 0,
      level: 0,
      focused: false,
    }
  }

  onFocus = () => {
    this.setState({
      focused: true,
    });
  }

  onBlur = () => {
    this.setState({
      focused: false,
    });
  }


  onKeyDown(event) {
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
    // we cant turn snake 180 def
    if (vectorsAreOpposite(vector, this.gameField.snake.vector)) return;

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
      attempt: this.state.attempt + 1,
      level: 0,
    });
    this.startMovingSnake();
  }

  onGameWon() {
    alert('game won');
  }

  componentDidMount() {
    this.startMovingSnake();
  }


  render() {
    console.log('app updated');
    return (
      <div className="App" tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={e => this.onKeyDown(e)} ref={div => this.mainDiv = div} >
        <div className={`focus-reminder ${this.state.focused ? '' : 'shown'}`}>Focus the game (by clicking once) to control the snake</div>
        <GameField key={this.state.attempt} level={this.levels[this.state.level]} onLevelComplete={this.onLevelComplete} onSnakeDie={this.onGameLost} ref={gameField => this.gameField = gameField} />
      </div>
    );
  }
}

export default App;
