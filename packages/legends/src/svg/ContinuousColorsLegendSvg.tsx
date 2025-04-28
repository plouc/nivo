import { Fragment } from 'react'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
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

    // remove commas, parentheses and spaces from stop color, this will then create a unique id depending on which color scheme you use.
    // so if you have two or more heatmaps on a single page with differing color schemes the legend will be correct for each.
    const id = `ContinuousColorsLegendSvgGradient.${direction}.${colorStops
        .map(stop => `${stop.stopColor.replace(/[(),\s]/g, '')}.${stop.offset}`)
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
                        <stop
                            key={colorStop.key}
                            offset={colorStop.offset}
                            stopColor={colorStop.stopColor}
                        />
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
                    <Text
                        x={tick.textX}
                        y={tick.textY}
                        textAnchor={tick.textHorizontalAlign}
                        dominantBaseline={tick.textVerticalAlign}
                        style={theme.legends.ticks.text}
                    >
                        {tick.text}
                    </Text>
                </Fragment>
            ))}
        </g>
    )
}
