/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default {
    margin: {
        top: 60,
        right: 110,
        bottom: 60,
        left: 70,
    },

    curve: 'linear',

    // axes
    'enable axisTop': false,
    axisTop: {
        format: d => `${d} km`,
        tickCount: 10,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'distance',
        legendOffset: -36,
        legendPosition: 'center',
    },
    'enable axisRight': false,
    axisRight: {
        format: d => `${d} $`,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'cost',
        legendOffset: 0,
    },
    'enable axisBottom': true,
    axisBottom: {
        format: d => `${d} km`,
        tickCount: 10,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'distance',
        legendOffset: 40,
        legendPosition: 'center',
    },
    'enable axisLeft': true,
    axisLeft: {
        format: d => `${d} $`,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'cost',
        legendOffset: -45,
        legendPosition: 'center',
    },

    // grid
    enableGridX: true,
    enableGridY: true,

    colors: 'nivo',
    colorBy: 'id',
    lineWidth: 2,

    // dots
    enableDots: false,
    dotSize: 10,
    dotColor: { type: 'inherit:darker', gamma: 0.3 },
    dotBorderWidth: 2,
    dotBorderColor: { type: 'custom', color: '#ffffff' },
    enableDotLabel: true,
    dotLabel: 'y',
    dotLabelYOffset: -12,

    // area
    enableArea: false,
    areaOpacity: 0.2,

    // motion
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    // interactivity
    isInteractive: true,
    enableStackTooltip: true,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 12,
            symbolShape: 'circle',
        },
    ],
}
