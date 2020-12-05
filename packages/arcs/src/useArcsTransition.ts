import { useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { DatumWithArc } from './types'
import { interpolateArc } from './arcInterpolator'

export const useArcsTransition = <Datum extends DatumWithArc>(data: Datum[]) => {
    console.log(data)
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        Datum,
        {
            startAngle: number
            endAngle: number
            innerRadius: number
            outerRadius: number
        }
    >(data, {
        key: datum => datum.id,
        initial: datum => ({
            startAngle: datum.arc.startAngle,
            endAngle: datum.arc.endAngle,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        from: datum => ({
            startAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            endAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        enter: datum => ({
            startAngle: datum.arc.startAngle,
            endAngle: datum.arc.endAngle,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        update: datum => ({
            startAngle: datum.arc.startAngle,
            endAngle: datum.arc.endAngle,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        leave: datum => ({
            startAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            endAngle: datum.arc.startAngle + (datum.arc.endAngle - datum.arc.startAngle) / 2,
            innerRadius: datum.arc.innerRadius,
            outerRadius: datum.arc.outerRadius,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return {
        transition,
        interpolate: interpolateArc,
    }
}
