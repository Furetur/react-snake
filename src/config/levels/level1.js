const level1 = {
    name: 'Level1',
    snakeStartCell: {
        x: 1,
        y: 1,
        vector: [1, 0],
    },
    startFigures: [
        { id: 0, type: 'poison', x: 7, y: 10 },
        { id: 1, type: 'poison', x: 10, y: 10 },
        { id: 2, type: 'poison', x: 3, y: 10 },
        { id: 3, type: 'health', x: 4, y: 7 },
        { id: 4, type: 'health', x: 10, y: 2 },
        { id: 5, type: 'health', x: 3, y: 6 },
        { id: 6, type: 'block', x: 4, y: 4 },
    ],
    gridWidth: 25,
    gridHeight: 25,
    levelGoal: 4,
}


level1.init = (addFigureFunction) => {};


export default level1;
