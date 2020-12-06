import { to, SpringValue, useSpring, useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { Arc, ArcGenerator, DatumWithArc } from './types'

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
                innerRadius,
                outerRadius,
            })
        }
    )

/**
 * This hook can be used to animate a single arc,
 * if you want to animate a group of arcs,
 * please have a look at the `useArcsTransition` hook.
 */
export const useAnimatedArc = (datumWithArc: { arc: Arc }, arcGenerator: ArcGenerator) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedValues = useSpring({
        startAngle: datumWithArc.arc.startAngle,
        endAngle: datumWithArc.arc.endAngle,
        innerRadius: datumWithArc.arc.innerRadius,
        outerRadius: datumWithArc.arc.outerRadius,
        config: springConfig,
        immediate: !animate,
    })

    return {
        ...animatedValues,
        path: interpolateArc(
            animatedValues.startAngle,
            animatedValues.endAngle,
            animatedValues.innerRadius,
            animatedValues.outerRadius,
            arcGenerator
        ),
    }
}

/**
 * This hook can be used to animate a group of arcs,
 * if you want to animate a single arc,
 * please have a look at the `useAnimatedArc` hook.
 */
export const useArcsTransition = <Datum extends DatumWithArc>(data: Datum[]) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        Datum,
        {
            startAngle: number
            endAngle: number
            innerRadius: number
            outerRadius: number
        }
    >(data, {
        key: datum => datum.id,
        initial: datum => ({
            startAngle: datum.arc.startAngle,
            endAngle: datum.arc.endAngle,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        from: datum => ({
            startAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            endAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        enter: datum => ({
            startAngle: datum.arc.startAngle,
            endAngle: datum.arc.endAngle,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        update: datum => ({
            startAngle: datum.arc.startAngle,
            endAngle: datum.arc.endAngle,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        leave: datum => ({
            startAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            endAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return {
        transition,
        interpolate: interpolateArc,
    }
}
