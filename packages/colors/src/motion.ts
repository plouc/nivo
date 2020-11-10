import { spring, SpringHelperConfig } from 'react-motion'
import { rgb } from 'd3-color'

/**
 * Decompose a color to be used with react-motion.
 *
 * @deprecated we should use `react-spring` which supports color interpolation natively.
 */
export const interpolateColor = (color: string, springConfig?: SpringHelperConfig) => {
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
 *
 * @deprecated we should use `react-spring` which supports color interpolation natively.
 */
export const getInterpolatedColor = ({
    colorR,
    colorG,
    colorB,
}: {
    colorR: number
    colorG: number
    colorB: number
}) =>
    `rgb(${Math.round(Math.max(colorR, 0))},${Math.round(Math.max(colorG, 0))},${Math.round(
        Math.max(colorB, 0)
    )})`
