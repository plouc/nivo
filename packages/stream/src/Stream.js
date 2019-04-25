/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import sortBy from 'lodash/sortBy'
import { bindDefs, Container, SvgWrapper } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import StreamLayers from './StreamLayers'
import StreamDots from './StreamDots'
import StreamSlices from './StreamSlices'
import { StreamPropTypes } from './props'
import enhance from './enhance'

const Stream = ({
    data,
    keys,
    xScale,
    yScale,
    layers,
    areaGenerator,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    theme,
    getColor,
    fillOpacity,
    borderWidth,
    getBorderColor,
    defs,
    fill,

    enableDots,
    dotPosition,
    renderDot,
    getDotSize,
    getDotColor,
    getDotBorderWidth,
    getDotBorderColor,

    animate,
    motionStiffness,
    motionDamping,

    isInteractive,
    getTooltipValue,
    getTooltipLabel,
    enableStackTooltip,

    legends,
}) => {
    const enhancedLayers = layers.map((points, layerIndex) => {
        const layer = points.map((point, i) => ({
            index: i,
            x: xScale(i),
            value: point.value,
            y1: yScale(point[0]),
            y2: yScale(point[1]),
        }))

        return {
            id: keys[layerIndex],
            layer,
            path: areaGenerator(layer),
            color: getColor({ index: layerIndex }),
        }
    })

    const slices = range(data.length).map(i => ({
        index: i,
        x: enhancedLayers[0].layer[i].x,
        stack: sortBy(
            enhancedLayers.map(layer => ({
                id: layer.id,
                color: layer.color,
                ...layer.layer[i],
            })),
            'y2'
        ),
    }))

    const boundDefs = bindDefs(defs, enhancedLayers, fill)

    return (
        <Container
            isInteractive={isInteractive}
            theme={theme}
            animate={animate}
            motionDamping={motionDamping}
            motionStiffness={motionStiffness}
        >
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper
                    width={outerWidth}
                    height={outerHeight}
                    margin={margin}
                    defs={boundDefs}
                    theme={theme}
                >
                    <Grid
                        width={width}
                        height={height}
                        xScale={enableGridX ? xScale : null}
                        yScale={enableGridY ? yScale : null}
                    />
                    <StreamLayers
                        layers={enhancedLayers}
                        fillOpacity={fillOpacity}
                        borderWidth={borderWidth}
                        getBorderColor={getBorderColor}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        getTooltipLabel={getTooltipLabel}
                        theme={theme}
                        animate={animate}
                        motionDamping={motionDamping}
                        motionStiffness={motionStiffness}
                    />
                    <Axes
                        xScale={xScale}
                        yScale={yScale}
                        width={width}
                        height={height}
                        top={axisTop}
                        right={axisRight}
                        bottom={axisBottom}
                        left={axisLeft}
                    />
                    {enableDots &&
                        enhancedLayers.map(layer => (
                            <StreamDots
                                key={layer.id}
                                id={layer.id}
                                color={layer.color}
                                data={layer.layer}
                                renderDot={renderDot}
                                position={dotPosition}
                                getSize={getDotSize}
                                getColor={getDotColor}
                                getBorderWidth={getDotBorderWidth}
                                getBorderColor={getDotBorderColor}
                                animate={animate}
                                motionDamping={motionDamping}
                                motionStiffness={motionStiffness}
                            />
                        ))}
                    {isInteractive && enableStackTooltip && (
                        <StreamSlices
                            slices={slices}
                            height={height}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            theme={theme}
                            getTooltipValue={getTooltipValue}
                            getTooltipLabel={getTooltipLabel}
                        />
                    )}
                    {legends.map((legend, i) => {
                        const legendData = enhancedLayers
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
                                containerWidth={width}
                                containerHeight={height}
                                data={legendData}
                                theme={theme}
                            />
                        )
                    })}
                </SvgWrapper>
            )}
        </Container>
    )
}

Stream.propTypes = StreamPropTypes

const enhancedStream = enhance(Stream)
enhancedStream.displayName = 'Stream'

export default enhancedStream
