import random from "./random";

const randomFromArray = array => {
    return array[random(0, array.length - 1)];
}


export default randomFromArray;
