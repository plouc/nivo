import { Fragment } from 'react'
import { useTheme } from '@bitbloom/nivo-core'
import { computeContinuousColorsLegend } from '../compute'
import { ContinuousColorsLegendProps } from '../types'
import { continuousColorsLegendDefaults } from '../defaults'

export const ContinuousColorsLegendSvg = ({
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
    const {
        width,
        height,
        gradientX1,
        gradientY1,
        gradientX2,
        gradientY2,
        ticks: computedTicks,
        colorStops,
        titleText,
        titleX,
        titleY,
        titleRotation,
        titleVerticalAlign,
        titleHorizontalAlign,
    } = computeContinuousColorsLegend({
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

    const theme = useTheme()

    const id = `ContinuousColorsLegendSvgGradient.${direction}.${colorStops
        .map(stop => stop.offset)
        .join('_')}`

    return (
        <g>
            <defs>
                <linearGradient
                    id={id}
                    x1={gradientX1}
                    y1={gradientY1}
                    x2={gradientX2}
                    y2={gradientY2}
                >
                    {colorStops.map(colorStop => (
                        <stop {...colorStop} />
                    ))}
                </linearGradient>
            </defs>
            {titleText && (
                <text
                    transform={`translate(${titleX}, ${titleY}) rotate(${titleRotation})`}
                    textAnchor={titleHorizontalAlign}
                    dominantBaseline={titleVerticalAlign}
                    style={theme.legends.title.text}
                >
                    {titleText}
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
