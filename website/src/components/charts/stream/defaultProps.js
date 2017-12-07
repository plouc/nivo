/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { patternDotsDef, patternSquaresDef } from '@nivo/core'

export default {
    margin: {
        top: 50,
        right: 110,
        bottom: 50,
        left: 60,
    },

    // axes
    'enable axisTop': false,
    axisTop: {
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    'enable axisRight': false,
    axisRight: {
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    'enable axisBottom': true,
    axisBottom: {
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    'enable axisLeft': false,
    axisLeft: {
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: -40,
    },
    enableGridX: true,
    enableGridY: false,

    curve: 'catmullRom',
    offsetType: 'none',
    order: 'none',

    colors: 'nivo',
    fillOpacity: 0.85,
    borderWidth: 0,
    borderColor: {
        type: 'custom',
        color: '#000',
    },

    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#2c998f',
            size: 4,
            padding: 2,
            stagger: true,
        }),
        patternSquaresDef('squares', {
            background: 'inherit',
            color: '#e4c912',
            size: 6,
            padding: 2,
            stagger: true,
        }),
    ],
    fill: [{ match: { id: 'Paul' }, id: 'dots' }, { match: { id: 'Marcel' }, id: 'squares' }],

    // motion
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    // interactivity
    isInteractive: true,
    enableStackTooltip: true,
}
