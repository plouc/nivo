/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import d3 from 'd3';


export const degreesToRadians = degrees => degrees * Math.PI / 180;

export const radiansToDegrees = radians => 180 * radians / Math.PI;


/**
 * Try to get a neighbor arc, otherwise, returns null.
 *
 * @param {Number}   i
 * @param {function} identity
 * @param {Array}    prevData
 * @param {Array}    newData
 * @returns {{startAngle: *, endAngle: *}}
 */
export const findNeighbor = (i, identity, prevData, newData) => {
    console.log(`———> findNeighbor() for "${identity(newData[i])}" at ${i}`);
    const preceding = findPreceding(i, identity, prevData, newData);
    if (preceding) {
        return {
            startAngle: preceding.endAngle,
            endAngle:   preceding.endAngle
        };
    }

    const following = findFollowing(i, identity, prevData, newData);
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
 * @param {Number}   i
 * @param {function} identity
 * @param {Array}    prevData
 * @param {Array}    newData
 * @returns {*}
 */
export const findPreceding = (i, identity, prevData, newData) => {
    console.log(`———> findPreceding() for "${identity(newData[i])}" at ${i}`);
    const prevDataLength = prevData.length;

    while (--i >= 0) {
        let k = identity(newData[i]);
        console.log(`- preceding search in prevData for "${k}"`);

        for (let j = 0; j < prevDataLength; ++j) {
            if (identity(prevData[j]) === k) {
                console.info(`found preceding neighbor "${k}"`);
                return prevData[j];
            }
        }
    }
};

/**
 * Find the element in prevData that joins the lowest following element in newData.
 *
 * @param {Number}   i
 * @param {function} identity
 * @param {Array}    prevData
 * @param {Array}    newData
 * @returns {*}
 */
export const findFollowing = (i, identity, prevData, newData) => {
    console.log(`———> findFollowing() for "${identity(newData[i])}" at ${i}`);
    const newDataLength  = newData.length;
    const prevDataLength = prevData.length;

    while (++i < newDataLength) {
        let k = identity(newData[i]);

        console.log(`- following search in prevData for "${k}"`);

        for (let j = 0; j < prevDataLength; ++j) {
            if (identity(prevData[j]) === k) {
                console.info(`found following neighbor "${k}"`);
                return prevData[j];
            }
        }
    }
};


export const midAngle = arc => arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
