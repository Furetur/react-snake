import React, { Component } from 'react'
import Cell from '../Cell';

import './style.css';

export default class Figure extends Component {
  constructor(props) {
    super(props);

    this.type = props.type;

    this.cell = {
      x: props.x,
      y: props.y,
    }
  }

  
  render() {
    return (
      <div>
        <Cell x={this.cell.x} y={this.cell.y} className={`Figure ${this.type}`} />
      </div>
    )
  }
}
