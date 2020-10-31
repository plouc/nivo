/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useState, useCallback } from 'react'
import { format as d3Format } from 'd3-format'
import { positionFromAngle, useTheme } from '@nivo/core'
import { TableTooltip, Chip, useTooltip } from '@nivo/tooltip'
import { RadarSlice } from './hooks'
import { Arc } from 'd3-shape'

export interface RadarTooltipSensorsItemProps {
    slice: RadarSlice
    sliceGenerator: Arc<any, RadarSlice>
    radius: number
    tooltipFormat?: any // PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export function RadarTooltipSensorsItem({
    slice,
    sliceGenerator,
    radius,
    tooltipFormat,
}: RadarTooltipSensorsItemProps) {
    const [isHover, setIsHover] = useState(false)
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip() as any

    const tooltip = useMemo(() => {
        const format =
            !tooltipFormat || typeof tooltipFormat === 'function'
                ? tooltipFormat
                : d3Format(tooltipFormat)

        return (
            <TableTooltip
                title={<strong>{slice.index}</strong>}
                rows={slice.data.map(datum => [
                    <Chip key={datum.id} color={datum.color} />,
                    datum.id,
                    format ? format(datum.value) : datum.value,
                ])}
            />
        )
    }, [slice, tooltipFormat])

    const showItemTooltip = useCallback(
        event => {
            setIsHover(true)
            showTooltipFromEvent(tooltip, event)
        },
        [showTooltipFromEvent, tooltip]
    )

    const hideItemTooltip = useCallback(() => {
        setIsHover(false)
        hideTooltip()
    }, [hideTooltip, setIsHover])

    const { path, tipX, tipY } = useMemo(() => {
        const position = positionFromAngle(slice.angle, radius)

        return {
            path: sliceGenerator(slice) as string,
            tipX: position.x,
            tipY: position.y,
        }
    }, [slice, radius, sliceGenerator])

    return (
        <>
            {isHover && <line x1={0} y1={0} x2={tipX} y2={tipY} style={theme.crosshair.line} />}
            <path
                d={path}
                fill="#F00"
                fillOpacity={0}
                onMouseEnter={showItemTooltip}
                onMouseMove={showItemTooltip}
                onMouseLeave={hideItemTooltip}
            />
        </>
    )
}
