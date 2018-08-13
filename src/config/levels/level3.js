import wait from "../../utils/wait";

const level3 = {
    name: 'Level2',
    snakeStartCell: {
        x: 10,
        y: 10,
        vector: [1, 0],
    },
    startFigures: [],
    gridWidth: 40,
    gridHeight: 40,
    levelGoal: 4,
};


level3.init = (addFigureFunction, getCellOccupation) => {
    const filler = new Filler(addFigureFunction);
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
};


class Filler {
    constructor(fillCell) {
        this.fillCell = fillCell;
    }


    async horizontalWall({ y, fromX, toX }) {
        for (let x = fromX; x <= toX; x++) {
            await wait(1);
            this.fillCell({
                type: 'block',
                x: x,
                y: y,
            });
        }
    }


    async verticalWall({ x, fromY, toY }) {
        for (let y = fromY; y <= toY; y++) {
            await wait(1);
            this.fillCell({
                type: 'block',
                x: x,
                y: y,
            });
        }
    }
}


export default level3;
