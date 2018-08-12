const hasCell = (cells, cell) => {
    return cells.find(c => c.x === cell.x && c.y === cell.y) !== undefined;
}


export default hasCell;
