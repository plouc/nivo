import React, { PureComponent } from 'react'
import { BulletRectsItemProps } from './types'

export default class BulletRectsItem extends PureComponent<BulletRectsItemProps> {
    render() {
        const {
            x,
            y,
            width,
            height,
            color,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
            onClick,
        } = this.props

        return (
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={color}
                onMouseMove={onMouseMove}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
        )
    }
}
