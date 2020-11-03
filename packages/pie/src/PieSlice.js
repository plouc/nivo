/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTooltip } from '@nivo/tooltip'
import { PiePropTypes, datumWithArcPropType } from './props'
import { PieTooltip } from './PieTooltip'

export const PieSlice = ({
    datum,
    path,
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

    const handleTooltip = useCallback(
        e =>
            showTooltipFromEvent(
                <PieTooltip datum={datum} tooltip={tooltip} tooltipFormat={tooltipFormat} />,
                e
            ),
        [showTooltipFromEvent, datum, tooltipFormat, tooltip]
    )

    const handleMouseEnter = useCallback(
        e => {
            onMouseEnter && onMouseEnter(datum, e)
            handleTooltip(e)
        },
        [onMouseEnter, handleTooltip, datum]
    )

    const handleMouseLeave = useCallback(
        e => {
            onMouseLeave && onMouseLeave(datum, e)
            hideTooltip(e)
        },
        [onMouseLeave, hideTooltip, datum]
    )

    const handleClick = useCallback(
        e => {
            onClick && onClick(datum, e)
        },
        [onClick, datum]
    )

    return (
        <path
            d={path}
            fill={datum.fill || datum.color}
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
    borderWidth: PiePropTypes.borderWidth,
    borderColor: PropTypes.string.isRequired,

    isInteractive: PiePropTypes.isInteractive,
    tooltipFormat: PiePropTypes.tooltipFormat,
    tooltip: PiePropTypes.tooltip,
    onClick: PiePropTypes.onClick,
    onMouseEnter: PiePropTypes.onMouseEnter,
    onMouseLeave: PiePropTypes.onMouseLeave,
}
