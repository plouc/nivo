import React, { createElement, Fragment, ReactNode } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { Grid, Axes } from '@nivo/axes'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { SvgProps, LayerId, DimensionDatum } from './types'
import { defaultProps } from './props'
import { useMarimekko, useLayerContext } from './hooks'
import { Bars } from './Bars'
import { BarTooltip } from './BarTooltip'

const InnerMarimekko = <RawDatum,>({
    data,
    id,
    value,
    dimensions,
    width,
    height,
    margin: partialMargin,
    layout = defaultProps.layout,
    offset = defaultProps.offset,
    layers = defaultProps.layers,
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX = defaultProps.enableGridX,
    gridXValues,
    enableGridY = defaultProps.enableGridY,
    gridYValues,
    colors = defaultProps.colors as OrdinalColorScaleConfig<
        Omit<DimensionDatum<RawDatum>, 'color'>
    >,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<DimensionDatum<RawDatum>>,
    isInteractive = defaultProps.isInteractive,
    tooltip = BarTooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    role,
}: SvgProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { computedData, bars, thicknessScale, dimensionsScale } = useMarimekko<RawDatum>({
        data,
        id,
        value,
        dimensions,
        layout,
        offset,
        colors,
        borderColor,
        borderWidth,
        width: innerWidth,
        height: innerHeight,
    })

    const layerById: Record<LayerId, ReactNode> = {
        grid: null,
        axes: null,
        bars: null,
        legends: null,
    }

    if (layers.includes('bars')) {
        layerById.bars = (
            <Bars<RawDatum>
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
                xScale={enableGridX ? (xScale as any) : undefined}
                yScale={enableGridY ? (yScale as any) : undefined}
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

    const layerContext = useLayerContext<RawDatum>({
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
            // defs={boundDefs}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as LayerId] !== undefined) {
                    return layerById[layer as LayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const Marimekko = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    ...otherProps
}: SvgProps<RawDatum>) => (
    <Container
        theme={otherProps.theme}
        isInteractive={isInteractive}
        animate={animate}
        motionConfig={motionConfig}
    >
        <InnerMarimekko<RawDatum>
            isInteractive={isInteractive}
            animate={animate}
            motionConfig={motionConfig}
            {...otherProps}
        />
    </Container>
)
