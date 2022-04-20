import { useMotionConfig } from '@nivo/core'
import { useTransition } from '@react-spring/web'
import { useMemo } from 'react'
import { DatumWithRect, DatumWithRectAndColor } from './types'

export interface TransitionExtra<TDatum extends DatumWithRect, ExtraProps> {
    enter: (datum: TDatum) => ExtraProps
    leave: (datum: TDatum) => ExtraProps
    update: (datum: TDatum) => ExtraProps
}
const useRectExtraTransition = <TDatum extends DatumWithRectAndColor, ExtraProps>(
    extraTransition?: TransitionExtra<TDatum, ExtraProps>
) =>
    useMemo(
        () => ({
            enter: (datum: TDatum) => ({
                progress: 0,
                ...(extraTransition?.enter(datum) ?? {}),
            }),
            update: (datum: TDatum) => ({
                progress: 1,
                ...(extraTransition?.update(datum) ?? {}),
            }),
            leave: (datum: TDatum) => ({
                progress: 0,
                ...(extraTransition?.leave(datum) ?? {}),
            }),
        }),
        [extraTransition]
    )

export const useRectsTransition = <TDatum extends DatumWithRectAndColor, ExtraProps = unknown>(
    data: TDatum[],
    extra?: TransitionExtra<TDatum, ExtraProps>
) => {
    const { animate, config: springConfig } = useMotionConfig()

    const phases = useRectExtraTransition<TDatum, ExtraProps>(extra)

    const transition = useTransition<TDatum, { progress: number } & ExtraProps>(data, {
        keys: datum => datum.id,
        initial: phases.update,
        from: phases.enter,
        enter: phases.update,
        leave: phases.leave,
        config: springConfig,
        immediate: !animate,
    })

    return { transition }
}
