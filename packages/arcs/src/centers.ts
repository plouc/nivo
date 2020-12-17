import { useMemo } from 'react'
import { useTransition, to, SpringValue } from 'react-spring'
import {
    // @ts-ignore
    midAngle,
    positionFromAngle,
    useMotionConfig,
} from '@nivo/core'
import { Arc, DatumWithArc, Point } from './types'
import { filterDataBySkipAngle } from './utils'
import { ArcTransitionMode, TransitionExtra, useArcTransitionMode } from './arcTransitionMode'

export const computeArcCenter = (arc: Arc, offset: number): Point => {
    const angle = midAngle(arc) - Math.PI / 2
    const radius = arc.innerRadius + (arc.outerRadius - arc.innerRadius) * offset

    return positionFromAngle(angle, radius)
}

export const interpolateArcCenter = (offset: number) => (
    startAngleValue: SpringValue<number>,
    endAngleValue: SpringValue<number>,
    innerRadiusValue: SpringValue<number>,
    outerRadiusValue: SpringValue<number>
) =>
    to(
        [startAngleValue, endAngleValue, innerRadiusValue, outerRadiusValue],
        (startAngle, endAngle, innerRadius, outerRadius) => {
            const centroid = computeArcCenter(
                { startAngle, endAngle, innerRadius, outerRadius },
                offset
            )

            return `translate(${centroid.x},${centroid.y})`
        }
    )

export const useArcCentersTransition = <Datum extends DatumWithArc, ExtraProps = unknown>(
    data: Datum[],
    // define where the centers should be placed,
    // 0.0: inner radius
    // 0.5: center
    // 1.0: outer radius
    offset = 0.5,
    mode: ArcTransitionMode = 'innerRadius',
    extra?: TransitionExtra<Datum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useArcTransitionMode<Datum, ExtraProps>(mode, extra)

    const transition = useTransition<
        Datum,
        {
            progress: number
            startAngle: number
            endAngle: number
            innerRadius: number
            outerRadius: number
        } & ExtraProps
    >(data, {
        key: datum => datum.id,
        initial: phases.update,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    })

    return {
        transition,
        interpolate: interpolateArcCenter(offset),
    }
}

export interface ArcCenter<Datum extends DatumWithArc> extends Point {
    data: Datum
}

/**
 * Compute an array of arc centers from an array of data containing arcs.
 *
 * If you plan to animate those, you could use `useArcCentersTransition`
 * instead, you could use the returned array with react-spring `useTransition`,
 * but this would lead to cartesian transitions (x/y), while `useArcCentersTransition`
 * will generate proper transitions using radius/angle.
 */
export const useArcCenters = <
    Datum extends DatumWithArc,
    ExtraProps extends Record<string, any> = Record<string, any>
>({
    data,
    offset = 0.5,
    skipAngle = 0,
    computeExtraProps = () => ({} as ExtraProps),
}: {
    data: Datum[]
    // define where the centers should be placed,
    // 0.0: inner radius
    // 0.5: center
    // 1.0: outer radius
    offset?: number
    // arcs with a length below this (end angle - start angle in degrees)
    // are going to be excluded, this can typically be used to avoid having
    // overlapping labels.
    skipAngle?: number
    // this can be used to append extra properties to the centers,
    // can be used to compute a color/label for example.
    computeExtraProps?: (datum: Datum) => ExtraProps
}): (ArcCenter<Datum> & ExtraProps)[] =>
    useMemo(
        () =>
            filterDataBySkipAngle<Datum>(data, skipAngle)
                // compute position and extra props for each eligible datum
                .map(datum => {
                    const position = computeArcCenter(datum.arc, offset)

                    return {
                        ...computeExtraProps(datum),
                        x: position.x,
                        y: position.y,
                        data: datum,
                    }
                }),
        [data, offset, skipAngle, computeExtraProps]
    )
