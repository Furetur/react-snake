import React, { Component } from 'react';

import './style.css';
import Cell from '../Cell';
import { CELL_WIDTH, CELL_SIZE, multiplyCellSize, unitize } from '../../config/cells';
import Snake from '../Snake';
import Figure from '../Figure';
import hasCell from '../../utils/hasCell';
import getAllCells from '../../utils/getAllCells';
import randomFromArray from '../../utils/randomFromArray';

class GameField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snakeAlive: false,
            figures: [],
            gridHeight: 0,
            gridWidth: 0,
        };
        this.levelUpdatesIndex = 0;
    }


    /**
     * Only checks collision between snake and other figures
     * Figures can only be 1 cell
     */
    _checkCollision(snakeCells) {
        this.state.figures.forEach((figure, index) => {
            // if snake collides with a figure
            if (hasCell(snakeCells, figure)) {
                // they collide
                this._handleCollision(index, figure)
            }
            
            // if snake collides with itself
            // just check if `snakeCells` has duplicates
            const coordsArray = snakeCells.map(cell => `x=${cell.x};y=${cell.y};`);
            const withoutDuplicates = new Set(coordsArray);

            // if number of elements = number of non-duplicate elements
            if (coordsArray.length !== withoutDuplicates.size) {
                // snake collides with itself
                this._handleSnakeOnCollideWithSelf();
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

    _handleSnakeOnCollideWithSelf() {
        this.snake.kill();
    }

    
    _getFigure(id) {
        return this[`figure${id}`];
    }

    _getUniqueFigureKey = (figure) => {
        const figureIds = this.state.figures.map(figure => figure.id);

        if (figureIds.length === 0) return 0;
        return Math.max(...figureIds) + 1;
    }

    _addFigure = (figure) => {
        console.log('adding figure', figure, this.state.figures);

        // if cell is already occupied
        if (this._getCellOccupation(figure) !== null)  {
            // then stop this function
            return;
        }

        figure.id = this._getUniqueFigureKey();;
        this.setState({
            figures: [figure, ...this.state.figures],
        });
    }


    _removeFigure(id) {
        console.log('deleting figure', this.state.figures.find((f, i) => i === id));
        this.setState({
            figures: this.state.figures.filter((figure, index) => index !== id),
        });
    }

    _addFigureFunctionForLevel(level) {
        // this function lets a level add a figure only if the level is active
        return (figure) => {
            if (level === this.level) {
                this._addFigure(figure)
            }
        }
    }

    _getCellOccupation = (cell) => {
        // check if cell is occupied by a figure
        for (let figure of this.state.figures) {
            if (figure.x === cell.x && figure.y === cell.y) return figure;
        }
        if (this.snake && this.snake.hasCell(cell)) {
            return 'snake';
        }
        return null;
    }

    _getRandomUnoccupiedCell() {
        const unoccupiedCells = getAllCells(this.state.gridWidth - 1, this.state.gridHeight - 1).filter(cell => this._getCellOccupation(cell) === null);
        // if all cells are occupied
        if (unoccupiedCells.length === 0) return null;
        // return random cell
        return randomFromArray(unoccupiedCells);
    }

    _stopSpawningHealthOrPoison = () => {
        clearInterval(this.figureSpawningInterval);
    }

    _startSpawningHealthOrPoison = (interval) => {
        this.figureSpawningInterval = setInterval(() => {
            // pick cell randomly
            const cell = this._getRandomUnoccupiedCell();
            // if there are no cells free -> stop spawning
            if (cell === null) this._stopSpawningHealthOrPoison();
            // pick a random type
            const type = randomFromArray(['health', 'poison']);
            // spawn the thing
            this._addFigure({
                type: type,
                ...cell,
            })
        }, interval);
    }


    _figureRef = (id) => {
        return (figure) => this[`figure${id}`] = figure;
    }


    // this method is called after the snake is updated
    _onSnakeUpdate = (snakeCells) => {
        if (snakeCells.length === 0) this.onSnakeDie();
        if (snakeCells.length === this.state.levelGoal) this.props.onLevelComplete();

        this._checkCollision(snakeCells);
    }


    onSnakeDie() {
        alert('snake has died');
        this.setState({
            snake: null,
        });
        this.props.onSnakeDie();
    }

    _updateLevel() {
        console.log('loading', this.props.level.name);
        // remember the level
        this.level = this.props.level;
        this.setState({
            snake: <Snake key={this.levelUpdatesIndex}
                startCell={this.level.snakeStartCell}
                maxX={this.level.gridWidth - 1} maxY={this.level.gridHeight - 1}
                ref={snake => this.snake = snake}
                onUpdate={this._onSnakeUpdate} />,
            levelGoal: this.level.levelGoal,
            snakeAlive: true,
            snakeStartCell: this.level.snakeStartCell,
            levelSpawningInterval: this.level.levelSpawningInterval,
            figures: this.level.startFigures,
            gridWidth: this.level.gridWidth,
            gridHeight: this.level.gridHeight,
        });
        this.level.init(
            this._addFigureFunctionForLevel(this.level),
            this._getCellOccupation
        );
        this.levelUpdatesIndex++;
    }

    _updateGame() {
        this._stopSpawningHealthOrPoison();
        this._updateLevel();
        this._startSpawningHealthOrPoison(this.props.level.levelSpawningInterval);
    }

    componentDidMount() {
        console.log('game field mounted');
        this._updateGame();
    }

    componentDidUpdate() {
        console.log('game field updated');
        // if level in props exists and it is not equal to the saved level
        if (this.props.level && this.props.level !== this.level) {
            // level has changed
            this._updateGame();
        }
    }


    render() {
        console.log('game field rerendered');
        if (this.snake) console.log(this.snake.cells);
        const styles = {
            width: unitize(CELL_SIZE * this.state.gridWidth),
            height: unitize(CELL_SIZE * this.state.gridHeight),
            backgroundColor: 'rgba(#fff, .5)',
	        backgroundImage: 'linear-gradient(rgba(150, 150, 150, .3) 1px, transparent 1px), linear-gradient(90deg, rgba(150, 150, 150, .3) 1px, transparent 1px)',
	        backgroundSize: `${unitize(CELL_SIZE)} ${unitize(CELL_SIZE)}, ${unitize(CELL_SIZE)} ${unitize(CELL_SIZE)}`,
	        backgroundPosition: '-1px -1px, -1px -1px',
        }

        
        return (
            <div className="GameField" style={styles}>
                {/* render snake if it is alive */}
                { this.state.snake }

                {/* render all the figures */}
                { this.state.figures.map(
                    (figure, index) => 
                        /* */
                        <Figure key={`${this.levelUpdatesIndex}-${figure.id}`} type={figure.type}
                            x={figure.x} y={figure.y}
                            ref={this._figureRef(index)} />
                ) }
            </div>
        );
    }
}


export default GameField;
