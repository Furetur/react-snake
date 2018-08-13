import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameField from './components/GameField';
import level1 from './config/levels/level1';
import level2 from './config/levels/level2';
import { VECTOR_UP, VECTOR_LEFT, VECTOR_DOWN, VECTOR_RIGHT } from './config/vectors';
import level3 from './config/levels/level3';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0,
    }
  }
  onKeyDown(event) {
    if (event.key === ' ') {
      this.gameField.snake.move();
    }
    if (event.key === 'ArrowUp') {
      this.gameField.snake.turn(VECTOR_UP);
    }
    if (event.key === 'ArrowLeft') {
      this.gameField.snake.turn(VECTOR_LEFT);
    }
    if (event.key === 'ArrowDown') {
      this.gameField.snake.turn(VECTOR_DOWN);
    }
    if (event.key === 'ArrowRight') {
      this.gameField.snake.turn(VECTOR_RIGHT);
    }
    if (event.key === 'x') {
      this.gameField.snake.extendTail();
    }
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


  onGameWon() {
    alert('game won');
  }


  render() {
    console.log('app updated');
    return (
      <div className="App" tabIndex="0" onKeyDown={e => this.onKeyDown(e)} >
        <GameField level={this.levels[this.state.level]} onLevelComplete={this.onLevelComplete} ref={gameField => this.gameField = gameField} />
      </div>
    );
  }
}

export default App;
