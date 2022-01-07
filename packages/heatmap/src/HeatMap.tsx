import { ReactNode, Fragment, createElement } from 'react'
import { SvgWrapper, Container, useDimensions } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { AnchoredContinuousColorsLegendSvg } from '@nivo/legends'
import {
    DefaultHeatMapDatum,
    HeatMapDatum,
    HeatMapCommonProps,
    HeatMapSvgProps,
    LayerId, CustomLayerProps,
} from './types'
import { useHeatMap } from './hooks'
import { svgDefaultProps } from './defaults'
import { HeatMapCells } from './HeatMapCells'
import { HeatMapCellAnnotations } from './HeatMapCellAnnotations'

type InnerHeatMapProps<Datum extends HeatMapDatum, ExtraProps extends object> = Omit<
    HeatMapSvgProps<Datum, ExtraProps>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerHeatMap = <Datum extends HeatMapDatum, ExtraProps extends object>({
    data,
    layers = svgDefaultProps.layers,
    minValue: _minValue = svgDefaultProps.minValue,
    maxValue: _maxValue = svgDefaultProps.maxValue,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    // forceSquare = svgDefaultProps.forceSquare,
    xInnerPadding = svgDefaultProps.xInnerPadding,
    xOuterPadding = svgDefaultProps.xOuterPadding,
    yInnerPadding = svgDefaultProps.yInnerPadding,
    yOuterPadding = svgDefaultProps.yOuterPadding,
    // sizeVariation = svgDefaultProps.sizeVariation,
    cellComponent = svgDefaultProps.cellComponent as NonNullable<
        HeatMapSvgProps<Datum, ExtraProps>['cellComponent']
    >,
    opacity = svgDefaultProps.opacity,
    activeOpacity = svgDefaultProps.activeOpacity,
    inactiveOpacity = svgDefaultProps.inactiveOpacity,
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as HeatMapCommonProps<Datum>['borderColor'],
    enableGridX = svgDefaultProps.enableGridX,
    enableGridY = svgDefaultProps.enableGridY,
    axisTop = svgDefaultProps.axisTop,
    axisRight = svgDefaultProps.axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,
    enableLabels = svgDefaultProps.enableLabels,
    label = svgDefaultProps.label as HeatMapCommonProps<Datum>['label'],
    labelTextColor = svgDefaultProps.labelTextColor as HeatMapCommonProps<Datum>['labelTextColor'],
    colors = svgDefaultProps.colors as HeatMapCommonProps<Datum>['colors'],
    emptyColor = svgDefaultProps.emptyColor,
    legends = svgDefaultProps.legends,
    annotations = svgDefaultProps.annotations as HeatMapCommonProps<Datum>['annotations'],
    isInteractive = svgDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    hoverTarget = svgDefaultProps.hoverTarget,
    tooltip = svgDefaultProps.tooltip as HeatMapCommonProps<Datum>['tooltip'],
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerHeatMapProps<Datum, ExtraProps>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { xScale, yScale, cells, colorScale, activeCell, setActiveCell } = useHeatMap<Datum, ExtraProps>({
        data,
        valueFormat,
        width: innerWidth,
        height: innerHeight,
        xInnerPadding,
        xOuterPadding,
        yInnerPadding,
        yOuterPadding,
        colors,
        emptyColor,
        opacity,
        activeOpacity,
        inactiveOpacity,
        borderColor,
        label,
        labelTextColor,
        hoverTarget,
    })

    const layerById: Record<LayerId, ReactNode> = {
        grid: null,
        axes: null,
        cells: null,
        legends: null,
        annotations: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth} // - offsetX * 2
                height={innerHeight} // - offsetY * 2
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth} // - offsetX * 2
                height={innerHeight} // - offsetY * 2
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <Fragment key="cells">
                <HeatMapCells<Datum, ExtraProps>
                    cells={cells}
                    cellComponent={cellComponent}
                    borderRadius={borderRadius}
                    borderWidth={borderWidth}
                    isInteractive={isInteractive}
                    setActiveCell={setActiveCell}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    tooltip={tooltip}
                    enableLabels={enableLabels}
                />
            </Fragment>
        )
    }

    if (layers.includes('legends') && colorScale !== null) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, index) => (
                    <AnchoredContinuousColorsLegendSvg
                        {...legend}
                        key={index}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        scale={colorScale}
                    />
                ))}
            </Fragment>
        )
    }

    if (layers.includes('annotations') && annotations.length > 0) {
        layerById.annotations = (
            <HeatMapCellAnnotations<Datum>
                key="annotations"
                cells={cells}
                annotations={annotations}
            />
        )
    }

    const customLayerProps: CustomLayerProps<Datum> = {
        cells,
        activeCell,
        setActiveCell
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={Object.assign({}, margin, {
                top: margin.top, //+ offsetY,
                left: margin.left, // + offsetX,
            })}
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

export const HeatMap = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: HeatMapSvgProps<Datum, ExtraProps>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerHeatMap<Datum, ExtraProps> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
