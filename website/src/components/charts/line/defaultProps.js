/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default {
    width: 600,
    height: 400,

    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },

    minY: 'auto',
    maxY: 'auto',

    stacked: true,
    curve: 'linear',

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
        legend: 'country code',
        legendOffset: 36,
        legendPosition: 'center',
    },
    'enable axisLeft': true,
    axisLeft: {
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
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
}
