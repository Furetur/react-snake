import Builder from "../../utils/Builder";

const getStartFigures = () => {
    const builder = new Builder();

    // top wall
    builder.horizontalWall({
        y: 5,
        fromX: 5,
        toX: 10,
    });

    builder.horizontalWall({
        y: 5,
        fromX: 15,
        toX: 29,
    });

    // left wall
    builder.verticalWall({
        x: 5,
        fromY: 5,
        toY: 15,
    });

    builder.verticalWall({
        x: 5,
        fromY: 20,
        toY: 23,
    });

    //bottom wall
    builder.horizontalWall({
        y: 23,
        fromX: 5,
        toX: 29,
    });

    // right wall
    builder.verticalWall({
        x: 29,
        fromY: 5,
        toY: 10,
    });

    builder.verticalWall({
        x: 29,
        fromY: 12,
        toY: 17,
    });

    builder.verticalWall({
        x: 29,
        fromY: 20,
        toY: 23,
    });

    return builder.figures;
}

const level1 = {
    name: 'Level1',
    snakeStartCell: {
        x: 1,
        y: 1,
        vector: [1, 0],
    },
    startFigures: getStartFigures(),
    gridWidth: 35,
    gridHeight: 25,
    levelGoal: 40,
    levelSpawningInterval: 2000,

    easterEggSnakeConfig: '0,-1,0,-1,0,-1,1,0,1,0,0,1,0,1,-1,0,-1,0',
}


level1.init = (addFigureFunction) => {};


export default level1;
