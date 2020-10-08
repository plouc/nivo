import { createElement, Fragment, ReactNode } from 'react'
import {
    Container,
    SvgWrapper,
    useDimensions,
    // @ts-ignore
    bindDefs,
} from '@bitbloom/nivo-core'
import { Axes, Grid } from '@bitbloom/nivo-axes'
import { BoxLegendSvg } from '@bitbloom/nivo-legends'
import { StreamLayers } from './StreamLayers'
import { StreamDots } from './StreamDots'
import { StreamSlices } from './StreamSlices'
import { useStream } from './hooks'
import { svgDefaultProps } from './props'
import { StreamDatum, StreamLayerId, StreamSvgProps } from './types'

type InnerStreamProps<RawDatum extends StreamDatum> = Omit<
    StreamSvgProps<RawDatum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerStream = <RawDatum extends StreamDatum>({
    data,
    keys,
    label,
    valueFormat,

    offsetType,
    order,
    curve,

    layers: chartLayers = svgDefaultProps.layers,

    width,
    height,
    margin: partialMargin,

    axisTop,
    axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,
    enableGridX = svgDefaultProps.enableGridX,
    enableGridY = svgDefaultProps.enableGridY,

    colors,
    fillOpacity = svgDefaultProps.fillOpacity,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor,
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,

    enableDots = svgDefaultProps.enableDots,
    dotPosition = svgDefaultProps.dotPosition,
    dotComponent = svgDefaultProps.dotComponent,
    dotSize,
    dotColor,
    dotBorderWidth,
    dotBorderColor,

    isInteractive = svgDefaultProps.isInteractive,
    tooltip = svgDefaultProps.tooltip,
    enableStackTooltip = svgDefaultProps.enableStackTooltip,
    stackTooltip = svgDefaultProps.stackTooltip,

    legends = svgDefaultProps.legends,

    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerStreamProps<RawDatum>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        xScale,
        yScale,
        layers,
        slices,
        getBorderColor,
        getDotSize,
        getDotColor,
        getDotBorderWidth,
        getDotBorderColor,
        layerContext,
    } = useStream<RawDatum>({
        width: innerWidth,
        height: innerHeight,
        data,
        keys,
        label,
        valueFormat,
        offsetType,
        order,
        curve,
        colors,
        borderColor,
        dotSize,
        dotColor,
        dotBorderWidth,
        dotBorderColor,
    })

    const boundDefs = bindDefs(defs, layers, fill)

    const layerById: Record<StreamLayerId, ReactNode> = {
        grid: null,
        axes: null,
        layers: null,
        dots: null,
        slices: null,
        legends: null,
    }

    if (chartLayers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
        )
    }

    if (chartLayers.includes('axes')) {
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

    if (chartLayers.includes('layers')) {
        layerById.layers = (
            <StreamLayers<RawDatum>
                key="layers"
                layers={layers}
                fillOpacity={fillOpacity}
                borderWidth={borderWidth}
                getBorderColor={getBorderColor}
                isInteractive={isInteractive}
                tooltip={tooltip}
            />
        )
    }

    if (chartLayers.includes('dots') && enableDots) {
        layerById.dots = (
            <Fragment key="dots">
                {layers.map(layer => (
                    <StreamDots
                        key={layer.id}
                        id={layer.id}
                        color={layer.color}
                        data={layer.data}
                        dotComponent={dotComponent}
                        position={dotPosition}
                        getSize={getDotSize}
                        getColor={getDotColor}
                        getBorderWidth={getDotBorderWidth}
                        getBorderColor={getDotBorderColor}
                    />
                ))}
            </Fragment>
        )
    }

    if (chartLayers.includes('slices') && isInteractive && enableStackTooltip) {
        layerById.slices = (
            <StreamSlices<RawDatum>
                key="slices"
                slices={slices}
                height={innerHeight}
                tooltip={stackTooltip}
            />
        )
    }

    if (chartLayers.includes('legends')) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, i) => {
                    const legendData = layers
                        .map(layer => ({
                            id: layer.id,
                            label: layer.label,
                            color: layer.color,
                            fill: layer.fill,
                        }))
                        .reverse()

                    return (
                        <BoxLegendSvg
                            key={i}
                            {...legend}
                            containerWidth={innerWidth}
                            containerHeight={innerHeight}
                            data={legendData}
                        />
                    )
                })}
            </Fragment>
        )
    }

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
        >
            {chartLayers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Stream = <RawDatum extends StreamDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: StreamSvgProps<RawDatum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerStream<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
