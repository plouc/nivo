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
    },
    {
        key: 'cost',
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    {
        key: 'color',
        type: 'point',
        padding: 1,
        values: ['red', 'yellow', 'green'],
    },
    {
        key: 'target',
        type: 'point',
        padding: 0,
        values: ['A', 'B', 'C', 'D', 'E'],
    },
    {
        key: 'volume',
        type: 'linear',
        min: 0,
        max: 'auto',
    },
]
