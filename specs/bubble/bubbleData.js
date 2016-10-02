/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

export default {
    name:     'nivo',
    children: [
        {
            name:     'charts',
            children: [
                { name: 'Pie',    loc: 1000 },
                { name: 'Stack',  loc: 1000 },
                { name: 'Tree',   loc: 6000 },
                { name: 'Bubble', loc: 1000 }
            ]
        },
        {
            name:     'utils',
            children: [
                { name: 'Colors',    loc: 1000 },
                { name: 'Arcs',      loc: 4000 },
                { name: 'Data',      loc: 1000 },
                { name: 'Animation', loc: 7000 }
            ]
        },
        {
            name:     'generator',
            children: [
                { name: 'tree',  loc: 3000 },
                { name: 'serie', loc: 2000 },
                { name: 'geo',   loc: 1000 }
            ]
        }
    ]
};