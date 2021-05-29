/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTooltip } from '@nivo/tooltip'
import CalendarTooltip from './CalendarTooltip'

const TimeRangeDay = memo(
    ({
        data,
        x,
        ry = 5,
        rx = 5,
        y,
        width,
        height,
        color,
        borderWidth,
        borderColor,
        isInteractive,
        tooltip = CalendarTooltip,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        formatValue,
    }) => {
        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        const handleMouseEnter = useCallback(
            event => {
                const formatedData = {
                    ...data,
                    value: formatValue(data.value),
                    data: { ...data.data },
                }
                showTooltipFromEvent(React.createElement(tooltip, { ...formatedData }), event)
                onMouseEnter && onMouseEnter(data, event)
            },
            [showTooltipFromEvent, tooltip, data, onMouseEnter, formatValue]
        )
        const handleMouseMove = useCallback(
            event => {
                const formatedData = {
                    ...data,
                    value: formatValue(data.value),
                    data: { ...data.data },
                }
                showTooltipFromEvent(React.createElement(tooltip, { ...formatedData }), event)
                onMouseMove && onMouseMove(data, event)
            },
            [showTooltipFromEvent, tooltip, data, onMouseMove, formatValue]
        )
        const handleMouseLeave = useCallback(
            event => {
                hideTooltip()
                onMouseLeave && onMouseLeave(data, event)
            },
            [isInteractive, hideTooltip, data, onMouseLeave]
        )
        const handleClick = useCallback(event => onClick && onClick(data, event), [
            isInteractive,
            data,
            onClick,
        ])
        return (
            <rect
                x={x}
                y={y}
                rx={rx}
                ry={ry}
                width={width}
                height={height}
                style={{
                    fill: color,
                    strokeWidth: borderWidth,
                    stroke: borderColor,
                }}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleMouseMove : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
            />
        )
    }
)

TimeRangeDay.displayName = 'TimeRangeDay'
TimeRangeDay.propTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseMove: PropTypes.func,
    data: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    formatValue: PropTypes.func,

    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

export default TimeRangeDay
