import { memo } from 'react'
import { LineSeries, ComputedSeries, LineGenerator } from './types'
import { LinesItem } from './LinesItem'

export const NonMemoizedLines = <Series extends LineSeries>({
    series,
    lineGenerator,
    lineWidth,
}: {
    series: readonly ComputedSeries<Series>[]
    lineGenerator: LineGenerator
    lineWidth: number
}) => {
    return (
        <>
            {series
                .slice(0)
                .reverse()
                .map(({ id, data, color }) => (
                    <LinesItem
                        key={id}
                        points={data.map(d => d.position)}
                        lineGenerator={lineGenerator}
                        color={color}
                        thickness={lineWidth}
                    />
                ))}
        </>
    )
}

export const Lines = memo(NonMemoizedLines) as typeof NonMemoizedLines
