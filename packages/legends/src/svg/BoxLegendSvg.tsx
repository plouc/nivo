import { BoxLegendProps, SymbolShapeSvg } from '../types'
import { computeDimensions, computePositionFromAnchor, getLegendTitleDatum } from '../compute'
import { BoxLegendSvgItem } from './BoxLegendSvgItem'

export const BoxLegendSvg = ({
    containerWidth,
    containerHeight,
    translateX = 0,
    translateY = 0,
    anchor,

    data,
    title,
    direction,
    padding: _padding = 0,
    justify,

    itemsSpacing = 0,
    itemWidth,
    itemHeight,
    itemDirection,
    itemTextColor,
    itemBackground,
    itemOpacity,

    symbolShape = 'square',
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,

    onClick,
    onMouseEnter,
    onMouseLeave,
    toggleSerie: _toggleSerie,

    effects,
}: BoxLegendProps) => {
    const { width, height, padding } = computeDimensions({
        itemCount: data.length + Number(title !== undefined),
        itemsSpacing,
        itemWidth,
        itemHeight,
        direction,
        padding: _padding,
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

    const xStep = direction === 'row' ? itemWidth + itemsSpacing : 0
    const yStep = direction === 'column' ? itemHeight + itemsSpacing : 0

    const allData = title ? [getLegendTitleDatum(title)].concat(data) : data
    const toggleSerie = typeof _toggleSerie === 'boolean' ? undefined : _toggleSerie

    return (
        <g transform={`translate(${x},${y})`}>
            {allData.map((data, i) => (
                <BoxLegendSvgItem
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
                    symbolShape={symbolShape as SymbolShapeSvg}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    symbolBorderWidth={symbolBorderWidth}
                    symbolBorderColor={symbolBorderColor}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    toggleSerie={toggleSerie}
                />
            ))}
        </g>
    )
}
