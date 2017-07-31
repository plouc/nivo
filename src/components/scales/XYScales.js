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
import d3 from 'd3'

class XYScales extends Component {
    render() {
        const {
            data,
            identityAccessor,
            valueAccessor,
            width,
            height,
            children,
        } = this.props

        if (React.Children.count(children) === 0) {
            return null
        }

        const xScale = d3.scale
            .linear()
            .range([0, width])
            .domain([0, data.length - 1])

        const yScale = d3.scale
            .linear()
            .range([height, 0])
            .domain([0, d3.max(data.map(valueAccessor))])

        return (
            <g>
                {React.Children.map(children, child =>
                    React.cloneElement(child, {
                        data: data.slice(),
                        xScale,
                        yScale,
                        width,
                        height,
                    })
                )}
            </g>
        )
    }
}

XYScales.displayName = 'XYScales'

const { array, func, number } = PropTypes

XYScales.propTypes = {
    data: array.isRequired,
    identityAccessor: func.isRequired,
    valueAccessor: func.isRequired,
    width: number,
    height: number,
}

XYScales.defaultProps = {
    identityAccessor: (d, i) => i,
    valueAccessor: d => d,
}

export default XYScales
