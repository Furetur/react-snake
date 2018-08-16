import React from 'react'

import './style.css';
import { multiplyCellSize, CELL_SIZE, unitize } from '../../config/cells';

const Cell = (props) => {
  this.vector = props.vector;
  
  const styles = {
    width: unitize(CELL_SIZE),
    height: unitize(CELL_SIZE),

    top: unitize(CELL_SIZE * props.y), 
    left: unitize(CELL_SIZE * props.x),

    lineHeight: unitize(CELL_SIZE),

    transform: `rotate(${props.rotation}deg)`,
  };

  return (
    <div className={`Cell ${props.className}`} style={styles} />
  );
}


export default Cell;
