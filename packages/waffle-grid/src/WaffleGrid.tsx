import { ReactNode, Fragment, createElement, useMemo } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { WaffleGridCells } from './WaffleGridCells'
import { WaffleGridAxes } from './WaffleGridAxes'
import { WaffleGridSvgProps, WaffleGridLayerId, WaffleGridCustomLayerProps } from './types'
import { svgDefaultProps } from './props'
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
    spacing = svgDefaultProps.spacing,
    margin: partialMargin,
    enableBlankCells = svgDefaultProps.enableBlankCells,
    layers = svgDefaultProps.layers,
    blankCellComponent = svgDefaultProps.blankCellComponent,
    valueCellComponent = svgDefaultProps.valueCellComponent,
    blankCellsMotionConfig,
    blankCellsStaggeredDelay = svgDefaultProps.blankCellsStaggeredDelay,
    valueCellsMotionConfig,
    valueCellsStaggeredDelay = svgDefaultProps.valueCellsStaggeredDelay,
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
        spacing,
    })

    const layerById: Record<WaffleGridLayerId, ReactNode> = {
        grid: null,
        axes: null,
        cells: null,
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <WaffleGridCells
                key="cells"
                enableBlankCells={enableBlankCells}
                blankCells={blankCells}
                blankCellComponent={blankCellComponent}
                blankCellsMotionConfig={blankCellsMotionConfig}
                blankCellsStaggeredDelay={blankCellsStaggeredDelay}
                valueCells={valueCells}
                valueCellComponent={valueCellComponent}
                valueCellsMotionConfig={valueCellsMotionConfig}
                valueCellsStaggeredDelay={valueCellsStaggeredDelay}
            />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = <WaffleGridAxes key="axes" xAxis={xAxis} yAxis={yAxis} />
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
