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

export default class SymbolCircle extends PureComponent {
    static propTypes = {
        ...symbolPropTypes,
    }

    static defaultProps = {
        ...symbolDefaultProps,
    }

    render() {
        const { x, y, size, fill, borderWidth, borderColor } = this.props

        return (
            <circle
                r={size / 2}
                cx={x + size / 2}
                cy={y + size / 2}
                fill={fill}
                strokeWidth={borderWidth}
                stroke={borderColor}
                style={{
                    pointerEvents: 'none',
                }}
            />
        )
    }
}
