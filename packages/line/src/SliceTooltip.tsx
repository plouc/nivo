/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { TableTooltip } from '@nivo/tooltip'
import { Slice } from './hooks'

interface ChipProps {
    color: string
}

const Chip = ({ color }: ChipProps) => (
    <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />
)

export interface SliceTooltipProps {
    axis: 'x' | 'y'
    slice: Slice
}

export default function SliceTooltip({ slice, axis }: SliceTooltipProps) {
    const otherAxis = axis === 'x' ? 'y' : 'x'

    return (
        <TableTooltip
            rows={slice.points.map(point => [
                <Chip key="chip" color={point.serieColor} />,
                point.serieId,
                <strong key="value">{point.data[`${otherAxis}Formatted`]}</strong>,
            ])}
        />
    )
}
