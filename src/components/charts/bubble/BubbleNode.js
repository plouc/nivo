/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes } from 'react';


const BubbleNode = ({ r, x, y, colorR, colorG, colorB }) => (
    <circle
        r={Math.max(r, 0)}
        transform={`translate(${x},${y})`}
        style={{ fill: `rgb(${Math.round(colorR)},${Math.round(colorG)},${Math.round(colorB)})` }}
    />
);

const { number } = PropTypes;

BubbleNode.propTypes = {
    r:      number.isRequired,
    x:      number.isRequired,
    y:      number.isRequired,
    colorR: number.isRequired,
    colorG: number.isRequired,
    colorB: number.isRequired
};


export default BubbleNode;
