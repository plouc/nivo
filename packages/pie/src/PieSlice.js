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
import { arcPropType } from './props'

const PieSlice = ({
    data,
    path,
    color,
    fill,
    borderWidth,
    borderColor,
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
                id={data.label || data.id}
                value={data.formattedValue}
                enableChip
                color={color}
                format={tooltipFormat}
                renderContent={
                    typeof tooltip === 'function' ? tooltip.bind(null, { color, ...data }) : null
                }
            />,
            e
        )
    const handleMouseEnter = e => {
        onMouseEnter(data, e)
        handleTooltip(e)
    }
    const handleMouseLeave = e => {
        onMouseLeave(data, e)
        hideTooltip(e)
    }

    return (
        <path
            key={data.id}
            d={path}
            fill={fill}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleTooltip}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(data, event)}
        />
    )
}

PieSlice.propTypes = {
    data: arcPropType.isRequired,

    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export default PieSlice
