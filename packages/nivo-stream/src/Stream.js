/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { min, max, range, sortBy } from 'lodash'
import { bindDefs } from '@nivo/core'
import { Container, SvgWrapper } from '@nivo/core'
import { Axes, Grid } from '@nivo/core'
import StreamLayers from './StreamLayers'
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

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // axes & grid
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    // styling
    theme,
    getColor,
    fillOpacity,
    borderWidth,
    getBorderColor,
    defs,
    fill,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    tooltipFormat,

    // stack tooltip
    enableStackTooltip,
}) => {
    const enhancedLayers = layers.map((points, i) => {
        const layer = points.map((point, i) => ({
            index: i,
            x: xScale(i),
            value: point.value,
            y1: yScale(point[0]),
            y2: yScale(point[1]),
        }))

        return {
            id: keys[i],
            layer,
            path: areaGenerator(layer),
            color: getColor(i),
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

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const boundDefs = bindDefs(defs, enhancedLayers, fill)

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper
                    width={outerWidth}
                    height={outerHeight}
                    margin={margin}
                    defs={boundDefs}
                >
                    <Grid
                        theme={theme}
                        width={width}
                        height={height}
                        xScale={enableGridX ? xScale : null}
                        yScale={enableGridY ? yScale : null}
                        {...motionProps}
                    />
                    <StreamLayers
                        layers={enhancedLayers}
                        fillOpacity={fillOpacity}
                        borderWidth={borderWidth}
                        getBorderColor={getBorderColor}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        theme={theme}
                        {...motionProps}
                    />
                    <Axes
                        xScale={xScale}
                        yScale={yScale}
                        width={width}
                        height={height}
                        theme={theme}
                        top={axisTop}
                        right={axisRight}
                        bottom={axisBottom}
                        left={axisLeft}
                        {...motionProps}
                    />
                    {isInteractive &&
                        enableStackTooltip && (
                            <StreamSlices
                                slices={slices}
                                height={height}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                theme={theme}
                                tooltipFormat={tooltipFormat}
                            />
                        )}
                </SvgWrapper>
            )}
        </Container>
    )
}

Stream.propTypes = StreamPropTypes

const enhancedStream = enhance(Stream)
enhancedStream.displayName = 'enhance(Stream)'

export default enhancedStream
