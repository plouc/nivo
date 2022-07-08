import { useMotionConfig } from '@nivo/core'
import { SpringValue, to, useTransition } from '@react-spring/web'
import { useMemo } from 'react'
import { DatumWithRect, DatumWithRectAndColor } from './types'

export interface TransitionExtra<TDatum extends DatumWithRect, ExtraProps> {
    enter: (datum: TDatum) => ExtraProps
    leave: (datum: TDatum) => ExtraProps
    update: (datum: TDatum) => ExtraProps
}

// TODO: mode ?
export const useRectExtraTransition = <TDatum extends DatumWithRect, ExtraProps>(
    extraTransition?: TransitionExtra<TDatum, ExtraProps>
) =>
    useMemo(
        () => ({
            enter: (datum: TDatum) => ({
                progress: 0,
                ...datum.rect,
                ...(extraTransition?.enter(datum) ?? {}),
            }),
            update: (datum: TDatum) => ({
                progress: 1,
                ...datum.rect,
                ...(extraTransition?.update(datum) ?? {}),
            }),
            leave: (datum: TDatum) => ({
                progress: 0,
                ...datum.rect,
                ...(extraTransition?.leave(datum) ?? {}),
            }),
        }),
        [extraTransition]
    )

export const interpolateRect = (
    transformXValue: SpringValue<number>,
    transformYValue: SpringValue<number>
) => to([transformXValue, transformYValue], (x, y) => `translate(${x}, ${y})`)

/**
 * This hook can be used to animate a group of rects.
 *
 * @todo `useAnimatedRect` for single rect animation
 */
export const useRectsTransition = <TDatum extends DatumWithRectAndColor, ExtraProps = unknown>(
    data: TDatum[],
    extra?: TransitionExtra<TDatum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectExtraTransition<TDatum, ExtraProps>(extra)

    const transition = useTransition<
        TDatum,
        {
            height: number
            progress: number
            transformX: number
            transformY: number
            width: number
            x0: number
            x1: number
            y0: number
            y1: number
        } & ExtraProps
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
        interpolate: interpolateRect,
    }
}
