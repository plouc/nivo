/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default {
    width: 800,
    height: 800,

    margin: {
        top: 40,
        right: 80,
        bottom: 80,
        left: 80,
    },

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,

    // Styling
    colors: 'nivo',
    colorBy: 'id',

    // border
    borderWidth: 0,
    borderColor: { type: 'inherit:darker', gamma: 0.6 },

    // radial labels
    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: { type: 'custom', color: '#333333' },
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    radialLabelsLinkColor: { type: 'inherit' },

    // slice labels
    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsSkipAngle: 10,
    slicesLabelsTextColor: { type: 'custom', color: '#333333' },

    // motion
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    // isInteractive
    isInteractive: true,
}
