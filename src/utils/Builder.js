class Builder {
    constructor() {
        this.figures = [];
    }

    _addFigure(figure) {
        figure.id = this.figures.length;
        this.figures.push(figure);
    }

    horizontalWall({ y, fromX, toX }) {
        for (let x = fromX; x <= toX; x++) {
            this._addFigure({
                type: 'block',
                x: x,
                y: y,
            });
        }
    }


    verticalWall({ x, fromY, toY }) {
        for (let y = fromY; y <= toY; y++) {
            this._addFigure({
                type: 'block',
                x: x,
                y: y,
            });
        }
    }
}


export default Builder;
