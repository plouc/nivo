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

interface TransitionModeConfig {
    enter: (arc: Arc) => Arc
    update: (arc: Arc) => Arc
    leave: (arc: Arc) => Arc
}

const transitionModeStartAngle = {
    enter: (arc: Arc) => ({
        ...arc,
        endAngle: arc.startAngle,
    }),
    update: (arc: Arc) => arc,
    leave: (arc: Arc) => ({
        ...arc,
        startAngle: arc.endAngle,
    }),
}

const transitionModeMiddleAngle = {
    enter: (arc: Arc) => {
        const middleAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2

        return {
            ...arc,
            startAngle: middleAngle,
            endAngle: middleAngle,
        }
    },
    update: (arc: Arc) => arc,
    leave: (arc: Arc) => {
        const middleAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2

        return {
            ...arc,
            startAngle: middleAngle,
            endAngle: middleAngle,
        }
    },
}

const transitionModeEndAngle = {
    enter: (arc: Arc) => ({
        ...arc,
        startAngle: arc.endAngle,
    }),
    update: (arc: Arc) => arc,
    leave: (arc: Arc) => ({
        ...arc,
        endAngle: arc.startAngle,
    }),
}

const transitionModeInnerRadius = {
    enter: (arc: Arc) => ({
        ...arc,
        outerRadius: arc.innerRadius,
    }),
    update: (arc: Arc) => arc,
    leave: (arc: Arc) => ({
        ...arc,
        innerRadius: arc.outerRadius,
    }),
}

const transitionModeCenterRadius = {
    enter: (arc: Arc) => {
        const centerRadius = arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2

        return {
            ...arc,
            innerRadius: centerRadius,
            outerRadius: centerRadius,
        }
    },
    update: (arc: Arc) => arc,
    leave: (arc: Arc) => {
        const centerRadius = arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2

        return {
            ...arc,
            innerRadius: centerRadius,
            outerRadius: centerRadius,
        }
    },
}

const transitionModeOuterRadius = {
    enter: (arc: Arc) => ({
        ...arc,
        innerRadius: arc.outerRadius,
    }),
    update: (arc: Arc) => arc,
    leave: (arc: Arc) => ({
        ...arc,
        outerRadius: arc.innerRadius,
    }),
}

export const transitionModes = [
    'startAngle',
    'middleAngle',
    'endAngle',
    'innerRadius',
    'centerRadius',
    'outerRadius',
] as const
export type TransitionMode = typeof transitionModes[number]

const transitionModeById: Record<TransitionMode, TransitionModeConfig> = {
    startAngle: transitionModeStartAngle,
    middleAngle: transitionModeMiddleAngle,
    endAngle: transitionModeEndAngle,
    innerRadius: transitionModeInnerRadius,
    centerRadius: transitionModeCenterRadius,
    outerRadius: transitionModeOuterRadius,
}

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
export const useArcsTransition = <Datum extends DatumWithArc>(
    data: Datum[],
    mode: TransitionMode = 'innerRadius'
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transitionMode = transitionModeById[mode]

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
        initial: datum => transitionMode.update(datum.arc),
        from: datum => transitionMode.enter(datum.arc),
        enter: datum => transitionMode.update(datum.arc),
        update: datum => transitionMode.update(datum.arc),
        leave: datum => transitionMode.leave(datum.arc),
        config: springConfig,
        immediate: !animate,
    })

    return {
        transition,
        interpolate: interpolateArc,
    }
}
