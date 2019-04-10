/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { spring } from 'react-motion'
import { rgb } from 'd3-color'

/**
 * Decompose a color to be used with react-motion.
 */
export const interpolateColor = (color, springConfig) => {
    const colorComponents = rgb(color)

    if (!springConfig) {
        return {
            colorR: colorComponents.r,
            colorG: colorComponents.g,
            colorB: colorComponents.b,
        }
    }

    const configWithPrecision = {
        ...springConfig,
        precision: 1,
    }

    return {
        colorR: spring(colorComponents.r, configWithPrecision),
        colorG: spring(colorComponents.g, configWithPrecision),
        colorB: spring(colorComponents.b, configWithPrecision),
    }
}

/**
 * Re-assemble interpolated color components,
 * should be used to assign a color after react-motion interpolation.
 */
export const getInterpolatedColor = ({ colorR, colorG, colorB }) =>
    `rgb(${Math.round(Math.max(colorR, 0))},${Math.round(Math.max(colorG, 0))},${Math.round(
        Math.max(colorB, 0)
    )})`
