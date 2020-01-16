/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Arc } from 'd3-shape'
import { RadarSlice } from './hooks'
import { RadarTooltipSensorsItem } from './RadarTooltipSensorsItem'

export interface RadarTooltipSensorsProps {
    slices: RadarSlice[]
    sliceGenerator: Arc<any, RadarSlice>
    radius: number
    tooltipFormat?: any // PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export function RadarTooltipSensors({
    slices,
    sliceGenerator,
    radius,
    tooltipFormat,
}: RadarTooltipSensorsProps) {
    return (
        <g>
            {slices.map(slice => (
                <RadarTooltipSensorsItem
                    key={slice.index}
                    slice={slice}
                    radius={radius}
                    sliceGenerator={sliceGenerator}
                    tooltipFormat={tooltipFormat}
                />
            ))}
        </g>
    )
}
