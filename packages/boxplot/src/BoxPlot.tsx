import { Fragment, ReactNode, createElement, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
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
    BoxPlotDatum,
    BoxPlotLayer,
    BoxPlotLayerId,
    BoxPlotSvgProps,
    ComputedBoxPlotSummary,
} from './types'
import { svgDefaultProps } from './props'
import { useBoxPlot } from './hooks'

type InnerBoxPlotProps<RawDatum extends BoxPlotDatum> = Omit<
    BoxPlotSvgProps<RawDatum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerBoxPlot = <RawDatum extends BoxPlotDatum>({
    data,
    value,
    groupBy,
    groups,
    subGroupBy,
    subGroups,
    quantiles,

    margin: partialMargin,
    width,
    height,

    layout = svgDefaultProps.layout,
    minValue,
    maxValue,

    valueScale,
    indexScale,

    padding,
    innerPadding,

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

    colorBy,
    colors,
    defs = svgDefaultProps.defs,
    fill,
    borderRadius = svgDefaultProps.borderRadius,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    medianWidth = svgDefaultProps.medianWidth,
    medianColor = svgDefaultProps.medianColor,
    whiskerWidth = svgDefaultProps.whiskerWidth,
    whiskerColor = svgDefaultProps.whiskerColor,
    whiskerEndWidth = svgDefaultProps.whiskerEndWidth,

    markers = svgDefaultProps.markers,

    legendLabel,
    tooltipLabel,

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
    } = useBoxPlot<RawDatum>({
        tooltipLabel,
        valueFormat,
        colors,
        colorBy,
        borderColor,
        medianColor,
        whiskerColor,
        layout,
        data,
        value,
        groupBy,
        groups,
        subGroupBy,
        subGroups,
        quantiles,
        minValue,
        maxValue,
        width: innerWidth,
        height: innerHeight,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        legends,
        legendLabel,
    })

    const transition = useTransition<
        ComputedBoxPlotSummary,
        {
            borderColor: string
            medianColor: string
            whiskerColor: string
            color: string
            height: number
            opacity: number
            transform: string
            width: number
        }
    >(boxPlots, {
        keys: boxPlot => boxPlot.key,
        from: boxPlot => ({
            borderColor: getBorderColor(boxPlot) as string,
            medianColor: getMedianColor(boxPlot) as string,
            whiskerColor: getWhiskerColor(boxPlot) as string,
            color: boxPlot.color,
            height: 0,
            transform: `translate(${boxPlot.x}, ${boxPlot.y + boxPlot.height})`,
            width: boxPlot.width,
            ...(layout === 'vertical'
                ? {}
                : {
                      height: boxPlot.height,
                      transform: `translate(${boxPlot.x}, ${boxPlot.y})`,
                      width: 0,
                  }),
        }),
        enter: boxPlot => ({
            borderColor: getBorderColor(boxPlot) as string,
            medianColor: getMedianColor(boxPlot) as string,
            whiskerColor: getWhiskerColor(boxPlot) as string,
            color: boxPlot.color,
            height: boxPlot.height,
            transform: `translate(${boxPlot.x}, ${boxPlot.y})`,
            width: boxPlot.width,
        }),
        update: boxPlot => ({
            borderColor: getBorderColor(boxPlot) as string,
            medianColor: getMedianColor(boxPlot) as string,
            whiskerColor: getWhiskerColor(boxPlot) as string,
            color: boxPlot.color,
            height: boxPlot.height,
            transform: `translate(${boxPlot.x}, ${boxPlot.y})`,
            width: boxPlot.width,
        }),
        leave: boxPlot => ({
            borderColor: getBorderColor(boxPlot) as string,
            medianColor: getMedianColor(boxPlot) as string,
            whiskerColor: getWhiskerColor(boxPlot) as string,
            color: boxPlot.color,
            height: 0,
            transform: `translate(${boxPlot.x}, ${boxPlot.y + boxPlot.height})`,
            width: boxPlot.width,
            ...(layout === 'vertical'
                ? {}
                : {
                      height: boxPlot.height,
                      transform: `translate(${boxPlot.x}, ${boxPlot.y})`,
                      width: 0,
                  }),
        }),
        config: springConfig,
        immediate: !animate,
    })

    const commonProps = useMemo(
        () => ({
            borderRadius,
            borderWidth,
            medianWidth,
            whiskerWidth,
            whiskerEndWidth,
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
        }),
        [
            borderRadius,
            borderWidth,
            medianWidth,
            whiskerWidth,
            whiskerEndWidth,
            getTooltipLabel,
            isInteractive,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            isFocusable,
            boxPlotAriaLabel,
            boxPlotAriaLabelledBy,
            boxPlotAriaDescribedBy,
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
                xScale={xScale as any}
                yScale={yScale as any}
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
                {transition((style, boxPlot) =>
                    createElement(boxPlotComponent, {
                        ...commonProps,
                        boxPlot,
                        layout,
                        style,
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
                xScale={enableGridX ? (xScale as any) : null}
                yScale={enableGridY ? (yScale as any) : null}
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
                markers={markers as any[]}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale as (v: number | string) => number}
                yScale={yScale as (v: number) => number}
            />
        )
    }

    const layerContext: any = useMemo(
        () => ({
            ...commonProps,
            margin,
            innerWidth,
            innerHeight,
            width,
            height,
            boxPlots,
            xScale,
            yScale,
        }),
        [commonProps, margin, innerWidth, innerHeight, width, height, boxPlots, xScale, yScale]
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
