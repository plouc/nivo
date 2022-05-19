import { Fragment, ReactNode, createElement, useMemo } from 'react'
import { Axes, Grid } from '@nivo/axes'
import {
    CartesianMarkers,
    Container,
    SvgWrapper,
    // @ts-ignore
    bindDefs,
    useDimensions,
    useMotionConfig,
} from '@nivo/core'
import { BoxPlotAnnotations } from './BoxPlotAnnotations'
import { BoxPlotLegends } from './BoxPlotLegends'
import {
    BoxPlotCustomLayerProps,
    BoxPlotDatum,
    BoxPlotLayer,
    BoxPlotLayerId,
    BoxPlotSvgProps,
} from './types'
import { svgDefaultProps } from './props'
import { useBoxPlot, useBoxPlotTransition } from './hooks'

type InnerBoxPlotProps<RawDatum extends BoxPlotDatum> = Omit<
    BoxPlotSvgProps<RawDatum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerBoxPlot = <RawDatum extends BoxPlotDatum>({
    data,
    value = svgDefaultProps.value,
    groupBy = svgDefaultProps.groupBy,
    groups = svgDefaultProps.groups,
    subGroupBy = svgDefaultProps.subGroupBy,
    subGroups = svgDefaultProps.subGroups,
    quantiles = svgDefaultProps.quantiles,

    margin: partialMargin,
    width,
    height,

    layout = svgDefaultProps.layout,
    minValue = svgDefaultProps.minValue,
    maxValue = svgDefaultProps.maxValue,

    valueScale = svgDefaultProps.valueScale,
    indexScale = svgDefaultProps.indexScale,

    padding = svgDefaultProps.padding,
    innerPadding = svgDefaultProps.innerPadding,

    opacity = svgDefaultProps.opacity,
    activeOpacity = svgDefaultProps.activeOpacity,
    inactiveOpacity = svgDefaultProps.inactiveOpacity,

    axisTop,
    axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,
    enableGridX = svgDefaultProps.enableGridX,
    enableGridY = svgDefaultProps.enableGridY,
    gridXValues,
    gridYValues,

    layers = svgDefaultProps.layers as BoxPlotLayer<RawDatum>[],
    boxPlotComponent = svgDefaultProps.boxPlotComponent,

    colorBy = svgDefaultProps.colorBy,
    colors = svgDefaultProps.colors,
    defs = svgDefaultProps.defs,
    fill,
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    medianWidth = svgDefaultProps.medianWidth,
    medianColor = svgDefaultProps.medianColor,
    whiskerWidth = svgDefaultProps.whiskerWidth,
    whiskerColor = svgDefaultProps.whiskerColor,
    whiskerEndSize = svgDefaultProps.whiskerEndSize,

    markers = svgDefaultProps.markers,

    legendLabel,
    tooltipLabel = svgDefaultProps.tooltipLabel,

    valueFormat,

    isInteractive = svgDefaultProps.isInteractive,
    tooltip = svgDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    annotations = svgDefaultProps.annotations,
    legends = svgDefaultProps.legends,

    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    isFocusable = svgDefaultProps.isFocusable,
    boxPlotAriaLabel,
    boxPlotAriaLabelledBy,
    boxPlotAriaDescribedBy,
}: InnerBoxPlotProps<RawDatum>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        boxPlots,
        xScale,
        yScale,
        getTooltipLabel,
        getBorderColor,
        getMedianColor,
        getWhiskerColor,
        legendsData,
        activeItem,
        setActiveItem,
    } = useBoxPlot<RawDatum>({
        data,
        value,
        groupBy,
        groups,
        subGroupBy,
        subGroups,
        quantiles,
        width: innerWidth,
        height: innerHeight,
        layout,
        minValue,
        maxValue,
        valueScale,
        indexScale,
        padding,
        innerPadding,
        colorBy,
        colors,
        opacity,
        activeOpacity,
        inactiveOpacity,
        borderColor,
        medianColor,
        whiskerColor,
        legendLabel,
        tooltipLabel,
        valueFormat,
        legends,
    })

    const transition = useBoxPlotTransition({
        boxPlots,
        getBorderColor,
        getMedianColor,
        getWhiskerColor,
        animate,
        springConfig,
    })

    const commonProps = useMemo(
        () => ({
            borderRadius,
            borderWidth,
            medianWidth,
            whiskerWidth,
            whiskerEndSize,
            padding,
            innerPadding,
            isInteractive,
            onClick,
            onMouseEnter,
            onMouseLeave,
            getTooltipLabel,
            tooltip,
            isFocusable,
            ariaLabel: boxPlotAriaLabel,
            ariaLabelledBy: boxPlotAriaLabelledBy,
            ariaDescribedBy: boxPlotAriaDescribedBy,
            activeItem,
            setActiveItem,
        }),
        [
            borderRadius,
            borderWidth,
            medianWidth,
            whiskerWidth,
            whiskerEndSize,
            padding,
            innerPadding,
            isInteractive,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            getTooltipLabel,
            isFocusable,
            boxPlotAriaLabel,
            boxPlotAriaLabelledBy,
            boxPlotAriaDescribedBy,
            activeItem,
            setActiveItem,
        ]
    )

    const boundDefs = bindDefs(defs, boxPlots, fill, {
        dataKey: 'data',
        targetKey: 'fill',
    })

    const layerById: Record<BoxPlotLayerId, ReactNode> = {
        annotations: null,
        axes: null,
        boxPlots: null,
        grid: null,
        legends: null,
        markers: null,
    }

    if (layers.includes('annotations')) {
        layerById.annotations = (
            <BoxPlotAnnotations key="annotations" boxPlots={boxPlots} annotations={annotations} />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('boxPlots')) {
        layerById.boxPlots = (
            <Fragment key="boxPlots">
                {transition((animatedProps, boxPlot) =>
                    createElement(boxPlotComponent, {
                        ...commonProps,
                        boxPlot,
                        layout,
                        animatedProps,
                    })
                )}
            </Fragment>
        )
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <BoxPlotLegends
                key="legends"
                width={innerWidth}
                height={innerHeight}
                legends={legendsData}
            />
        )
    }

    if (layers.includes('markers')) {
        layerById.markers = (
            <CartesianMarkers<number | string, number>
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale as (v: number | string) => number}
                yScale={yScale as (v: number) => number}
            />
        )
    }

    const layerContext: BoxPlotCustomLayerProps<RawDatum> = useMemo(
        () => ({
            ...commonProps,
            layout,
            margin,
            width,
            height,
            innerWidth,
            innerHeight,
            padding,
            innerPadding,
            boxPlots,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            getTooltipLabel,
            xScale,
            yScale,
        }),
        [
            commonProps,
            layout,
            margin,
            width,
            height,
            innerWidth,
            innerHeight,
            padding,
            innerPadding,
            boxPlots,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            getTooltipLabel,
            xScale,
            yScale,
        ]
    )

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
            isFocusable={isFocusable}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }
                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const BoxPlot = <RawDatum extends BoxPlotDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: BoxPlotSvgProps<RawDatum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerBoxPlot<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
