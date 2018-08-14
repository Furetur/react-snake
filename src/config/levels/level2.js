import hasCell from "../../utils/hasCell";
import { VECTOR_UP, VECTOR_LEFT, VECTOR_DOWN, VECTOR_RIGHT } from "../vectors";
import loop from "../../utils/loop";
import wait from "../../utils/wait";
import removeFromArray from "../../utils/removeFromArray";


const CELL_FILLING_TIMEOUT = 100;

const level2 = {
    name: 'Level2',
    snakeStartCell: {
        x: 10,
        y: 10,
        vector: [1, 0],
    },
    startFigures: [],
    gridWidth: 25,
    gridHeight: 15,
    levelGoal: 4,
};


level2.init = (addFigureFunction, getCellOccupation) => {
    const sequence = generateSequence(level2.gridWidth - 1, level2.gridHeight - 1);
    startFillingSequence(sequence, addFigureFunction, getCellOccupation);
};

const startFillingSequence = async (sequence, fillCell, isCellOccupied) => {
    const getCellToFill = (i = 0) => {
        // if by looking for an unoccupied cell we have reached
        // the end of the sequence -> we return null
        if (i === sequence.length) return null;
        // if this cell is free -> return it
        // else -> check if next cell is free
        return isCellOccupied(sequence[i]) ? getCellToFill(i + 1) : sequence[i];
    }

    while (sequence.length !== 0) {
        // wait a couple of ms
        await wait(CELL_FILLING_TIMEOUT);
        // pick a cell to fill which is not occupied by any figures or a snake
        const cellToFill = getCellToFill();
        // if there are none unoccupied cells then we have to stop
        if (cellToFill === null) break;
        // pass this cell to the GameField
        fillCell({
            type: 'block',
            ...cellToFill,
        });
        removeFromArray(sequence, cellToFill);
    }
}

const generateSequence = (maxX, maxY) => {
    const sequence = [];

    let cell = {
        x: 0,
        y: 0,
    };
    let vector = VECTOR_DOWN;
    let isLeftCellOffLimits = false;

    const isCellOffLimits = (cell) => {
        return hasCell(sequence, cell) || cell.x > maxX || cell.y > maxY || cell.x < 0 || cell.y < 0;
    }
    
    let i = 0;

    while (i < (maxX + 1) * (maxY + 1)) {
        console.log(maxX, maxY, sequence.length, cell)
        sequence.push(cell);
        let nextCell = getNextCellFor(cell, vector);
        // if next cell is off limits we need to turn left
        if (isCellOffLimits(nextCell)) {
            vector = rotateVectorAnticlockwise(vector);
            nextCell = getNextCellFor(cell, vector);
        }
        // move
        cell = nextCell;
        // check if it is the end
        const leftCell = getNextCellFor(cell, rotateVectorAnticlockwise(vector));
        isLeftCellOffLimits = isCellOffLimits(leftCell);
        i++;
    }

    return sequence;
}


const getNextCellFor = (previousCell, vector) => {
    return {
        x: previousCell.x + vector[0],
        y: previousCell.y + vector[1],
    }
}

const vectorsAnticlockwise = [
    VECTOR_UP,
    VECTOR_LEFT,
    VECTOR_DOWN,
    VECTOR_RIGHT,
];

const loopVector = loop(vectorsAnticlockwise.length - 1);

const rotateVectorAnticlockwise = (vector) => {
    const vectorIndex = vectorsAnticlockwise.findIndex(
        v => v[0] === vector[0] && v[1] === vector[1]
    );
    const newVectorIndex = loopVector(vectorIndex + 1);
    return vectorsAnticlockwise[newVectorIndex];
}


export default level2;