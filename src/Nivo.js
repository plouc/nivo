/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleOrdinal } from 'd3-scale'
import { schemeSet3 } from 'd3-scale-chromatic'
import { nivoCategoricalColors } from './lib/colorUtils'

const defaults = {
    transitionDuration: 600,
    transitionEasing: 'cubic-out',
    motionStiffness: 120,
    motionDamping: 10,
    colorRange: scaleOrdinal(schemeSet3),
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
}

export const defaultTheme = {
    axis: {
        textColor: '#000',
        fontSize: '11px',
        tickColor: '#000',
        legendColor: '#000',
        legendFontSize: '11px',
    },
    grid: {
        stroke: '#ddd',
        strokeWidth: 1,
        strokeDasharray: '',
    },
    markers: {
        textColor: '#000',
        fontSize: '11px',
    },
}

export default {
    defaults,
    colors: {
        nivoCategoricalColors,
    },
}
