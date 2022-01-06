import { Fragment } from 'react'
import { useTheme } from '@nivo/core'
import { computeContinuousColorsLegend } from '../compute'
import { ContinuousColorsLegendProps } from '../types'
import { continuousColorsLegendDefaults } from '../defaults'

export const ContinuousColorsLegendSvg = ({
    id: _id,
    scale,
    ticks,
    length = continuousColorsLegendDefaults.length,
    thickness = continuousColorsLegendDefaults.thickness,
    direction = continuousColorsLegendDefaults.direction,
    tickPosition = continuousColorsLegendDefaults.tickPosition,
    tickSize = continuousColorsLegendDefaults.tickSize,
    tickSpacing = continuousColorsLegendDefaults.tickSpacing,
    tickOverlap = continuousColorsLegendDefaults.tickOverlap,
    tickFormat = continuousColorsLegendDefaults.tickFormat,
    title,
    titleAlign = continuousColorsLegendDefaults.titleAlign,
    titleOffset = continuousColorsLegendDefaults.titleOffset,
}: ContinuousColorsLegendProps) => {
    const id = `ContinuousColorsLegendSvgGradient.${_id}`

    const {
        title: computedTitle,
        ticks: computedTicks,
        colorStops,
    } = computeContinuousColorsLegend({
        id: 'whatever',
        scale,
        ticks,
        length,
        thickness,
        direction,
        tickPosition,
        tickSize,
        tickSpacing,
        tickOverlap,
        tickFormat,
        title,
        titleAlign,
        titleOffset,
    })

    let width = length
    let height = thickness
    let gradientX2 = 0
    let gradientY2 = 0
    if (direction === 'row') {
        gradientX2 = 1
    } else {
        width = thickness
        height = length
        gradientY2 = 1
    }

    const theme = useTheme()

    return (
        <g>
            <defs>
                <linearGradient id={id} x2={gradientX2} y2={gradientY2}>
                    {colorStops.map(colorStop => (
                        <stop {...colorStop} />
                    ))}
                </linearGradient>
            </defs>
            {computedTitle.text && (
                <text
                    transform={`translate(${computedTitle.x}, ${computedTitle.y}) rotate(${computedTitle.rotation})`}
                    textAnchor={computedTitle.horizontalAlign}
                    dominantBaseline={computedTitle.verticalAlign}
                    style={theme.legends.title.text}
                >
                    {computedTitle.text}
                </text>
            )}
            <rect width={width} height={height} fill={`url(#${id}`} />
            {computedTicks.map((tick, index) => (
                <Fragment key={index}>
                    <line
                        x1={tick.x1}
                        y1={tick.y1}
                        x2={tick.x2}
                        y2={tick.y2}
                        style={theme.legends.ticks.line}
                    />
                    <text
                        x={tick.textX}
                        y={tick.textY}
                        textAnchor={tick.textHorizontalAlign}
                        dominantBaseline={tick.textVerticalAlign}
                        style={theme.legends.ticks.text}
                    >
                        {tick.text}
                    </text>
                </Fragment>
            ))}
        </g>
    )
}
