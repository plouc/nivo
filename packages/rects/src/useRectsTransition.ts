import { useMotionConfig } from '@nivo/core'
import { SpringValue, to, TransitionFn, useTransition } from '@react-spring/web'
import {
    RectTransitionMode,
    TransitionExtra,
    useRectTransitionMode,
    RectTransitionProps,
} from './rectTransitionMode'
import { DatumWithRect } from './types'

export const interpolateRect = (
    transformXValue: SpringValue<number>,
    transformYValue: SpringValue<number>
) => to([transformXValue, transformYValue], (x, y) => `translate(${x}, ${y})`)

/**
 * This hook can be used to animate a group of rectangles.
 * if you want to animate a single rectangle,
 * please have a look at the `useAnimatedRect` hook.
 */
export const useRectsTransition = <
    Datum extends DatumWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    data: Datum[],
    getUid: (datum: Datum) => string,
    mode: RectTransitionMode = 'flow-down',
    extra?: TransitionExtra<Datum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectTransitionMode<Datum, ExtraProps>(mode, extra)

    const transition = useTransition<Datum, RectTransitionProps<ExtraProps>>(data, {
        keys: getUid,
        initial: phases.enter,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Datum, RectTransitionProps<ExtraProps>>

    return {
        transition,
        interpolate: interpolateRect,
    }
}
