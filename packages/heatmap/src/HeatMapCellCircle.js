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
import pure from 'recompose/pure'
import { themePropType } from '@nivo/core'

const style = { cursor: 'pointer' }

const HeatMapCellCircle = ({
    data,
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    enableLabel,
    textColor,
    onHover,
    onLeave,
    onClick,
    theme,
}) => (
    <g
        transform={`translate(${x}, ${y})`}
        style={style}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={e => {
            onClick(data, e)
        }}
    >
        <circle
            r={Math.min(width, height) / 2}
            fill={color}
            fillOpacity={opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            strokeOpacity={opacity}
        />
        {enableLabel && (
            <text
                alignmentBaseline="central"
                textAnchor="middle"
                style={{
                    ...theme.labels,
                    fill: textColor,
                }}
                fillOpacity={opacity}
            >
                {value}
            </text>
        )}
    </g>
)

HeatMapCellCircle.propTypes = {
    data: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    textColor: PropTypes.string.isRequired,
    onHover: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    theme: themePropType.isRequired,
}

export default pure(HeatMapCellCircle)
