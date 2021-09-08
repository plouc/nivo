import { useTransition, to } from '@react-spring/web'
import { Arc } from 'd3-shape'
import { useMotionConfig } from '@nivo/core'
import { ComputedDatum } from './types'
import { RadialBarArc } from './RadialBarArc'

interface RadialBarArcsProps {
    bars: ComputedDatum[]
    arcGenerator: Arc<unknown, ComputedDatum>
}

export const RadialBarArcs = ({ bars, arcGenerator }: RadialBarArcsProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        ComputedDatum,
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
            endAngle: bar.startAngle,
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
                    />
                )
            })}
        </>
    )
}
