/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import d3 from 'd3'

class AxisY extends Component {
    renderD3(props) {
        const {
            yScale,
            tickCount,
            tickFormat,
            orient,
            tickMode,
            tickPadding,
            width,
            transitionDuration,
            transitionEasing,
        } = props

        const element = d3.select(findDOMNode(this))

        const axis = d3.svg
            .axis()
            .scale(yScale)
            .tickPadding(tickPadding)
            .orient(orient)
            .tickFormat(d3.format('s'))

        if (tickCount >= 0) {
            axis.ticks(tickCount)
        }

        if (tickFormat) {
            axis.tickFormat(d3.format(tickFormat))
        }

        if (tickMode === 'grid') {
            axis.tickSize(-width)
        }

        element
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .call(axis)

        return false
    }

    componentDidMount() {
        this.renderD3(this.props)
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps)

        return false
    }

    render() {
        return <g className="chart__axis chart__axis--y" />
    }
}

AxisY.displayName = 'AxisY'

AxisY.propTypes = {
    orient: PropTypes.oneOf(['left', 'right']).isRequired,
    yScale: PropTypes.func.isRequired,
    tickCount: PropTypes.number.isRequired,
    tickMode: PropTypes.oneOf(['normal', 'grid']).isRequired,
    tickPadding: PropTypes.number.isRequired,
}

AxisY.defaultProps = {
    orient: 'left',
    transitionDuration: 600,
    transitionEasing: 'cubic-out',
    tickCount: -1,
    tickMode: 'normal',
    tickPadding: 3,
}

export default AxisY
