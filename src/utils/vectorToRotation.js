const vectorToRotation = ([x, y]) => {
    if (x === 1 && y === 0) return 90;
    if (x === 0 && y === 1) return 180;
    if (x === -1 && y === 0) return 270;
    if (x === 0 && y === -1) return 0;
    return 0;
}


export default vectorToRotation;
