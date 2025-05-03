import { useMotionConfig } from '@nivo/core'
import { SpringValue, to, TransitionFn, useTransition } from '@react-spring/web'
import { DatumWithRect } from './types'
import {
    RectTransitionMode,
    useRectTransitionMode,
    RectTransitionProps,
    TransitionExtra,
} from './rectTransitionMode'

export const interpolateRectCenter =
    (offsetXRatio: number, offsetYRatio: number) =>
    (
        x: SpringValue<number>,
        width: SpringValue<number>,
        offsetX: SpringValue<number>,
        y: SpringValue<number>,
        height: SpringValue<number>,
        offsetY: SpringValue<number>
    ) =>
        to([x, width, offsetX, y, height, offsetY], (x, width, offsetX, y, height, offsetY) => {
            return `translate(${x + offsetX + width * offsetXRatio},${y + offsetY + height * offsetYRatio})`
        })

export const useRectCentersTransition = <
    Datum extends DatumWithRect,
    ExtraProps extends Record<string, any> = Record<string, never>,
>(
    data: Datum[],
    // define where the centers should be placed,
    // 0.0: left/top
    // 0.5: center
    // 1.0: right/bottom
    offsetX = 0.5,
    offsetY = 0.5,
    mode: RectTransitionMode = 'flow-down',
    extra?: TransitionExtra<Datum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectTransitionMode<Datum, ExtraProps>(mode, extra)

    const transition = useTransition<Datum, RectTransitionProps<ExtraProps>>(data, {
        keys: datum => datum.id,
        initial: phases.update,
        from: phases.enter,
        enter: phases.update,
        update: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    }) as unknown as TransitionFn<Datum, RectTransitionProps<ExtraProps>>

    return {
        transition,
        interpolate: interpolateRectCenter(offsetX, offsetY),
    }
}
