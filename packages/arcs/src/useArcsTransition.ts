import { Interpolation, PickAnimated, SpringValue, TransitionFn, useTransition } from '@react-spring/web'
import { useMotionConfig } from '@bitbloom/nivo-core'
import { ArcGenerator, DatumWithArc } from './types'
import { ArcTransitionMode, useArcTransitionMode, TransitionExtra } from './arcTransitionMode'
import { interpolateArc } from './interpolateArc'

type Props<ExtraProps> = {
    progress: number
    startAngle: number
    endAngle: number
    innerRadius: number
    outerRadius: number
} & ExtraProps
/**
 * This hook can be used to animate a group of arcs,
 * if you want to animate a single arc,
 * please have a look at the `useAnimatedArc` hook.
 */
export function useArcsTransition<Datum extends DatumWithArc, ExtraProps = unknown>(
    data: Datum[],
    mode: ArcTransitionMode = 'innerRadius',
    extra?: TransitionExtra<Datum, ExtraProps>
): {
    transition: TransitionFn<Datum, PickAnimated<Props<ExtraProps>>>,
    interpolate: (startAngleValue: SpringValue<number>, endAngleValue: SpringValue<number>, innerRadiusValue: SpringValue<number>, outerRadiusValue: SpringValue<number>, arcGenerator: ArcGenerator) => Interpolation<string | null, any>
} {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useArcTransitionMode<Datum, ExtraProps>(mode, extra)


    const transition = useTransition<
        Datum,
        Props<ExtraProps>
    >(data, {
        keys: datum => datum.id,
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
        interpolate: interpolateArc,
    }
}
