import { ReactNode, Fragment, createElement } from 'react'
import { SvgWrapper, Container, useDimensions } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { AnchoredContinuousColorsLegendSvg } from '@nivo/legends'
import {
    DefaultHeatMapDatum,
    HeatMapDatum,
    HeatMapCommonProps,
    HeatMapSvgProps,
    LayerId,
} from './types'
import { useHeatMap } from './hooks'
import { svgDefaultProps } from './defaults'
import { HeatMapCells } from './HeatMapCells'

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
    forceSquare = svgDefaultProps.forceSquare,
    xInnerPadding = svgDefaultProps.xInnerPadding,
    xOuterPadding = svgDefaultProps.xOuterPadding,
    yInnerPadding = svgDefaultProps.yInnerPadding,
    yOuterPadding = svgDefaultProps.yOuterPadding,
    sizeVariation = svgDefaultProps.sizeVariation,
    cellComponent = svgDefaultProps.cellComponent,
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
    label = svgDefaultProps.label,
    labelTextColor = svgDefaultProps.labelTextColor,
    colors = svgDefaultProps.colors,
    nanColor = svgDefaultProps.nanColor,
    legends = svgDefaultProps.legends,
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

    const { xScale, yScale, cells, colorScale } = useHeatMap<Datum, ExtraProps>({
        data,
        valueFormat,
        width: innerWidth,
        height: innerHeight,
        xInnerPadding,
        xOuterPadding,
        yInnerPadding,
        yOuterPadding,
        colors,
        opacity,
        activeOpacity,
        inactiveOpacity,
        borderColor,
        label,
        labelTextColor,
    })

    const layerById: Record<LayerId, ReactNode> = {
        grid: null,
        axes: null,
        cells: null,
        legends: null,
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
                    borderRadius={borderRadius}
                    borderWidth={borderWidth}
                    isInteractive={isInteractive}
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

    if (layers.includes('legends')) {
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
                    return <Fragment key={i}>{createElement(layer, {})}</Fragment>
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
