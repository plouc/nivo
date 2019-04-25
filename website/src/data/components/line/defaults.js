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
        right: 110,
        bottom: 50,
        left: 60,
    },

    xScale: {
        type: 'point',
    },
    yScale: {
        type: 'linear',
        stacked: true,
        min: 'auto',
        max: 'auto',
    },

    curve: 'linear',

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
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
    },

    enableGridX: true,
    enableGridY: true,

    colors: { scheme: 'nivo' },
    lineWidth: 2,

    enablePoints: true,
    pointSize: 10,
    pointColor: { theme: 'background' },
    pointBorderWidth: 2,
    pointBorderColor: { from: 'serieColor' },
    enablePointLabel: true,
    pointLabel: 'y',
    pointLabelYOffset: -12,

    enableArea: false,
    areaBlendMode: 'normal',
    areaBaselineValue: 0,
    areaOpacity: 0.2,

    isInteractive: true,
    enableStackTooltip: false,
}
