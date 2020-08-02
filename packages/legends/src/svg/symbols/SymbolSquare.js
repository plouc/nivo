/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import { symbolPropTypes, symbolDefaultProps } from './props'

export default class SymbolSquare extends PureComponent {
    static propTypes = {
        ...symbolPropTypes,
    }

    static defaultProps = {
        ...symbolDefaultProps,
    }

    render() {
        const { x, y, size, fill, borderWidth, borderColor } = this.props

        return (
            <rect
                x={x}
                y={y}
                fill={fill}
                strokeWidth={borderWidth}
                stroke={borderColor}
                width={size}
                height={size}
                style={{
                    pointerEvents: 'none',
                }}
            />
        )
    }
}
