import { arc as d3Arc } from 'd3-shape'
import { RadarSlice } from './RadarSlice'
import { RadarColorMapping, RadarCommonProps, RadarDataProps } from './types'

interface RadarSlicesProps<D extends Record<string, unknown>> {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    getIndex: (d: D) => string | number
    formatValue: (value: number, context: string) => string
    colorByKey: RadarColorMapping
    radius: number
    angleStep: number
    tooltip: RadarCommonProps<D>['sliceTooltip']
}

export const RadarSlices = <D extends Record<string, unknown>>({
    data,
    keys,
    getIndex,
    formatValue,
    colorByKey,
    radius,
    angleStep,
    tooltip,
}: RadarSlicesProps<D>) => {
    const arc = d3Arc<{ startAngle: number; endAngle: number }>().outerRadius(radius).innerRadius(0)

    const halfAngleStep = angleStep * 0.5
    let rootStartAngle = -halfAngleStep

    return (
        <>
            {data.map(d => {
                const index = getIndex(d)
                const startAngle = rootStartAngle
                const endAngle = startAngle + angleStep

                rootStartAngle += angleStep

                return (
                    <RadarSlice
                        key={index}
                        datum={d}
                        keys={keys}
                        index={index}
                        formatValue={formatValue}
                        colorByKey={colorByKey}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        radius={radius}
                        arcGenerator={arc}
                        tooltip={tooltip}
                    />
                )
            })}
        </>
    )
}
