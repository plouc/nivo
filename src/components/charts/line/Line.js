/*
 * This file is part of the nivo library.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes }     from 'react'
import _                                   from 'lodash'
import Nivo                                from '../../../Nivo'
import { margin as marginPropType }        from '../../../PropTypes'
import { getColorRange }                   from '../../../ColorUtils'
import { convertGetter }                   from '../../../lib/propertiesConverters'
import Axis                                from '../../axes/Axis'
import Grid                                from '../../axes/Grid'
import { curvePropMapping, curvePropType } from '../../../properties/curve'
import {
    scaleOrdinal,
    scaleLinear,
    scaleBand,
    scaleQuantize,
    scaleQuantile,
    scaleThreshold,
    scalePoint,
    stack,
    max,
    line as LineGenerator,
} from 'd3'


class Line extends Component {
    render() {
        const {
            data,
            keys,
            cumulative,
            identity: _identity,
            margin: _margin,
            width: _width, height: _height,
            curve,
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

        const x = scalePoint()
            .range([0, width])
            .domain(data.map(identity))

        const y = scaleLinear()
            .rangeRound([height, 0])

        const lines = []

        if (cumulative) {
            const series = stack().keys(keys)(data)

            y.domain([0, max(series[series.length - 1], d => d[1])])

            series.forEach(serie => {
                lines.push({
                    key:    serie.key,
                    points: serie.map(d => {
                        return {
                            x: x(identity(d.data)),
                            y: y(d[1]),
                        }
                    })
                })
            })
        } else {
            y.domain([0, max(data, d => max(_.values(_.pick(d, keys))))])

            keys.forEach(key => {
                lines.push({
                    key,
                    points: data.map(d => {
                        return {
                            x: x(identity(d)),
                            y: y(d[key]),
                        }
                    }),
                })
            })

        }

        const lineGenerator = LineGenerator()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curvePropMapping[curve])

        return (
            <svg className="nivo_bars" width={_width} height={_height}>
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
                    {lines.map(line => {
                        return (
                            <path
                                key={line.key}
                                d={lineGenerator(line.points)}
                                fill="none"
                                strokeWidth={2}
                                stroke={color(line.key)}
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

Line.propTypes = {
    // dimensions
    width:            PropTypes.number.isRequired,
    height:           PropTypes.number.isRequired,
    margin:           marginPropType,

    // data
    data:             PropTypes.arrayOf(PropTypes.object).isRequired,
    keys:             PropTypes.arrayOf(PropTypes.string).isRequired,
    cumulative:       PropTypes.bool.isRequired,
    identity:         PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]).isRequired,

    colors:           PropTypes.any.isRequired,

    curve:            curvePropType.isRequired,

    // axes
    xAxis:            PropTypes.bool.isRequired,
    xAxisOrientation: PropTypes.oneOf(['top', 'bottom']).isRequired,
    xAxisTickSize:    PropTypes.number,
    xAxisTickPadding: PropTypes.number,
    yAxis:            PropTypes.bool.isRequired,
    yAxisOrientation: PropTypes.oneOf(['left', 'right']).isRequired,
    yAxisTickSize:    PropTypes.number,
    yAxisTickPadding: PropTypes.number,

    // motion
    animate:          PropTypes.bool.isRequired,
    motionStiffness:  PropTypes.number.isRequired,
    motionDamping:    PropTypes.number.isRequired,
}

Line.defaultProps = {
    margin:           Nivo.defaults.margin,
    cumulative:       true,
    colors:           Nivo.defaults.colorRange,

    curve:            'linear',

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



export default Line
