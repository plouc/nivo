import { memo } from 'react'
import { getLabelGenerator, DotsItem, useTheme } from '@nivo/core'
import { LinePointDatum, LineDatum } from './types'

const NonMemoizedPoints = <Datum extends LineDatum>({
    points,
    symbol,
    size,
    borderWidth,
    enableLabel,
    label,
    labelYOffset,
}: {
    points: LinePointDatum<Datum>[]
    symbol: any
    size: number
    borderWidth: number
    enableLabel: boolean
    label: any
    labelYOffset: number
}) => {
    const theme = useTheme()
    const getLabel = getLabelGenerator(label)

    /**
     * We reverse the `points` array so that points from the lower lines in stacked lines
     * graph are drawn on top. See https://github.com/plouc/nivo/issues/1051.
     */
    const mappedPoints = points.reverse().map(point => {
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
                    theme={theme}
                />
            ))}
        </g>
    )
}

/*
Points.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
    symbol: PropTypes.func,
    size: PropTypes.number.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelYOffset: PropTypes.number,
}
*/

export const Points = memo(NonMemoizedPoints) as typeof NonMemoizedPoints
