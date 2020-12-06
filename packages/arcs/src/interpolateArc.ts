import { to, SpringValue } from 'react-spring'
import { ArcGenerator } from './types'

/**
 * Directly animating paths for arcs leads to sub-optimal results
 * as the interpolation is gonna be linear while we deal with polar coordinates,
 * this interpolator is gonna generate proper arc transitions.
 * It should be used with the `useAnimatedArc` or `useArcsTransition` hooks.
 */
export const interpolateArc = (
    startAngleValue: SpringValue<number>,
    endAngleValue: SpringValue<number>,
    innerRadiusValue: SpringValue<number>,
    outerRadiusValue: SpringValue<number>,
    arcGenerator: ArcGenerator
) =>
    to(
        [startAngleValue, endAngleValue, innerRadiusValue, outerRadiusValue],
        (startAngle, endAngle, innerRadius, outerRadius) => {
            return arcGenerator({
                startAngle,
                endAngle,
                innerRadius: Math.max(0, innerRadius),
                outerRadius: Math.max(0, outerRadius),
            })
        }
    )
