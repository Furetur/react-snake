import React, { Component } from 'react'
import { CELL_SIZE, multiplyCellSize, unitize } from '../../config/cells';
import Cell from '../Cell';
import vectorToRotation from '../../utils/vectorToRotation';
import loop from '../../utils/loop';
import vectorsAreOpposite from '../../utils/vectorsAreOpposite';

import './style.css';

export default class Snake extends Component {
  constructor(props) {
    super(props);

    this.type = 'snake';

    this.state = {
      cells: [props.startCell],
    }

    this.loopX = loop(props.maxX);
    this.loopY = loop(props.maxY);
  }

  get length() {
    return this.state.cells.length;
  }

  get head() {
    return this.state.cells[0];
  }

  get prehead() {
    return this.state.cells[1];
  }


  get tail() {
    return this.state.cells[this.tailIndex];
  }

  get tailIndex() {
    return this.state.cells.length - 1;
  }


  get config() {
    return this.state.cells.map(cell => cell.vector).toString();
  }


  hasCell(cell) {
    return this.state.cells.find(snakeCell => snakeCell.x === cell.x && snakeCell.y === cell.y) !== undefined;
  }


  /**
   * Returns a next cell based on its vector
   * @param {{x: number, y: number, vector: [number, number]}} cell 
   */
  _getNextCell(cell) {
    return {
      x: this.loopX(cell.x + cell.vector[0]),
      y: this.loopY(cell.y + cell.vector[1]),
      vector: cell.vector,
    }
  }

  /**
   * Returns a previous cell based on its (inversed) vector
   * @param {{x: number, y: number, vector: [number, number]}} cell 
   */
  _getPreviousCell(cell) {
    return {
      x: this.loopX(cell.x + -cell.vector[0]),
      y: this.loopY(cell.y + -cell.vector[1]),
      vector: cell.vector,
    }
  }


  extendTail() {
    const newTailCell = this._getPreviousCell(this.tail);
    this.setState({
      cells: [...this.state.cells, newTailCell],
    });
  }


  shortenTail() {
    this.setState({
      cells: this.state.cells.slice(0, -1),
    })
  }


  move() {
    const newHeadCell = this._getNextCell(this.head);
    const cellsWithoutTail = this.state.cells.slice(0, -1);

    this.setState({
      cells: [newHeadCell, ...cellsWithoutTail],
    });
  }

  turn(vector) {
    const head = this.head;
    head.vector = vector;
    this.setState({
      cells: [head, ...this.state.cells.slice(1)],
    })
  }

  kill() {
    this.setState({
      cells: [],
    })
  }

  /**
   * Is called each time snake is updated
   */
  componentDidUpdate() {
    this.props.onUpdate(this.state.cells);
  }

  
  render() {
    return (
      <div>
        {this.state.cells.map(
          (cell, index) => <Cell key={index} className={`Snake ${index === 0 ? 'head' : ''} ${index === this.tailIndex ? 'tail' : ''}`}
            x={cell.x} y={cell.y} rotation={vectorToRotation(cell.vector)} />
        )}
      </div>
    )
  }
}
