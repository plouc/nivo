import { memo } from 'react'
import {
    usePropertyAccessor,
    DotsItem,
    PropertyAccessor,
    DotsItemSymbolComponent,
} from '@nivo/core'
import { LineDatum, PointDatum } from './types'

interface PointsProps<Datum extends LineDatum> {
    points: readonly PointDatum<Datum>[]
    symbol?: DotsItemSymbolComponent
    size: number
    borderWidth: number
    enableLabel: boolean
    label: PropertyAccessor<Datum, string>
    labelYOffset?: number
}

const NonMemoizedPoints = <Datum extends LineDatum>({
    points,
    symbol,
    size,
    borderWidth,
    enableLabel,
    label,
    labelYOffset,
}: PointsProps<Datum>) => {
    const getLabel = usePropertyAccessor<Datum, string>(label)

    /**
     * We reverse the `points` array so that points from the lower lines in stacked lines
     * graph are drawn on top. See https://github.com/plouc/nivo/issues/1051.
     */
    const mappedPoints = points
        .slice(0)
        .reverse()
        .map(point => {
            const mappedPoint = {
                id: point.id,
                x: point.x,
                y: point.y,
                datum: point.data,
                fill: point.color,
                stroke: point.borderColor,
                label: enableLabel ? getLabel(point.data) : null,
            }

            return mappedPoint
        })

    return (
        <g>
            {mappedPoints.map(point => (
                <DotsItem
                    key={point.id}
                    x={point.x}
                    y={point.y}
                    datum={point.datum}
                    symbol={symbol}
                    size={size}
                    color={point.fill}
                    borderWidth={borderWidth}
                    borderColor={point.stroke}
                    label={point.label}
                    labelYOffset={labelYOffset}
                />
            ))}
        </g>
    )
}

export const Points = memo(NonMemoizedPoints) as typeof NonMemoizedPoints
