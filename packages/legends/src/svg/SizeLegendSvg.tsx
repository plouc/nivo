import { SizeLegendProps, SymbolShapeSvg } from '../types'
import { computeDimensions, computePositionFromAnchor, getLegendTitleDatum } from '../compute'
import { BoxLegendSvgItem } from './BoxLegendSvgItem'

// TO DO - implement an interface that takes a scale, then re-use code from BoxLegendSvg
export const SizeLegendSvg = ({
    containerWidth,
    containerHeight,
    anchor,
    translateX = 0,
    translateY = 0,

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

    symbolShape = 'circle',
    symbolSize = 10, // here used to allocate space, actual symbol size will be variable
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,
}: SizeLegendProps) => {
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
        <g transform={`translate(${x}, ${y})`}>
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
                    effects={[]}
                    textColor={itemTextColor}
                    background={itemBackground}
                    opacity={itemOpacity}
                    symbolShape={symbolShape as SymbolShapeSvg}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    symbolBorderWidth={symbolBorderWidth}
                    symbolBorderColor={symbolBorderColor}
                    toggleSerie={undefined}
                />
            ))}
        </g>
    )
}
