import { Fragment, ReactNode, ReactElement, forwardRef, Ref } from 'react'
import {
    // @ts-expect-error no types
    bindDefs,
    Container,
    SvgWrapper,
    useDimensions,
    WithChartRef,
} from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { BoxLegendSvg } from '@nivo/legends'
import { MarimekkoSvgProps, MarimekkoLayerId, DimensionDatum } from './types'
import { svgDefaultProps } from './defaults'
import { useMarimekko, useLayerContext, useLegendData } from './hooks'
import { Bars } from './Bars'

const InnerMarimekko = <Datum,>({
    data,
    id,
    value,
    valueFormat,
    dimensions,
    width,
    height,
    margin: partialMargin,
    layout = svgDefaultProps.layout,
    offset = svgDefaultProps.offset,
    outerPadding = svgDefaultProps.outerPadding,
    innerPadding = svgDefaultProps.innerPadding,
    layers = svgDefaultProps.layers,
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX = svgDefaultProps.enableGridX,
    gridXValues,
    enableGridY = svgDefaultProps.enableGridY,
    gridYValues,
    colors = svgDefaultProps.colors as OrdinalColorScaleConfig<
        Omit<DimensionDatum<Datum>, 'color'>
    >,
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as InheritedColorConfig<DimensionDatum<Datum>>,
    isInteractive = svgDefaultProps.isInteractive,
    tooltip = svgDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    legends = svgDefaultProps.legends,
    role,
    forwardedRef,
}: MarimekkoSvgProps<Datum> & {
    forwardedRef: Ref<SVGSVGElement>
}) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { computedData, bars, thicknessScale, dimensionsScale, dimensionIds } =
        useMarimekko<Datum>({
            data,
            id,
            value,
            dimensions,
            valueFormat,
            layout,
            offset,
            outerPadding,
            innerPadding,
            colors,
            borderColor,
            borderWidth,
            width: innerWidth,
            height: innerHeight,
        })

    const layerById: Record<MarimekkoLayerId, ReactNode> = {
        grid: null,
        axes: null,
        bars: null,
        legends: null,
    }

    const boundDefs = bindDefs(defs, bars, fill)

    if (layers.includes('bars')) {
        layerById.bars = (
            <Bars<Datum>
                key="bars"
                bars={bars}
                isInteractive={isInteractive}
                tooltip={tooltip}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            />
        )
    }

    const xScale = layout === 'vertical' ? thicknessScale : dimensionsScale
    const yScale = layout === 'vertical' ? dimensionsScale : thicknessScale

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                xScale={enableGridX ? xScale : undefined}
                yScale={enableGridY ? yScale : undefined}
                width={innerWidth}
                height={innerHeight}
                xValues={gridXValues}
                yValues={gridYValues}
            />
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

    const legendData = useLegendData<Datum>(dimensionIds, bars)

    if (layers.includes('legends')) {
        layerById.legends = (
            <g key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legendData}
                    />
                ))}
            </g>
        )
    }

    const layerContext = useLayerContext<Datum>({
        data: computedData,
        bars,
        thicknessScale,
        dimensionsScale,
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
            role={role}
            ref={forwardedRef}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{layer(layerContext)}</Fragment>
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

export const Marimekko = forwardRef(
    <Datum,>(
        {
            isInteractive = svgDefaultProps.isInteractive,
            animate = svgDefaultProps.animate,
            motionConfig = svgDefaultProps.motionConfig,
            ...props
        }: MarimekkoSvgProps<Datum>,
        ref: Ref<SVGSVGElement>
    ) => (
        <Container
            theme={props.theme}
            isInteractive={isInteractive}
            animate={animate}
            motionConfig={motionConfig}
        >
            <InnerMarimekko<Datum>
                isInteractive={isInteractive}
                animate={animate}
                motionConfig={motionConfig}
                {...props}
                forwardedRef={ref}
            />
        </Container>
    )
) as <Datum>(props: WithChartRef<MarimekkoSvgProps<Datum>, SVGSVGElement>) => ReactElement
