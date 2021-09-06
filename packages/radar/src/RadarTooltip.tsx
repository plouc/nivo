import { arc as d3Arc } from 'd3-shape'
import { RadarTooltipItem } from './RadarTooltipItem'
import { RadarColorMapping, RadarDataProps } from './types'

interface RadarTooltipProps<D extends Record<string, unknown>> {
    data: RadarDataProps<D>['data']
    keys: RadarDataProps<D>['keys']
    getIndex: (d: D) => string | number
    formatValue: (value: number, context: string) => string
    colorByKey: RadarColorMapping
    radius: number
    angleStep: number
}

export const RadarTooltip = <D extends Record<string, unknown>>({
    data,
    keys,
    getIndex,
    formatValue,
    colorByKey,
    radius,
    angleStep,
}: RadarTooltipProps<D>) => {
    const arc = d3Arc<{ startAngle: number; endAngle: number }>().outerRadius(radius).innerRadius(0)

    const halfAngleStep = angleStep * 0.5
    let rootStartAngle = -halfAngleStep

    return (
        <g>
            {data.map(d => {
                const index = getIndex(d)
                const startAngle = rootStartAngle
                const endAngle = startAngle + angleStep

                rootStartAngle += angleStep

                return (
                    <RadarTooltipItem
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
                    />
                )
            })}
        </g>
    )
}
