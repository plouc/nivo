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
import { merge, isEqual, min, max, range } from 'lodash'
import { stack as d3Stack, area as d3Area } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import Nivo from '../../../Nivo'
import {
    marginPropType,
    motionPropTypes,
    areaCurvePropType,
    stackOrderPropType,
    stackOrderFromProp,
    stackOffsetPropType,
    stackOffsetFromProp,
} from '../../../props'
import { withTheme, withCurve, withMargin } from '../../../hocs'
import { getColorRange } from '../../../lib/colorUtils'
import SvgWrapper from '../SvgWrapper'
import Container from '../Container'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import StreamLayers from './StreamLayers'

const stackMin = layers => min(layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[0])], []))
const stackMax = layers => max(layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[1])], []))

const Stream = ({
    data,
    keys,

    order,
    offsetType,
    curveInterpolator,

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
}) => {
    const stack = d3Stack()
        .keys(keys)
        .offset(stackOffsetFromProp(offsetType))
        .order(stackOrderFromProp(order))

    const layers = stack(data)

    const minValue = stackMin(layers)
    const maxValue = stackMax(layers)

    const xScale = scalePoint().domain(range(data.length)).range([0, width])
    const yScale = scaleLinear().domain([minValue, maxValue]).range([height, 0])

    const area = d3Area()
        .x((d, i) => xScale(i))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(curveInterpolator)

    const enhancedLayers = layers.map((layer, i) => ({
        id: keys[i],
        layer,
        path: area(layer),
        color: getColor(i),
    }))

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <Container isInteractive={isInteractive}>
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
                        area={area}
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
                </SvgWrapper>}
        </Container>
    )
}

Stream.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.array.isRequired,

    order: stackOrderPropType.isRequired,
    offsetType: stackOffsetPropType.isRequired,
    curve: areaCurvePropType.isRequired,
    curveInterpolator: PropTypes.func.isRequired,

    // dimensions
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: marginPropType,
    outerWidth: PropTypes.number.isRequired,
    outerHeight: PropTypes.number.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // theming
    theme: PropTypes.object.isRequired,
    colors: PropTypes.any.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired,

    // motion
    ...motionPropTypes,

    // interactivity
    isInteractive: PropTypes.bool,
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
    theme: {},
    colors: 'nivo',
    fillOpacity: 1,

    // motion
    animate: true,
    motionStiffness: Nivo.defaults.motionStiffness,
    motionDamping: Nivo.defaults.motionDamping,

    // interactivity
    isInteractive: true,
}

const enhance = compose(
    defaultProps(StreamDefaultProps),
    withTheme(),
    withCurve(),
    withMargin(),
    withPropsOnChange(['colors'], ({ colors }) => ({
        getColor: getColorRange(colors),
    })),
    pure
)

export default enhance(Stream)
