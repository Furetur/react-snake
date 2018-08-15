import React, { Component } from 'react'
import { CELL_SIZE, multiplyCellSize, unitize } from '../../config/cells';
import Cell from '../Cell';
import vectorToRotation from '../../utils/vectorToRotation';
import loop from '../../utils/loop';
import vectorsAreOpposite from '../../utils/vectorsAreOpposite';

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


  get tail() {
    return this.state.cells[
      this.state.cells.length - 1
    ];
  }

  get vector() {
    return this.head.vector;
  }


  hasCell(cell) {
    return this.state.cells.find(snakeCell => snakeCell.x === cell.x && snakeCell.y === cell.y) !== undefined;
  }


  _getNextCell(cell) {
    return {
      x: this.loopX(cell.x + cell.vector[0]),
      y: this.loopY(cell.y + cell.vector[1]),
      vector: cell.vector,
    }
  }

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

  componentDidUpdate() {
    this.props.onUpdate(this.state.cells);
  }

  
  render() {
    return (
      <div>
        {this.state.cells.map(
          (cell, index) => <Cell key={index} x={cell.x} y={cell.y} rotation={vectorToRotation(cell.vector)} />
        )}
      </div>
    )
  }
}
