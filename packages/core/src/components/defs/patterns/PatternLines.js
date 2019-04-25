/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { degreesToRadians } from '../../../lib/polar'

export const PatternLines = memo(
    ({ id, spacing: _spacing, rotation: _rotation, background, color, lineWidth }) => {
        let rotation = Math.round(_rotation) % 360
        const spacing = Math.abs(_spacing)

        if (rotation > 180) rotation = rotation - 360
        else if (rotation > 90) rotation = rotation - 180
        else if (rotation < -180) rotation = rotation + 360
        else if (rotation < -90) rotation = rotation + 180

        let width = spacing
        let height = spacing
        let path

        if (rotation === 0) {
            path = `
                M 0 0 L ${width} 0
                M 0 ${height} L ${width} ${height}
            `
        } else if (rotation === 90) {
            path = `
                M 0 0 L 0 ${height}
                M ${width} 0 L ${width} ${height}
            `
        } else {
            width = Math.abs(spacing / Math.sin(degreesToRadians(rotation)))
            height = spacing / Math.sin(degreesToRadians(90 - rotation))

            if (rotation > 0) {
                path = `
                    M 0 ${-height} L ${width * 2} ${height}
                    M ${-width} ${-height} L ${width} ${height}
                    M ${-width} 0 L ${width} ${height * 2}
                `
            } else {
                path = `
                    M ${-width} ${height} L ${width} ${-height}
                    M ${-width} ${height * 2} L ${width * 2} ${-height}
                    M 0 ${height * 2} L ${width * 2} 0
                `
            }
        }

        return (
            <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
                <rect
                    width={width}
                    height={height}
                    fill={background}
                    stroke="rgba(255, 0, 0, 0.1)"
                    strokeWidth={0}
                />
                <path d={path} strokeWidth={lineWidth} stroke={color} strokeLinecap="square" />
            </pattern>
        )
    }
)

PatternLines.displayName = 'PatternLines'
PatternLines.propTypes = {
    id: PropTypes.string.isRequired,
    spacing: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    lineWidth: PropTypes.number.isRequired,
}
PatternLines.defaultProps = {
    spacing: 5,
    rotation: 0,
    color: '#000000',
    background: '#ffffff',
    lineWidth: 2,
}

export const patternLinesDef = (id, options = {}) => ({
    id,
    type: 'patternLines',
    ...options,
})
