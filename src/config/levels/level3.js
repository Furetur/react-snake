import wait from "../../utils/wait";


class Filler {
    constructor(fillCell) {
        this.figures = [];
    }

    _addFigure(figure) {
        this.figures.push(figure);
    }

    async horizontalWall({ y, fromX, toX }) {
        for (let x = fromX; x <= toX; x++) {
            await wait(1);
            this._addFigure({
                type: 'block',
                x: x,
                y: y,
            });
        }
    }


    async verticalWall({ x, fromY, toY }) {
        for (let y = fromY; y <= toY; y++) {
            await wait(1);
            this._addFigure({
                type: 'block',
                x: x,
                y: y,
            });
        }
    }
}


const getStartRoom = () => {
    const filler = new Filler();
    // upper-left corner
    filler.verticalWall({
        x: 0,
        fromY: 0,
        toY: 5,
    });
    filler.horizontalWall({
        y: 0,
        fromX: 0,
        toX: 6,
    })

    // upper wall
    filler.horizontalWall({
        y: 0,
        fromX: 10,
        toX: 30,
    });

    // upper-left room walls
    filler.horizontalWall({
        y: 8,
        fromX: 0,
        toX: 15,
    });
    filler.verticalWall({
        x: 15,
        fromY: 0,
        toY: 8,
    });

    // upper-right room wall
    filler.horizontalWall({
        y: 8,
        fromX: 20,
        toX: 39,
    })

    // bottom wall
    filler.horizontalWall({
        y: 15,
        fromX: 0,
        toX: 39,
    })

    // separating wall
    filler.verticalWall({
        x: 20,
        fromY: 15,
        toY: 20,
    })

    return filler.figures;
}

const level3 = {
    name: 'Level2',
    snakeStartCell: {
        x: 10,
        y: 10,
        vector: [1, 0],
    },
    startFigures: getStartRoom(),
    gridWidth: 40,
    gridHeight: 21,
    levelGoal: 4,
};


level3.init = (addFigureFunction, getCellOccupation) => {
    
};




export default level3;
