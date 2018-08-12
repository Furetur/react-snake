// loops numbers within [0, max]
const loop = (max) => {
	const numberInRange = (n) => {
		if (n < 0) {
			n = max + n + 1;
			return numberInRange(n);
        } else {
			return n % (max + 1);
        }
		
	}
	
	return numberInRange;
}


export default loop;
