const vectorToRotation = ([x, y]) => {
    if (x === 1 && y === 0) return 0;
    if (x === 0 && y === 1) return 90;
    if (x === -1 && y === 0) return 180;
    if (x === 0 && y === -1) return 270;
    return 0;
}


export default vectorToRotation;
