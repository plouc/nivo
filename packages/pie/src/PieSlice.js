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
    onMouseMove,
    onMouseLeave,
    tooltipFormat,
    tooltip,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleTooltip = useCallback(
        event =>
            showTooltipFromEvent(
                <PieTooltip datum={datum} tooltip={tooltip} tooltipFormat={tooltipFormat} />,
                event
            ),
        [showTooltipFromEvent, datum, tooltipFormat, tooltip]
    )

    const handleMouseEnter = useCallback(
        event => {
            onMouseEnter && onMouseEnter(datum, event)
            handleTooltip(event)
        },
        [onMouseEnter, handleTooltip, datum]
    )

    const handleMouseMove = useCallback(
        event => {
            onMouseMove && onMouseMove(datum, event)
            handleTooltip(event)
        },
        [onMouseMove, handleTooltip, datum]
    )

    const handleMouseLeave = useCallback(
        event => {
            onMouseLeave && onMouseLeave(datum, event)
            hideTooltip(event)
        },
        [onMouseLeave, hideTooltip, datum]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(datum, event)
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
            onMouseMove={isInteractive ? handleMouseMove : undefined}
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
    onMouseMove: PiePropTypes.onMouseMove,
    onMouseLeave: PiePropTypes.onMouseLeave,
}
