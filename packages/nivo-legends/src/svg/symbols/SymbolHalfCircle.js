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

export default class SymbolHalfCircle extends PureComponent {
    static propTypes = {
        direction: PropTypes.oneOf(['upward', 'downward']).isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
    }

    static defaultProps = {
        borderWidth: 0,
        direction: 'upward',
    }

    render() {
        const { x, y, size, fill, borderWidth, borderColor, direction } = this.props

        let translateY = y + size * 0.75
        let arcDirection = '1,0'
        if (direction === 'downward') {
            translateY = y
            arcDirection = '0,1'
        }

        return (
            <g transform={`translate(${x},${translateY})`}>
                <path
                    d={`
                        M0,0
                        L${size},0
                        A${size / 2},${size / 2} 1 ${arcDirection}
                        0,0 z
                    `}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    fill={fill}
                    style={style}
                />
            </g>
        )
    }
}
