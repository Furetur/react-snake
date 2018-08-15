import wait from "../../utils/wait";
import Builder from "../../utils/Builder";



const getStartRoom = () => {
    const builder = new Builder();
    // upper-left corner
    builder.verticalWall({
        x: 0,
        fromY: 0,
        toY: 5,
    });
    builder.horizontalWall({
        y: 0,
        fromX: 0,
        toX: 6,
    })

    // upper wall
    builder.horizontalWall({
        y: 0,
        fromX: 10,
        toX: 30,
    });

    // upper-left room walls
    builder.horizontalWall({
        y: 8,
        fromX: 0,
        toX: 15,
    });
    builder.verticalWall({
        x: 15,
        fromY: 0,
        toY: 8,
    });

    // upper-right room wall
    builder.horizontalWall({
        y: 8,
        fromX: 20,
        toX: 39,
    })

    // bottom wall
    builder.horizontalWall({
        y: 15,
        fromX: 0,
        toX: 39,
    })

    // separating wall
    builder.verticalWall({
        x: 20,
        fromY: 15,
        toY: 20,
    })

    return builder.figures;
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
    levelGoal: 70,
    levelSpawningInterval: 2000,
};


level3.init = (addFigureFunction, getCellOccupation) => {
    
};




export default level3;
