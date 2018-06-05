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

export default class SymbolSquare extends PureComponent {
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
            <rect
                x={x}
                y={y}
                fill={fill}
                width={size}
                height={size}
                style={style}
                stroke={borderColor}
                strokeWidth={borderWidth}
            />
        )
    }
}
