/*
 * This file is part of the nivo library.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import { scaleOrdinal }          from 'd3'
import { schemeSet3 }            from 'd3-scale-chromatic'
import { nivoCategoricalColors } from './ColorUtils'

const defaults = {
    transitionDuration: 600,
    transitionEasing:   'cubic-out',
    motionStiffness:    120,
    motionDamping:      10,
    colorRange:         scaleOrdinal(schemeSet3),
    margin:             {
        top:    0,
        right:  0,
        bottom: 0,
        left:   0,
    },
};


export default {
    defaults,
    colors: {
        nivoCategoricalColors
    }
};
