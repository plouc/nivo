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

export default class BulletRectsItem extends PureComponent {
    static propTypes = {
        index: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        data: PropTypes.shape({
            v0: PropTypes.number.isRequired,
            v1: PropTypes.number.isRequired,
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
