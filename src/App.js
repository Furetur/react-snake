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
import Score from './components/Score';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attempt: 0,
      level: 0,
      focused: false,
      keyIsDown: false,
    }
  }

  get currentLevel() {
    return this.levels[this.state.level];
  }

  /**
   * Is called when the app's main div gains focus
   */
  onFocus = () => {
    this.setState({
      focused: true,
    });
  }

  /**
   * Is called when the app's main div loses focus
   */
  onBlur = () => {
    this.setState({
      focused: false,
    });
  }


  /**
   * Is called when user presses a key
   */
  onKeyDown = (event) => {
    // this prevents user from holding down a button
    if (this.state.keyIsDown) {
      return;
    }

    this.setState({
      keyIsDown: true,
    })

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
  }

  /**
   * Is called when tuser releases a key
   */
  onKeyUp = () => {
    this.setState({
      keyIsDown: false,
    })
  }

  /**
   * Starts moving a snake each `SNAKE_MOVING_SPEED`ms
   */
  startMovingSnake() {
    this.snakeInterval = setInterval(
      this.moveSnake,
      SNAKE_MOVING_SPEED,
    )
  }
  
  /**
   * Stops moving a snake each couple of ms
   */
  stopMovingSnake() {
    clearInterval(this.snakeInterval);
  }


  /**
   * Moves a snake 1 cell
   */
  moveSnake = () => {
    this.gameField.snake.move();
  }


  /**
   * Turns a snake to the direction of given vector
   * @param {number[]} vector [x, y]
   */
  turnSnake(vector) {
    // if snake is atleast 2 cells long
    // we cant turn snake 180 def
    if (this.gameField.snake.prehead && vectorsAreOpposite(vector, this.gameField.snake.prehead.vector)) return;

    // if snake is already moving in the same direction
    if (vector[0] === this.gameField.snake.vector[0] && vector[1] === this.gameField.snake.vector[1]) return;

    this.stopMovingSnake();
    this.gameField.snake.turn(vector);
    this.startMovingSnake();
  }


  /**
   * A list of all levels (order matters)
   */
  levels = [
    level1,
    level2,
    level3,
  ];

  /**
   * Is called when level is completed
   */
  onLevelComplete = () => {
    // if it is the last level
    if (this.state.level === this.levels.length - 1) {
      this.onGameWon();
      return;
    }

    this.setState({
      level: this.state.level + 1
    });
  }


  /**
   * Is called when player loses the game
   */
  onGameLost = () => {
    this.stopMovingSnake();
    this.setState({
      attempt: this.state.attempt + 1,
      level: 0,
    });
    this.startMovingSnake();
  }

  /**
   * Is called when player wins the game
   */
  onGameWon() {
    window.location.href = 'https://www.youtube.com/watch?v=IMZo-aBp9OQ';
  }

  /**
   * Part of the react component lifecycle
   * Is called after the component is rendered for the first time
   */
  componentDidMount() {
    this.startMovingSnake();
  }


  render() {
    return (
      <div className="App" tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} ref={div => this.mainDiv = div}>
        <div className={`focus-reminder ${this.state.focused ? '' : 'shown'}`}>Focus the game (by clicking once)</div>
        <GameField key={this.state.attempt} level={this.currentLevel} onLevelComplete={this.onLevelComplete} onSnakeDie={this.onGameLost} ref={gameField => this.gameField = gameField} />
      </div>
    );
  }
}

export default App;
