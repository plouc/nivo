import { TransitionFn, useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { DatumWithArc } from './types'
import {
    ArcTransitionMode,
    useArcTransitionMode,
    TransitionExtra,
    ArcTransitionProps,
} from './arcTransitionMode'
import { interpolateArc } from './interpolateArc'

/**
 * This hook can be used to animate a group of arcs,
 * if you want to animate a single arc,
 * please have a look at the `useAnimatedArc` hook.
 */
export const useArcsTransition = <
    Datum extends DatumWithArc,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    data: Datum[],
    mode: ArcTransitionMode = 'innerRadius',
    extra?: TransitionExtra<Datum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useArcTransitionMode<Datum, ExtraProps>(mode, extra)

    const transition = useTransition<Datum, ArcTransitionProps<ExtraProps>>(data, {
        keys: datum => datum.id,
        initial: phases.update,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Datum, ArcTransitionProps<ExtraProps>>

    return {
        transition,
        interpolate: interpolateArc,
    }
}
