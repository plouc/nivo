import { memo } from 'react'
import { degreesToRadians } from '../../../lib/polar'
import { PatternLinesProps, PatternLinesSpec } from './types'

export const PatternLines = memo(
    ({
        id,
        spacing: _spacing = 0,
        rotation: _rotation = 0,
        background = '#000000',
        color = '#000000',
        lineWidth = 1,
    }: PatternLinesProps) => {
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

export const patternLinesDef = (id: string, options = {}) =>
    ({
        id,
        type: 'patternLines',
        ...options,
    } as PatternLinesSpec)
