/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { degreesToRadians } from '../../../lib/polar'

export interface PatternLinesSpec {
    id: string
    type: 'patternLines'
    spacing?: number
    rotation?: number
    background?: string
    color?: string
    lineWidth?: number
}

export const patternLinesDefaults = {
    spacing: 5,
    rotation: 0,
    background: '#ffffff',
    color: '#000000',
    lineWidth: 2,
}

export const PatternLines = ({
    id,
    spacing: _spacing = patternLinesDefaults.spacing,
    rotation: _rotation = patternLinesDefaults.rotation,
    background = patternLinesDefaults.background,
    color = patternLinesDefaults.color,
    lineWidth = patternLinesDefaults.lineWidth,
}: PatternLinesSpec) => {
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

export const patternLinesDef = (
    id: PatternLinesSpec['id'],
    options: Omit<PatternLinesSpec, 'id' | 'type'> = {}
): PatternLinesSpec => ({
    id,
    type: 'patternLines',
    ...options,
})
