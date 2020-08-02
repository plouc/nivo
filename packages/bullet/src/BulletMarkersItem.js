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

export default class BulletMarkersItem extends PureComponent {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        rotation: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        data: PropTypes.shape({
            index: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        }).isRequired,
        onMouseEnter: PropTypes.func.isRequired,
        onMouseMove: PropTypes.func.isRequired,
        onMouseLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
    }

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
