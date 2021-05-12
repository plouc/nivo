import React from 'react'
import { LegendSvgItem } from './LegendSvgItem'
import { LegendSvgProps } from '../types'
import { computeDimensions } from '../compute'

export const LegendSvg = ({
    data,

    x,
    y,
    direction,
    padding: _padding = 0,
    justify,
    effects,

    itemWidth,
    itemHeight,
    itemDirection = 'left-to-right',
    itemsSpacing = 0,
    itemTextColor,
    itemBackground = 'transparent',
    itemOpacity = 1,

    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,

    onClick,
    onMouseEnter,
    onMouseLeave,
}: LegendSvgProps) => {
    const { padding } = computeDimensions({
        itemCount: data.length,
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding: _padding,
    })

    const xStep = direction === 'row' ? itemWidth + itemsSpacing : 0
    const yStep = direction === 'column' ? itemHeight + itemsSpacing : 0

    return (
        <g transform={`translate(${x},${y})`}>
            {data.map((data, i) => (
                <LegendSvgItem
                    key={i}
                    data={data}
                    x={i * xStep + padding.left}
                    y={i * yStep + padding.top}
                    width={itemWidth}
                    height={itemHeight}
                    direction={itemDirection}
                    justify={justify}
                    effects={effects}
                    textColor={itemTextColor}
                    background={itemBackground}
                    opacity={itemOpacity}
                    symbolShape={symbolShape}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    symbolBorderWidth={symbolBorderWidth}
                    symbolBorderColor={symbolBorderColor}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            ))}
        </g>
    )
}
