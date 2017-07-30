/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Nivo from '../../../Nivo'
import { getColorRange } from '../../../ColorUtils'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

export default class Bars extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        colors: PropTypes.any.isRequired,
        scales: PropTypes.object,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
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
            height,
            colors,
            x: _x,
            y: _y,
        } = this.props

        const xScale = scales[_xScale]
        const yScale = scales[_yScale]

        const getXValue = getAccessorFor(_x)
        const getYValue = getAccessorFor(_y)

        const getColor = getColorRange(colors)

        const rects = []
        data.forEach((d, i) => {
            let x
            let y
            let barWidth
            let barHeight

            const xValue = getXValue(d)
            const yValue = getYValue(d)

            if (xScale.bandwidth) {
                barWidth = xScale.bandwidth()
                x = xScale(xValue)
            } else {
                x = 0
                barWidth = xScale(xValue)
            }

            if (yScale.bandwidth) {
                barHeight = yScale.bandwidth()
                y = yScale(getYValue(d))
            } else {
                if (Array.isArray(yValue)) {
                    y = yScale(yValue[1])
                    barHeight = yScale(yValue[0]) - y
                } else {
                    y = yScale(yValue)
                    barHeight = height - y
                }
            }

            if (barWidth > 0 && barHeight > 0) {
                rects.push({
                    key: `bar.${i}`,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: getColor(d),
                })
            }
        })

        return (
            <g className="bars">
                {rects.map(d => <BarItem {...d} key={d.key} />)}
            </g>
        )
    }
}
