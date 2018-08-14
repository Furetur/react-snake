const getAllCells = (maxX, maxY) => {
    const cells = [];

    for (let x = 0; x <= maxX; x++) {
        for (let y = 0; y <= maxY; y++) {
            cells.push({ x, y })
        }
    }

    return cells;
}


export default getAllCells;
