import { scaleOrdinal } from 'd3-scale'
import { schemeSet3 } from 'd3-scale-chromatic'
import { nivoCategoricalColors } from '../lib/colors'

// motion
export const defaultAnimate = true

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

// overflow
export const defaultOverflow = false
