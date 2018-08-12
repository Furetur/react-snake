import React, { Component } from 'react';

import './style.css';
import Cell from '../Cell';
import { CELL_WIDTH, CELL_SIZE, multiplyCellSize, unitize } from '../../config/cells';
import Snake from '../Snake';
import Figure from '../Figure';
import hasCell from '../../utils/hasCell';

class GameField extends Component {
    constructor(props) {
        super(props);

        const testFigures  = [
            { id: 0, type: 'poison', x: 7, y: 10 },
            { id: 1, type: 'poison', x: 10, y: 10 },
            { id: 2, type: 'poison', x: 3, y: 10 },
            { id: 3, type: 'health', x: 4, y: 7 },
            { id: 4, type: 'health', x: 10, y: 2 },
            { id: 5, type: 'health', x: 3, y: 6 },
            { id: 6, type: 'block', x: 4, y: 4 },
        ];

        const snakeStartCell = {
            x: 1,
            y: 1,
            vector: [1, 0],
        }

        this.state = {
            snake: {
                startCell: snakeStartCell,
            },
            figures: testFigures,
            gridHeight: parseInt(props.gridHeight),
            gridWidth: parseInt(props.gridWidth),
        }
    }


    /**
     * Only checks collision between snake and other figures
     * Figures can only be 1 cell
     */
    _checkCollision(snakeCells) {
        this.state.figures.forEach((figure, index) => {
            if (hasCell(snakeCells, figure)) {
                // they collide
                this._handleCollision(index, figure)
            }
        })
    }


    _handleCollision(figureIndex, figure) {
        if (figure.type === 'health') this._healthFigureOnCollide(figureIndex);
        if (figure.type === 'poison') this._poisonFigureOnCollide(figureIndex);
        if (figure.type === 'block') this._blockFigureOnCollide();
    }

    _healthFigureOnCollide(figureIndex) {
        this._removeFigure(figureIndex);
        this.snake.extendTail();
    }


    _poisonFigureOnCollide(figureIndex) {
        this._removeFigure(figureIndex);
        this.snake.shortenTail();
    }


    _blockFigureOnCollide() {
        this.snake.kill();
    }

    
    _getFigure(id) {
        return this[`figure${id}`];
    }

    _removeFigure(id) {
        console.log('deleting figure', this.state.figures.find((f, i) => i === id));
        this.setState({
            figures: this.state.figures.filter((figure, index) => index !== id),
        });
    }

    _figureRef = (id) => {
        return (figure) => this[`figure${id}`] = figure;
    }


    // this method is called after the component is updated
    _onSnakeUpdate = (snakeCells) => {
        if (snakeCells.length === 0) alert('whooops');

        this._checkCollision(snakeCells);
    }


    render() {
        const styles = {
            width: unitize(CELL_SIZE * this.props.gridWidth),
            height: unitize(CELL_SIZE * this.props.gridHeight),
            backgroundColor: 'rgba(#fff, .5)',
	        backgroundImage: 'linear-gradient(rgba(150, 150, 150, .3) 1px, transparent 1px), linear-gradient(90deg, rgba(150, 150, 150, .3) 1px, transparent 1px)',
	        backgroundSize: `${unitize(CELL_SIZE)} ${unitize(CELL_SIZE)}, ${unitize(CELL_SIZE)} ${unitize(CELL_SIZE)}`,
	        backgroundPosition: '-1px -1px, -1px -1px',
        }

        
        return (
            <div className="GameField" style={styles}>
                <Snake startCell={this.state.snake.startCell}
                    maxX={this.state.gridWidth - 1} maxY={this.state.gridHeight - 1}
                    ref={snake => this.snake = snake}
                    onUpdate={this._onSnakeUpdate} />
                { this.state.figures.map(
                    (figure, index) => 
                        <Figure key={figure.id} type={figure.type}
                            x={figure.x} y={figure.y}
                            ref={this._figureRef(index)} />
                ) }
            </div>
        );
    }
}


export default GameField;
