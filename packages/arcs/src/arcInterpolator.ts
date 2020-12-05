import { to, SpringValue } from 'react-spring'
import { ArcGenerator } from './types'

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
                innerRadius,
                outerRadius,
            })
        }
    )
