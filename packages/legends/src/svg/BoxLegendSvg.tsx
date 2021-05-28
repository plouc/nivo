import React from 'react'
import { LegendSvg } from './LegendSvg'
import { BoxLegendSvgProps } from '../types'
import { computeDimensions, computePositionFromAnchor } from '../compute'

export const BoxLegendSvg = ({
    data,

    containerWidth,
    containerHeight,
    translateX = 0,
    translateY = 0,
    anchor,
    direction,
    padding = 0,
    justify,

    itemsSpacing = 0,
    itemWidth,
    itemHeight,
    itemDirection,
    itemTextColor,
    itemBackground,
    itemOpacity,

    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,

    onClick,
    onMouseEnter,
    onMouseLeave,
    toggleSerie,

    effects,
}: BoxLegendSvgProps) => {
    const { width, height } = computeDimensions({
        itemCount: data.length,
        itemsSpacing,
        itemWidth,
        itemHeight,
        direction,
        padding,
    })

    const { x, y } = computePositionFromAnchor({
        anchor,
        translateX,
        translateY,
        containerWidth,
        containerHeight,
        width,
        height,
    })

    return (
        <LegendSvg
            data={data}
            x={x}
            y={y}
            direction={direction}
            padding={padding}
            justify={justify}
            effects={effects}
            itemsSpacing={itemsSpacing}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            itemDirection={itemDirection}
            itemTextColor={itemTextColor}
            itemBackground={itemBackground}
            itemOpacity={itemOpacity}
            symbolShape={symbolShape}
            symbolSize={symbolSize}
            symbolSpacing={symbolSpacing}
            symbolBorderWidth={symbolBorderWidth}
            symbolBorderColor={symbolBorderColor}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            toggleSerie={toggleSerie}
        />
    )
}
