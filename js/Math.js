//Remap value to given range [start, end]
function map(value, from, to, start, end) {
	return (value - from) / (to - from) * (end - start) + start;
}
export {map};
