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
        top: 30,
        right: 110,
        bottom: 60,
        left: 70,
    },

    stacked: false,
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
    enableDots: true,
    dotsEveryNth: 1,
    dotSize: 8,
    dotColor: { type: 'custom', color: '#ffffff' },
    dotBorderWidth: 2,
    dotBorderColor: { type: 'inherit' },
    enableDotLabel: false,
    dotLabel: 'y',
    dotLabelFormat: '.1f',
    dotLabelColor: { type: 'custom', color: '#000000' },
    dotLabelYOffset: -12,

    // area
    enableArea: false,
    areaOpacity: 0.05,

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
