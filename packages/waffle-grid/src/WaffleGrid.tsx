import { ReactNode, Fragment, createElement, useMemo } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { Axes } from '@nivo/axes'
import { WaffleGridAllCells } from './WaffleGridAllCells'
import { WaffleGridGrid } from './WaffleGridGrid'
import { WaffleGridSvgProps, WaffleGridLayerId, WaffleGridCustomLayerProps } from './types'
import { svgDefaultProps } from './defaults'
import { useWaffleGrid } from './hooks'

type InnerWaffleGridProps = Omit<
    WaffleGridSvgProps,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

export const InnerWaffleGrid = ({
    width,
    height,
    data,
    xRange,
    yRange,
    cellValue,
    maxValue = svgDefaultProps.maxValue,
    spacing = svgDefaultProps.spacing,
    cellSpacing = svgDefaultProps.cellSpacing,
    margin: partialMargin,
    enableBlankCells = svgDefaultProps.enableBlankCells,
    blankCellColor = svgDefaultProps.blankCellColor,
    valueCellColor = svgDefaultProps.valueCellColor,
    enableGridX = svgDefaultProps.enableGridX,
    enableGridY = svgDefaultProps.enableGridY,
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    layers = svgDefaultProps.layers,
    blankCellComponent = svgDefaultProps.blankCellComponent,
    blankCellsMotion = {},
    valueCellComponent = svgDefaultProps.valueCellComponent,
    valueCellsMotion = {},
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerWaffleGridProps) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { blankCells, valueCells, xAxis, yAxis } = useWaffleGrid({
        width: innerWidth,
        height: innerHeight,
        data,
        xRange,
        yRange,
        cellValue,
        maxValue,
        spacing,
        cellSpacing,
        blankCellColor,
        valueCellColor,
    })

    const layerById: Record<WaffleGridLayerId, ReactNode> = {
        grid: null,
        axes: null,
        cells: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <WaffleGridGrid
                key="grid"
                xAxis={xAxis}
                enableX={enableGridX}
                yAxis={yAxis}
                enableY={enableGridY}
            />
        )
    }

    if (layers.includes('axes')) {
        // layerById.axes = <WaffleGridAxes key="axes" xAxis={xAxis} yAxis={yAxis} />
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xAxis.scale}
                yScale={yAxis.scale}
                x={yAxis.x1}
                y={xAxis.y1}
                width={yAxis.x2 - yAxis.x1}
                height={xAxis.y2 - xAxis.y1}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <WaffleGridAllCells
                key="cells"
                enableBlankCells={enableBlankCells}
                blankCells={blankCells}
                blankCellComponent={blankCellComponent}
                blankCellsMotion={blankCellsMotion}
                valueCells={valueCells}
                valueCellComponent={valueCellComponent}
                valueCellsMotion={valueCellsMotion}
            />
        )
    }

    const customLayerProps = useMemo<WaffleGridCustomLayerProps>(
        () => ({
            blankCells,
            valueCells,
        }),
        [blankCells, valueCells]
    )

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            <rect
                x={yAxis.x1}
                y={xAxis.y1}
                width={yAxis.x2 - yAxis.x1}
                height={xAxis.y2 - xAxis.y1}
                fill="#ff000011"
            />
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const WaffleGrid = ({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: WaffleGridSvgProps) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerWaffleGrid isInteractive={isInteractive} {...otherProps} />
    </Container>
)
