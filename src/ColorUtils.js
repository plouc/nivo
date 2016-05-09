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
import _  from 'lodash';


export const getColorGenerator = instruction => {
    if (instruction === 'none') {
        return 'none';
    }

    if (instruction === 'inherit') {
        return d => (d.color || d.data.color);
    }

    const inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/);
    if (inheritMatches) {
        const method = inheritMatches[1];
        const amount = inheritMatches[2];

        return d => d3.rgb(d.color || d.data.color)[method](parseFloat(amount));
    }

    return instruction;
};


export const getColorStyleObject = (instruction, property) => {
    const style = {};

    const color = getColorGenerator(instruction);
    if (color !== 'none') {
        style[property] = color;
    }

    return style;
};


const d3CategoricalColors = {
    d310:  d3.scale.category10(),
    d320:  d3.scale.category20(),
    d320b: d3.scale.category20b(),
    d320c: d3.scale.category20c()
};

export const nivoCategoricalColors = () => d3.scale.ordinal().range([
    '#e8c1a0',
    '#f47560',
    '#f1e15b',
    '#e8a838',
    '#61cdbb',
    '#97e3d5'
]);

const dataColor = d => (d.color || d.data.color);

export const getColorRange = instruction => {
    if (instruction === 'data') {
        return dataColor;
    }

    if (instruction === 'nivo') {
        return nivoCategoricalColors();
    }

    if (_.isFunction(instruction)) {
        return instruction;
    }

    if (d3CategoricalColors[instruction]) {
        return d3CategoricalColors[instruction];
    }

    if (_.isArray(instruction)) {
        return d3.scale.ordinal().range(instruction);
    }

    throw new Error('Unable to determine color range');
};