import { useTransition, to, SpringValue } from 'react-spring'
import {
    // @ts-ignore
    midAngle,
    // @ts-ignore
    positionFromAngle,
    useMotionConfig,
} from '@nivo/core'
import { Arc, DatumWithArc } from './types'
import { ArcTransitionMode, TransitionExtra, useArcTransitionMode } from './arcTransitionMode'

export const computeArcCenter = (arc: Arc, offset: number) => {
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
