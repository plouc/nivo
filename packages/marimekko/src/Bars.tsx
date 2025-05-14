import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { BarDatum, MarimekkoCommonProps, MouseEventHandlers } from './types'
import { Bar } from './Bar'

interface BarsProps<Datum> extends MouseEventHandlers<Datum, SVGRectElement> {
    isInteractive: boolean
    bars: readonly BarDatum<Datum>[]
    tooltip: MarimekkoCommonProps<Datum>['tooltip']
}

export const Bars = <Datum,>({
    bars,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: BarsProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        BarDatum<Datum>,
        {
            x: number
            y: number
            width: number
            height: number
            color: string
            opacity: number
            borderColor: string
        }
    >(bars, {
        keys: bar => bar.key,
        initial: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 1,
            borderColor: bar.borderColor,
        }),
        from: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 0,
            borderColor: bar.borderColor,
        }),
        enter: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 1,
            borderColor: bar.borderColor,
        }),
        update: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 1,
            borderColor: bar.borderColor,
        }),
        leave: bar => ({
            opacity: 0,
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((style, bar) => (
                <Bar<Datum>
                    key={bar.key}
                    bar={bar}
                    animatedProps={style}
                    isInteractive={isInteractive}
                    tooltip={tooltip}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                />
            ))}
        </>
    )
}
