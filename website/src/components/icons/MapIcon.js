/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ICON_SIZE } from './styled'

const size = ICON_SIZE
const line = 5

const outlinePath = `
    M${line / 2},${size * 0.2}
    L${size * 0.33},${size * 0.1}
    L${size * 0.66},${size * 0.2}
    L${size - line / 2},${size * 0.1}
    L${size - line / 2},${size * 0.8}
    L${size * 0.66},${size * 0.9}
    L${size * 0.33},${size * 0.8}
    L${line / 2},${size * 0.9}
    Z
`

const rects = [
    [0, 0, size * 0.5, size * 0.2],
    [0, size * 0.2, size * 0.5, size * 0.1],
    [size * 0.5, 0, size * 0.7, size * 0.3],
    [0, size * 0.3, size * 0.3, size * 0.1],
    [0, size * 0.4, size * 0.3, size * 0.2],
    [size * 0.3, size * 0.3, size * 0.4, size * 0.3],
    [size * 0.7, size * 0.3, size * 0.3, size * 0.3],
    [0, size * 0.6, size * 0.6, size * 0.2],
    [0, size * 0.8, size * 0.6, size * 0.2],
    [size * 0.6, size * 0.6, size * 0.4, size * 0.1],
    [size * 0.6, size * 0.7, size * 0.4, size * 0.3],
]

const MapIcon = ({ stroke, fill, colors = [] }) => {
    return (
        <svg width={size} height={size}>
            <mask id="choropleth-icon-mask">
                <path fill="white" d={outlinePath} />
            </mask>
            <path fill={fill} d={outlinePath} />
            <g mask="url(#choropleth-icon-mask)">
                <g
                    transform={`rotate(-45) scale(1.2)`}
                    style={{
                        transformOrigin: '50% 50%',
                    }}
                >
                    {rects.map((r, i) => {
                        return (
                            <rect
                                key={i}
                                fill={colors[i] || fill}
                                stroke={stroke}
                                strokeWidth={2}
                                x={r[0]}
                                y={r[1]}
                                width={r[2]}
                                height={r[3]}
                            />
                        )
                    })}
                </g>
            </g>
            <g
                style={{
                    mixBlendMode: 'multiply',
                    opacity: 0.6,
                }}
            >
                <path
                    fill={fill}
                    d={`
                        M${size * 0.33},${size * 0.1}
                        L${size * 0.66},${size * 0.2}
                        L${size * 0.66},${size * 0.9}
                        L${size * 0.33},${size * 0.8}
                        Z
                    `}
                />
                <circle fill={fill} r={size * 0.13} cx={size * 0.66} cy={size * 0.46} />
            </g>
            <path
                fill="none"
                stroke={stroke}
                strokeWidth={line}
                d={outlinePath}
                strokeLinejoin="bevel"
            />
            <circle
                fill={fill}
                stroke={stroke}
                strokeWidth={line}
                r={size * 0.1}
                cx={size * 0.66}
                cy={size * 0.41}
            />
        </svg>
    )
}

export default MapIcon
