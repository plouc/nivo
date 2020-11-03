/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip, useTooltip } from '@nivo/tooltip'
import { PiePropTypes, datumWithArcPropType } from './props'

export const PieSlice = ({
    datum,
    path,
    color,
    fill,
    borderWidth,
    borderColor,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    tooltipFormat,
    tooltip,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleTooltip = e =>
        showTooltipFromEvent(
            <BasicTooltip
                id={datum.label || datum.id}
                value={datum.formattedValue}
                enableChip
                color={color}
                format={tooltipFormat}
                renderContent={
                    typeof tooltip === 'function' ? tooltip.bind(null, { color, ...datum }) : null
                }
            />,
            e
        )
    const handleMouseEnter = e => {
        onMouseEnter(datum, e)
        handleTooltip(e)
    }
    const handleMouseLeave = e => {
        onMouseLeave(datum, e)
        hideTooltip(e)
    }

    const handleClick = e => {
        if (!onClick) return

        onClick(datum, e)
    }

    return (
        <path
            d={path}
            fill={fill}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleTooltip : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

PieSlice.propTypes = {
    datum: datumWithArcPropType.isRequired,

    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    borderWidth: PiePropTypes.borderWidth,
    borderColor: PropTypes.string.isRequired,

    isInteractive: PiePropTypes.isInteractive,
    tooltipFormat: PiePropTypes.tooltipFormat,
    tooltip: PiePropTypes.tooltip,
    onClick: PiePropTypes.onClick,
    onMouseEnter: PiePropTypes.onMouseEnter,
    onMouseLeave: PiePropTypes.onMouseLeave,
}
