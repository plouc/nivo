/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import Nivo                            from '../../../Nivo'
import { margin as marginPropType }    from '../../../PropTypes'
import { getColorRange }               from '../../../ColorUtils'
import { convertGetter }               from '../../../lib/propertiesConverters'
import Axis                            from '../../axes/Axis'
import Grid                            from '../../axes/Grid'
import {
    scaleBand,
    scaleLinear,
    stack,
    max,
} from 'd3'


class Bars extends Component {
    render() {
        const {
            data,
            keys,
            groupMode,
            identity: _identity,
            margin: _margin,
            width: _width, height: _height,
            spacing,
            colors,
            xAxis, xAxisOrientation, xAxisTickSize, xAxisTickPadding,
            yAxis, yAxisOrientation, yAxisTickSize, yAxisTickPadding,
            animate,
            motionStiffness, motionDamping,
        } = this.props

        const identity = convertGetter(_identity)

        const margin   = Object.assign({}, Nivo.defaults.margin, _margin)
        const width    = _width  - margin.left - margin.right
        const height   = _height - margin.top - margin.bottom

        const color    = getColorRange(colors)

        const x = scaleBand()
            .rangeRound([0, width])
            .padding(spacing)

        const y = scaleLinear()
            .rangeRound([height, 0])

        x.domain(data.map(identity))

        const rects = []

        if (groupMode === 'stacked') {
            const series = stack().keys(keys)(data)

            y.domain([0, max(series[series.length - 1], d => d[1])])

            series.forEach(serie => {
                serie.forEach(d => {
                    rects.push({
                        key:    `${serie.key}.${identity(d.data)}`,
                        x:      x(identity(d.data)),
                        y:      y(d[1]),
                        width:  x.bandwidth(),
                        height: y(d[0]) - y(d[1]),
                        color:  color(serie.key),
                    })
                })
            })
        } else {
            y.domain([0, max(data, d => max(_.values(_.pick(d, keys))))])

            const barWidth = x.bandwidth() / keys.length

            data.forEach(bucket => {
                let index = 0
                _.forOwn(_.pick(bucket, keys), (value, key) => {
                    rects.push({
                        key:    `${key}.${identity(bucket)}`,
                        x:      x(identity(bucket)) + barWidth * index,
                        y:      y(value),
                        width:  barWidth,
                        height: height - y(value),
                        color:  color(key),
                    })
                    index++
                })
            })
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="nivo_bars" width={_width} height={_height}>
                <g
                    className="nivo_bars_wrapper"
                    transform={`translate(${margin.left},${margin.top})`}
                >
                    <Grid
                        width={width}
                        height={height}
                        xScale={x}
                        yScale={y}
                        animate={animate}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                    {rects.map(d => {
                        return (
                            <rect
                                key={d.key}
                                {..._.pick(d, ['x', 'y', 'width', 'height'])}
                                style={{
                                    fill: d.color,
                                }}
                            />
                        )
                    })}
                    {xAxis && (
                        <g transform={`translate(0,${xAxisOrientation === 'bottom' ? height : 0})`}>
                            <Axis
                                orient={xAxisOrientation}
                                scale={x}
                                tickSize={xAxisTickSize}
                                tickPadding={xAxisTickPadding}
                                animate={animate}
                                motionStiffness={motionStiffness}
                                motionDamping={motionDamping}
                            />
                        </g>
                    )}
                    {yAxis && (
                        <g transform={`translate(${yAxisOrientation === 'right' ? width : 0},0)`}>
                            <Axis
                                orient={yAxisOrientation}
                                scale={y}
                                tickSize={yAxisTickSize}
                                tickPadding={yAxisTickPadding}
                                animate={animate}
                                motionStiffness={motionStiffness}
                                motionDamping={motionDamping}
                            />
                        </g>
                    )}
                </g>
            </svg>
        )
    }
}

const { number, bool, string, func, any, object, oneOf, oneOfType, arrayOf, shape } = PropTypes

Bars.propTypes = {
    width:            number.isRequired,
    height:           number.isRequired,
    margin:           marginPropType,
    data:             arrayOf(object).isRequired,
    keys:             arrayOf(string).isRequired,
    identity:         oneOfType([string, func]).isRequired,
    groupMode:        oneOf(['stacked', 'grouped']).isRequired,
    spacing:          number,
    colors:           any.isRequired,

    // axes
    xAxis:            bool.isRequired,
    xAxisOrientation: oneOf(['top', 'bottom']).isRequired,
    xAxisTickSize:    number,
    xAxisTickPadding: number,
    yAxis:            bool.isRequired,
    yAxisOrientation: oneOf(['left', 'right']).isRequired,
    yAxisTickSize:    number,
    yAxisTickPadding: number,

    // motion
    animate:          PropTypes.bool.isRequired,
    motionStiffness:  PropTypes.number.isRequired,
    motionDamping:    PropTypes.number.isRequired,
}

Bars.defaultProps = {
    margin:           Nivo.defaults.margin,
    groupMode:        'stacked',
    spacing:          0.1,
    colors:           Nivo.defaults.colorRange,

    // axes
    xAxis:            true,
    xAxisOrientation: 'bottom',
    yAxis:            true,
    yAxisOrientation: 'left',

    // motion
    animate:          true,
    motionStiffness:  Nivo.defaults.motionStiffness,
    motionDamping:    Nivo.defaults.motionDamping,
}



export default Bars
