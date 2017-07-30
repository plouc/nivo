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

class BarItem extends Component {
    render() {
        const { x, y, width, height, color } = this.props

        return (
            <rect
                className="nivo_bar_rect"
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: color,
                }}
            />
        )
    }
}

BarItem.propTypes = {
    //value:  PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
}

BarItem.defaultProps = {}

export default BarItem
