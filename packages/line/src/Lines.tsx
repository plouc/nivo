import { memo } from 'react'
import { LineDatum, LineGenerator } from './types'
import { LinesItem } from './LinesItem'

const NonMemoizedLines = <Datum extends LineDatum>({
    lines,
    lineGenerator,
    lineWidth,
}: {
    lines: any[]
    lineGenerator: LineGenerator<Datum>
    lineWidth: number
}) => (
    <>
        {lines
            .slice(0)
            .reverse()
            .map(({ id, data, color }) => (
                <LinesItem<Datum>
                    key={id}
                    points={data.map(d => d.position)}
                    lineGenerator={lineGenerator}
                    color={color}
                    thickness={lineWidth}
                />
            ))}
    </>
)

export const Lines = memo(NonMemoizedLines) as typeof NonMemoizedLines
