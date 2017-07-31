/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Nivo from '../../../Nivo'
import { getColorRange } from '../../../ColorUtils'
import { convertGetter } from '../../../lib/propertiesConverters'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

export default class Markers extends Component {
    static propTypes = {
        colors: PropTypes.any.isRequired,
        scales: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
        // labels
        enableLabels: PropTypes.bool.isRequired,
        // motion
        animate: PropTypes.bool.isRequired,
        motionStiffness: PropTypes.number.isRequired,
        motionDamping: PropTypes.number.isRequired,
    }

    static defaultProps = {
        colors: Nivo.defaults.colorRange,
        // labels
        enableLabels: true,
        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            data,
            scales,
            xScale: _xScale,
            yScale: _yScale,
            width,
            height,
            color,
            x,
            y,
        } = this.props

        const xScale = scales[_xScale]
        const yScale = scales[_yScale]

        const getX = _.isFunction(x) ? x : d => d[x]
        const getY = _.isFunction(y) ? y : d => d[y]

        const rects = []
        data.forEach((d, i) => {
            let x
            let y
            let barWidth
            let barHeight

            if (xScale.bandwidth) {
                barWidth = xScale.bandwidth() // / series.length
                x = xScale(getX(d)) // + barWidth * serieIndex
            } else {
                x = 0
                barWidth = xScale(getX(d))
            }

            if (yScale.bandwidth) {
                barHeight = yScale.bandwidth() // / series.length
                y = yScale(getY(d)) // + barHeight * serieIndex
            } else {
                y = yScale(getY(d))
                barHeight = height - y
            }

            if (barWidth > 0 && barHeight > 0) {
                rects.push({
                    key: `bar.${i}`,
                    //value,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: color, //'#fff', //color(serieIndex),
                })
            }
        })

        return (
            <g className="bars">
                {rects.map(d => <BarItem {...d} key={d.key} />)}
            </g>
        )
        /*
        const {
            data,
            groupMode,
            identity: _identity,
            margin: _margin,
            width: _width, height: _height,
            colors,
            scales: _scales,
            series,
            axes,
            enableGridX, enableGridY,
            enableLabels,
            animate, motionStiffness, motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width  = _width  - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const color  = getColorRange(colors)

        const rects = []
        series.forEach((serie, serieIndex) => {
            const xScale = scales[serie.xScale]
            const yScale = scales[serie.yScale]

            const getX = _.isFunction(serie.x) ? serie.x : d => d[serie.x]
            const getY = _.isFunction(serie.y) ? serie.y : d => d[serie.y]

            data.forEach((d, i) => {
                let x
                let y
                let barWidth
                let barHeight

                if (xScale.bandwidth) {
                    barWidth = xScale.bandwidth() / series.length
                    x        = xScale(getX(d)) + barWidth * serieIndex
                } else {
                    x        = 0
                    barWidth = xScale(getX(d))
                }

                if (yScale.bandwidth) {
                    barHeight = yScale.bandwidth() / series.length
                    y         = yScale(getY(d)) + barHeight * serieIndex
                } else {
                    y         = yScale(getY(d))
                    barHeight = height - y
                }

                if (barWidth > 0 && barHeight > 0) {
                    rects.push({
                        key:    `${serieIndex}.${i}`,
                        //value,
                        x, y,
                        width:  barWidth,
                        height: barHeight,
                        color:  color(serieIndex),
                    })
                }
            })
        })

        /*
        if (groupMode === 'stacked') {
            const series = stack().keys(keys)(data)

            y.domain([0, max(series[series.length - 1], d => d[1])])

            series.forEach(serie => {
                serie.forEach(d => {
                    rects.push({
                        key:    `${serie.key}.${identity(d.data)}`,
                        value:  d[1],
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
                        value,
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

        const { props } = this

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="nivo_bar" width={_width} height={_height}>
                <g
                    className="nivo_bar_wrapper"
                    transform={`translate(${margin.left},${margin.top})`}
                >
                    {rects.map(d => {
                        return (
                            <BarItem {...d} key={d.key} />
                        )
                    })}
                    {enableLabels && rects.map(d => {
                        return (
                            <BarItemLabel {...d} key={d.key} />
                        )
                    })}
                    {['top', 'right', 'bottom', 'left'].map(orient => {
                        return getAxis(axes, scales, orient, width, height, props)
                    })}
                </g>
            </svg>
        )
         */
    }
}
