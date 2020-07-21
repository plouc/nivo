/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { bindDefs, SvgWrapper, useDimensions, withContainer } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import StreamLayers from './StreamLayers'
import StreamDots from './StreamDots'
import StreamSlices from './StreamSlices'
import { StreamPropTypes, StreamDefaultProps } from './props'
import { useStream } from './hooks'

const Stream = ({
    data,
    keys,
    offsetType,
    order,
    curve,

    width,
    height,
    margin: partialMargin,

    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    colors,
    fillOpacity,
    borderWidth,
    borderColor,
    defs,
    fill,

    enableDots,
    dotPosition,
    dotComponent,
    dotSize,
    dotColor,
    dotBorderWidth,
    dotBorderColor,

    isInteractive,
    tooltipLabel,
    tooltipFormat,
    enableStackTooltip,

    legends,
}) => {
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
        getTooltipLabel,
        getTooltipValue,
    } = useStream({
        width: innerWidth,
        height: innerHeight,
        data,
        keys,
        offsetType,
        order,
        curve,
        colors,
        borderColor,
        dotSize,
        dotColor,
        dotBorderWidth,
        dotBorderColor,
        tooltipLabel,
        tooltipFormat,
    })

    const boundDefs = bindDefs(defs, layers, fill)

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} defs={boundDefs}>
            <Grid
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
            <StreamLayers
                layers={layers}
                fillOpacity={fillOpacity}
                borderWidth={borderWidth}
                getBorderColor={getBorderColor}
                getTooltipLabel={getTooltipLabel}
                isInteractive={isInteractive}
            />
            <Axes
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
            {enableDots &&
                layers.map(layer => (
                    <StreamDots
                        key={layer.id}
                        id={layer.id}
                        color={layer.color}
                        data={layer.layer}
                        dotComponent={dotComponent}
                        position={dotPosition}
                        getSize={getDotSize}
                        getColor={getDotColor}
                        getBorderWidth={getDotBorderWidth}
                        getBorderColor={getDotBorderColor}
                    />
                ))}
            {isInteractive && enableStackTooltip && (
                <StreamSlices
                    slices={slices}
                    height={innerHeight}
                    getTooltipValue={getTooltipValue}
                    getTooltipLabel={getTooltipLabel}
                />
            )}
            {legends.map((legend, i) => {
                const legendData = layers
                    .map(l => ({
                        id: l.id,
                        label: l.id,
                        color: l.color,
                        fill: l.fill,
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
        </SvgWrapper>
    )
}

Stream.propTypes = StreamPropTypes

const WrappedStream = withContainer(Stream)
WrappedStream.defaultProps = StreamDefaultProps

export default WrappedStream
