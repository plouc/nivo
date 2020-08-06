/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { Point } from './hooks'

export interface PointTooltipProps {
    point: Point
}

export default function LinePointTooltip({ point }: PointTooltipProps) {
    return (
        <BasicTooltip
            id={
                <span>
                    x: <strong>{point.data.xFormatted}</strong>, y:{' '}
                    <strong>{point.data.yFormatted}</strong>
                </span>
            }
            enableChip={true}
            color={point.serieColor}
        />
    )
}
