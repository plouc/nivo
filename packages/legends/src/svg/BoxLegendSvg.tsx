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
    padding = 0,
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
    toggleSerie,

    effects,
}: BoxLegendProps) => {
    const allData = title ? [getLegendTitleDatum(title)].concat(data) : data

    const { width, height, itemCoordinates } = computeDimensions({
        itemsSpacing,
        itemWidth,
        itemHeight,
        direction,
        padding,
        data: allData,
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
        <g transform={`translate(${x},${y})`}>
            {allData.map((data, i) => (
                <BoxLegendSvgItem
                    key={i}
                    data={data}
                    x={itemCoordinates[i][0]}
                    y={itemCoordinates[i][1]}
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
                    toggleSerie={typeof toggleSerie === 'function' ? toggleSerie : undefined}
                />
            ))}
        </g>
    )
}
