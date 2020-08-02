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

const CalendarDay = memo(
    ({
        data,
        x,
        y,
        size,
        color,
        borderWidth,
        borderColor,
        isInteractive,
        tooltip,
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
                width={size}
                height={size}
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

CalendarDay.displayName = 'CalendarDay'
CalendarDay.propTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseMove: PropTypes.func,
    data: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
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

export default CalendarDay
