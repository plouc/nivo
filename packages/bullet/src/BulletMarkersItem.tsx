import React, { PureComponent } from 'react'
import { BulletMarkersItemProps } from './types'

export default class BulletMarkersItem extends PureComponent<BulletMarkersItemProps> {
    render() {
        const {
            x,
            y,
            size,
            rotation,
            color,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
            onClick,
        } = this.props

        return (
            <line
                transform={`rotate(${rotation}, ${x}, ${y})`}
                x1={x}
                x2={x}
                y1={y - size / 2}
                y2={y + size / 2}
                fill="none"
                stroke={color}
                strokeWidth="5"
                onMouseMove={onMouseMove}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
        )
    }
}
