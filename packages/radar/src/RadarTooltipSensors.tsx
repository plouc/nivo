/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import { arc as d3Arc } from 'd3-shape'
import { RadarSlice } from './hooks'
import { RadarTooltipSensorsItem } from './RadarTooltipSensorsItem'

export interface RadarTooltipSensorsProps {
    slices: RadarSlice[]
    radius: number
    tooltipFormat?: any // PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export function RadarTooltipSensors({ slices, radius, tooltipFormat }: RadarTooltipSensorsProps) {
    const arc = useMemo(
        () =>
            d3Arc<any, RadarSlice>()
                .outerRadius(radius)
                .innerRadius(0)
                .startAngle(d => d.startAngle + Math.PI / 2)
                .endAngle(d => d.endAngle + Math.PI / 2),
        [radius]
    )

    return (
        <g>
            {slices.map(slice => (
                <RadarTooltipSensorsItem
                    key={slice.index}
                    slice={slice}
                    radius={radius}
                    arcGenerator={arc}
                    tooltipFormat={tooltipFormat}
                />
            ))}
        </g>
    )
}
