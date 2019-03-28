/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default [
    {
        key: 'temp',
        type: 'linear',
        min: 'auto',
        max: 'auto',
        ticksPosition: 'before',
        legend: 'temperature',
        legendPosition: 'start',
        legendOffset: 20,
    },
    {
        key: 'cost',
        type: 'linear',
        min: 0,
        max: 'auto',
        ticksPosition: 'before',
        legend: 'cost',
        legendPosition: 'start',
        legendOffset: 20,
    },
    {
        key: 'color',
        type: 'point',
        padding: 1,
        values: ['red', 'yellow', 'green'],
        legend: 'color',
        legendPosition: 'start',
        legendOffset: -20,
    },
    {
        key: 'target',
        type: 'point',
        padding: 0,
        values: ['A', 'B', 'C', 'D', 'E'],
        legend: 'target',
        legendPosition: 'start',
        legendOffset: -20,
    },
    {
        key: 'volume',
        type: 'linear',
        min: 0,
        max: 'auto',
        legend: 'volume',
        legendPosition: 'start',
        legendOffset: -20,
    },
]
