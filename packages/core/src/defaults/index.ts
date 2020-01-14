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
import { nivoCategoricalColors } from '../lib/colors'

// motion
export const defaultAnimate = true
export const defaultMotionStiffness = 90
export const defaultMotionDamping = 15

// colors
export const defaultCategoricalColors = nivoCategoricalColors
export const defaultColorRange = scaleOrdinal(schemeSet3)

// margin
export const defaultMargin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
}
