/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { TableTooltip, useTheme, useValueFormatter, useTooltip } from '@nivo/core'

const Chip = ({ color }) => (
    <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />
)

Chip.propTypes = {
    color: PropTypes.string.isRequired,
}

const SliceTooltip = ({ slice, formatValue }) => {
    return (
        <TableTooltip
            rows={slice.data
                .filter(d => d.position.x !== null && d.position.y !== null)
                .map(d => [<Chip color={d.serie.color} />, d.serie.id, formatValue(d.data.y)])}
        />
    )
}

const LineSlicesItem = ({ slice, height, tooltip, tooltipFormat }) => {
    const theme = useTheme()
    const formatValue = useValueFormatter(tooltipFormat)
    const [showTooltip, hideTooltip] = useTooltip()
    const [isHover, setIsHover] = useState(false)
    const hasValues = slice.data.some(d => d.position.x !== null && d.position.y !== null)

    const handleMouseEnter = useCallback(
        event => {
            showTooltip(React.createElement(tooltip, { slice, formatValue }), event)
            setIsHover(true)
        },
        [slice, formatValue]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltip(React.createElement(tooltip, { slice, formatValue }), event)
        },
        [slice, formatValue]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
        setIsHover(false)
    }, [hideTooltip])

    if (!hasValues) return null

    return (
        <g transform={`translate(${slice.x}, 0)`}>
            {isHover && (
                <line x1={0} x2={0} y1={0} y2={height} fill="none" style={theme.crosshair.line} />
            )}
            <rect
                x={-20}
                width={40}
                height={height}
                fill="#F00"
                fillOpacity={0}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
        </g>
    )
}

LineSlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}
LineSlicesItem.defaultProps = {
    tooltip: SliceTooltip,
}

export default LineSlicesItem
