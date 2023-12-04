import { ComputedSeries, LineGenerator, LineSeries } from './types'
import { LinesItem } from './LinesItem'

interface LinesProps<Series extends LineSeries> {
    lines: readonly ComputedSeries<Series>[]
    lineGenerator: LineGenerator
    lineWidth: number
}

export const Lines = <Series extends LineSeries>({
    lines,
    lineGenerator,
    lineWidth,
}: LinesProps<Series>) => {
    return (
        <>
            {lines
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
