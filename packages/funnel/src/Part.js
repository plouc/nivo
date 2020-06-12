/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

export const Part = ({ part, areaGenerator, borderGenerator }) => {
    return (
        <g>
            {part.borderWidth > 0 && (
                <path
                    d={borderGenerator(part.borderPoints)}
                    stroke={part.borderColor}
                    strokeWidth={part.borderWidth}
                    strokeOpacity={part.borderOpacity}
                    fill="none"
                />
            )}
            <path
                d={areaGenerator(part.areaPoints)}
                fill={part.color}
                fillOpacity={part.fillOpacity}
            />
            <g transform={`translate(${part.x}, ${part.y})`}>
                <text textAnchor="middle">{part.formattedValue}</text>
            </g>
        </g>
    )
}
