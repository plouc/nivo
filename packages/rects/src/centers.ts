import { useMotionConfig } from '@nivo/core'
import { SpringValue, to, useTransition } from '@react-spring/web'
import { DatumWithRect } from './types'
import { TransitionExtra, useRectExtraTransition } from './useRectsTransition'

export const interpolateRectCenter =
    (offset: number, baseOffsetLeft: number, baseOffsetTop: number) =>
    (
        x0Value: SpringValue<number>,
        y0Value: SpringValue<number>,
        widthValue: SpringValue<number>,
        heightValue: SpringValue<number>
    ) =>
        to(
            [x0Value, y0Value, widthValue, heightValue],
            (x0, y0, width, height) =>
                `translate(${Math.abs(baseOffsetLeft - (x0 + width / 2))}, ${Math.abs(
                    baseOffsetTop - (y0 + height / 2) * offset
                )})`
        )

export const useRectCentersTransition = <TDatum extends DatumWithRect, TExtraProps = unknown>(
    data: TDatum[],
    offset = 1,
    baseOffsetLeft = 0,
    baseOffsetTop = 0,
    extra?: TransitionExtra<TDatum, TExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectExtraTransition<TDatum, TExtraProps>(extra)

    const transition = useTransition<
        TDatum,
        {
            height: number
            progress: number
            width: number
            x0: number
            y0: number
        } & TExtraProps
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
        interpolate: interpolateRectCenter(offset, baseOffsetLeft, baseOffsetTop),
    }
}
