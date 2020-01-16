/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { SVGAttributes, useMemo } from 'react'
import { range } from 'lodash'
import { positionFromAngle, useTheme } from '@nivo/core'
import { RadarSlice } from './hooks'
import { RadarGridLabels, RadarGridLabelComponent } from './RadarGridLabels'
import { RadarGridLevels } from './RadarGridLevels'

export type RadarGridShape = 'circular' | 'linear'

export interface RadarGridProps {
    slices: RadarSlice[]
    levels: number
    shape: RadarGridShape
    radius: number
    angleStep: number
    labelComponent?: RadarGridLabelComponent
    labelOffset: number
}

export const RadarGrid = ({
    slices,
    levels,
    shape,
    radius,
    angleStep,
    labelComponent,
    labelOffset,
}: RadarGridProps) => {
    const theme = useTheme()
    const radii = useMemo(
        () =>
            range(levels)
                .map(i => (radius / levels) * (i + 1))
                .reverse(),
        [radius, levels]
    )

    return (
        <g>
            {slices.map(slice => {
                const position = positionFromAngle(slice.angle, radius)

                return (
                    <line
                        key={slice.index}
                        x1={0}
                        y1={0}
                        x2={position.x}
                        y2={position.y}
                        {...(theme.grid.line as SVGAttributes<SVGLineElement>)}
                    />
                )
            })}
            <RadarGridLevels
                shape={shape}
                radii={radii}
                angleStep={angleStep}
                dataLength={slices.length}
            />
            <RadarGridLabels
                slices={slices}
                radius={radius}
                labelOffset={labelOffset}
                labelComponent={labelComponent}
            />
        </g>
    )
}
