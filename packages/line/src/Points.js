import { memo } from 'react'
import { getLabelGenerator, DotsItem, useTheme } from '@nivo/core'

const Points = ({ points, symbol, size, borderWidth, enableLabel, label, labelYOffset }) => {
    const theme = useTheme()
    const getLabel = getLabelGenerator(label)

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
                    theme={theme}
                />
            ))}
        </g>
    )
}

export default memo(Points)
