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

class IndicatorXY extends PureComponent {
    render() {
        const {
            width,
            height,
            x, y, color, style
              } = this.props

        if (x === null || y === null) return null

        return (
            <Fragment>
                <line
                    key={x}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={height}
                    stroke={color}
                    style={style}
                />
                <line
                    key={y}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={color}
                    style={style}
                />
            </Fragment>
        )
    }
}

IndicatorXY.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
}

IndicatorXY.defaultProps = {
    color: '#000000',
    style: {}
}

export default IndicatorXY
