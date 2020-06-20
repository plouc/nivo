/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { patternDotsDef, patternSquaresDef } from '@nivo/core'
import { StreamDefaultProps } from '@nivo/stream'

export default {
    margin: {
        top: 50,
        right: 110,
        bottom: 50,
        left: 60,
    },

    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
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
    offsetType: 'silhouette',
    order: 'none',

    colors: { scheme: 'nivo' },
    fillOpacity: 0.85,
    borderWidth: 0,
    borderColor: {
        theme: 'background',
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
    fill: [
        { match: { id: 'Paul' }, id: 'dots' },
        { match: { id: 'Marcel' }, id: 'squares' },
    ],

    enableDots: StreamDefaultProps.enableDots,
    dotSize: 8,
    dotColor: { from: 'color' },
    dotBorderWidth: 2,
    dotBorderColor: { from: 'color', modifiers: [['darker', 0.7]] },

    animate: StreamDefaultProps.animate,
    motionConfig: StreamDefaultProps.motionConfig,

    isInteractive: StreamDefaultProps.isInteractive,
    enableStackTooltip: true,
}
