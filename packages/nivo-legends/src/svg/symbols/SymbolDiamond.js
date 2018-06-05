/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const style = {
    pointerEvents: 'none',
}

export default class SymbolDiamond extends PureComponent {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
    }

    static defaultProps = {
        borderWidth: 0,
    }

    render() {
        const { x, y, size, fill, borderWidth, borderColor } = this.props

        return (
            <g transform={`translate(${x},${y})`}>
                <path
                    fill={fill}
                    stroke={borderColor}
                    strokeWidth={borderWidth}
                    d={`
                    M${size / 2} 0
                    L${size * 0.8} ${size / 2}
                    L${size / 2} ${size}
                    L${size * 0.2} ${size / 2}
                    L${size / 2} 0
                `}
                    style={style}
                />
            </g>
        )
    }
}
