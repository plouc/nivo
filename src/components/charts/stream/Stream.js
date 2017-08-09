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
import Nivo, { defaultTheme } from '../../../Nivo'
import {
    marginPropType,
    motionPropTypes,
    areaCurvePropType,
    curveFromProp,
    stackOrderPropType,
    stackOrderFromProp,
    stackOffsetPropType,
    stackOffsetFromProp,
} from '../../../props'
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
    curve,

    // dimensions
    margin,
    width,
    height,
    fullWidth,
    fullHeight,

    // axes & grid
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    // theming
    theme,
    color,
    fillOpacity,

    // motion
    animate,
    motionStiffness,
    motionDamping,
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
        .curve(curveFromProp(curve))

    const enhancedLayers = layers.map((layer, i) => ({
        id: keys[i],
        layer,
        path: area(layer),
        color: color(i),
    }))

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <Container>
            {({ showTooltip, hideTooltip }) =>
                <SvgWrapper width={fullWidth} height={fullHeight} margin={margin}>
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
                        yScale={yScale.domain([0, Math.abs(minValue) + Math.abs(maxValue)])}
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

    // dimensions
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: marginPropType,

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
    color: PropTypes.func.isRequired,

    // motion
    ...motionPropTypes,
}

export const StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    // dimensions
    margin: Nivo.defaults.margin,

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
}

const enhance = compose(
    defaultProps(StreamDefaultProps),
    withPropsOnChange(['theme'], ({ theme }) => ({ theme: merge({}, defaultTheme, theme) })),
    withPropsOnChange(['colors'], ({ colors, colorBy }) => ({
        color: getColorRange(colors),
    })),
    withPropsOnChange(
        (props, nextProps) =>
            props.data !== nextProps.data ||
            props.stacked !== nextProps.stacked ||
            props.width !== nextProps.width ||
            props.height !== nextProps.height ||
            !isEqual(props.margin, nextProps.margin),
        ({ data, width: fullWidth, height: fullHeight, margin: _margin }) => {
            const margin = Object.assign({}, Nivo.defaults.margin, _margin)
            const width = fullWidth - margin.left - margin.right
            const height = fullHeight - margin.top - margin.bottom

            return {
                margin,
                width,
                height,
                fullWidth,
                fullHeight,
            }
        }
    ),
    pure
)

export default enhance(Stream)
