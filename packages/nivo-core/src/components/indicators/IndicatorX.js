/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

class IndicatorX extends PureComponent {
    render() {
        const {
            height,
            x, thickness, color,
            style
              } = this.props

        if (x === null) return null

        return (
            <line
                key={x}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke={color}
                strokeWidth={thickness}
                style={style}
            />
        )
    }
}

IndicatorX.propTypes = {
    height: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
}

IndicatorX.defaultProps = {
    thickness: 1,
    color: '#000000',
    style: {}
}

export default IndicatorX
