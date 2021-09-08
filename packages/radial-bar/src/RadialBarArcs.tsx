import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { ComputedBar, RadialBarArcGenerator, RadialBarCommonProps } from './types'
import { RadialBarArc } from './RadialBarArc'

interface RadialBarArcsProps {
    bars: ComputedBar[]
    arcGenerator: RadialBarArcGenerator
    isInteractive: RadialBarCommonProps['isInteractive']
    tooltip: RadialBarCommonProps['tooltip']
    onClick?: RadialBarCommonProps['onClick']
    onMouseEnter?: RadialBarCommonProps['onMouseEnter']
    onMouseMove?: RadialBarCommonProps['onMouseMove']
    onMouseLeave?: RadialBarCommonProps['onMouseLeave']
}

export const RadialBarArcs = ({
    bars,
    arcGenerator,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: RadialBarArcsProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        ComputedBar,
        {
            startAngle: number
            endAngle: number
            innerRadius: number
            outerRadius: number
            color: string
        }
    >(bars, {
        keys: bar => bar.id,
        initial: bar => ({
            startAngle: bar.startAngle,
            endAngle: bar.endAngle,
            innerRadius: bar.innerRadius,
            outerRadius: bar.outerRadius,
            color: bar.color,
        }),
        from: bar => ({
            startAngle: bar.startAngle,
            endAngle: bar.endAngle,
            innerRadius: bar.innerRadius,
            outerRadius: bar.outerRadius,
            color: bar.color,
        }),
        update: bar => ({
            startAngle: bar.startAngle,
            endAngle: bar.endAngle,
            innerRadius: bar.innerRadius,
            outerRadius: bar.outerRadius,
            color: bar.color,
        }),
        leave: bar => ({
            startAngle: bar.startAngle + (bar.endAngle - bar.startAngle) / 2,
            endAngle: bar.startAngle + (bar.endAngle - bar.startAngle) / 2,
            innerRadius: bar.innerRadius,
            outerRadius: bar.outerRadius,
            color: bar.color,
        }),
        expires: true,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((style, bar) => {
                return (
                    <RadialBarArc
                        key={bar.id}
                        bar={bar}
                        animated={style}
                        arcGenerator={arcGenerator}
                        isInteractive={isInteractive}
                        tooltip={tooltip}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                    />
                )
            })}
        </>
    )
}
