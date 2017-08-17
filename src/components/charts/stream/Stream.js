/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { min, max, range, sortBy } from 'lodash'
import { stack as d3Stack, area } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import {
    areaCurvePropType,
    stackOrderPropType,
    stackOrderFromProp,
    stackOffsetPropType,
    stackOffsetFromProp,
} from '../../../props'
import { withTheme, withCurve, withDimensions, withMotion } from '../../../hocs'
import { getColorRange } from '../../../lib/colorUtils'
import SvgWrapper from '../SvgWrapper'
import Container from '../Container'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import StreamLayers from './StreamLayers'
import StreamSlices from './StreamSlices'

const stackMin = layers => min(layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[0])], []))
const stackMax = layers => max(layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[1])], []))

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

    // theming
    theme,
    getColor,
    fillOpacity,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,

    // stack tooltip
    enableStackTooltip,
}) => {
    const enhancedLayers = layers.map((points, i) => {
        const layer = points.map(([y1, y2], i) => ({
            index: i,
            value: y2 - y1,
            x: xScale(i),
            y1: yScale(y1),
            y2: yScale(y2),
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

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) =>
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
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
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
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
                        enableStackTooltip &&
                        <StreamSlices
                            slices={slices}
                            height={height}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            theme={theme}
                        />}
                </SvgWrapper>}
        </Container>
    )
}

Stream.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.array.isRequired,

    stack: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    order: stackOrderPropType.isRequired,
    offsetType: stackOffsetPropType.isRequired,
    curve: areaCurvePropType.isRequired,
    areaGenerator: PropTypes.func.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // theming
    colors: PropTypes.any.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,

    // stack tooltip
    enableStackTooltip: PropTypes.bool.isRequired,
}

export const StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    // axes & grid
    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    // theming
    colors: 'nivo',
    fillOpacity: 1,

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,
}

const enhance = compose(
    defaultProps(StreamDefaultProps),
    withTheme(),
    withCurve(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['curveInterpolator'], ({ curveInterpolator }) => ({
        areaGenerator: area()
            .x(({ x }) => x)
            .y0(({ y1 }) => y1)
            .y1(({ y2 }) => y2)
            .curve(curveInterpolator),
    })),
    withPropsOnChange(['colors'], ({ colors }) => ({
        getColor: getColorRange(colors),
    })),
    withPropsOnChange(['keys', 'offsetType', 'order'], ({ keys, offsetType, order }) => ({
        stack: d3Stack()
            .keys(keys)
            .offset(stackOffsetFromProp(offsetType))
            .order(stackOrderFromProp(order)),
    })),
    withPropsOnChange(['stack', 'data', 'width', 'height'], ({ stack, data, width, height }) => {
        const layers = stack(data)

        const minValue = stackMin(layers)
        const maxValue = stackMax(layers)

        return {
            layers,
            xScale: scalePoint().domain(range(data.length)).range([0, width]),
            yScale: scaleLinear().domain([minValue, maxValue]).range([height, 0]),
        }
    }),
    pure
)

export default enhance(Stream)
