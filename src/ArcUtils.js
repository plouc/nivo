import d3 from 'd3';


export const degreesToRadians = degrees => degrees * Math.PI / 180;

export const radiansToDegrees = radians => 180 * radians / Math.PI;


/**
 * Try to get a neighbor arc, otherwise, returns null.
 *
 * @param {Number} i
 * @param {String} keyProp
 * @param {Array}  prevData
 * @param {Array}  newData
 * @returns {{startAngle: *, endAngle: *}}
 */
export const findNeighbor = (i, keyProp, prevData, newData) => {
    const preceding = findPreceding(i, keyProp, prevData, newData);
    if (preceding) {
        return {
            startAngle: preceding.endAngle,
            endAngle:   preceding.endAngle
        };
    }

    const following = findFollowing(i, keyProp, prevData, newData);
    if (following) {
        return {
            startAngle: following.startAngle,
            endAngle:   following.startAngle
        };
    }

    return null;
};

/**
 * Find the element in prevData that joins the highest preceding element in newData.
 *
 * @param {Number} i
 * @param {String} keyProp
 * @param {Array}  prevData
 * @param {Array}  newData
 * @returns {*}
 */
export const findPreceding = (i, keyProp, prevData, newData) => {
    const m = prevData.length;

    while (--i >= 0) {
        let k = newData[i].data[keyProp];

        for (let j = 0; j < m; ++j) {
            if (prevData[j].data[keyProp] === k) {
                return prevData[j];
            }
        }
    }
};

/**
 * Find the element in prevData that joins the lowest following element in newData.
 *
 * @param {Number} i
 * @param {String} keyProp
 * @param {Array}  prevData
 * @param {Array}  newData
 * @returns {*}
 */
export const findFollowing = (i, keyProp, prevData, newData) => {
    const n = newData.length;
    const m = prevData.length;

    while (++i < n) {
        let k = newData[i].data[keyProp];

        for (let j = 0; j < m; ++j) {
            if (prevData[j].data[keyProp] === k) {
                return prevData[j];
            }
        }
    }
};


export const midAngle = arc => arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
