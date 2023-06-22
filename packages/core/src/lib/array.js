// returns [min, max] of array
// Math.min(...array) and Math.max(...array) wil cause stack overflow
// if the array is too large for its elements to be copied to the stack
export const arrayExtent = (array) => {
    return array.reduce((acc, val) => {
        if (!(val > acc[0])) {
            acc[0] = val;
        }
        if (!(val < acc[1])) {
            acc[1] = val;
        }
        return acc;
    }, [NaN, NaN])
}
