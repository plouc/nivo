/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { settingsMapper, mapInheritedColor } from '../../../lib/settings'
import CustomTooltip from './CustomTooltip'

const CustomSvgCell = ({
    position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}) => (
    <circle
        r={size / 2}
        cx={x + size / 2}
        cy={y + size / 2}
        fill={fill || color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        opacity={opacity}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={event => {
            onClick({ position, color, x, y, data }, event)
        }}
    />
)

const CustomHtmlCell = ({
    position,
    size,
    x,
    y,
    color,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}) => (
    <div
        style={{
            borderRadius: `${size / 2}px 0 ${size / 2}px 0`,
            position: 'absolute',
            top: y,
            left: x,
            width: size,
            height: size,
            background: color,
            opacity,
            boxSizing: 'content-box',
            borderStyle: 'solid',
            borderWidth: `${borderWidth}px`,
            borderColor,
        }}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={event => {
            onClick({ position, color, x, y, data }, event)
        }}
    />
)

export default settingsMapper(
    {
        cellComponent: (value, values, options) => {
            if (value === `Custom(props) => (…)`) {
                if (options.component === 'Waffle') return CustomSvgCell
                return CustomHtmlCell
            }
            return undefined
        },
        colorBy: value => {
            if (value === 'd => d.color') return d => d.color
            return value
        },
        borderColor: mapInheritedColor,
        theme: (value, values) => {
            if (!values['custom tooltip example']) return value

            return {
                ...values.theme,
                tooltip: {
                    container: {
                        ...values.theme.tooltip.container,
                        background: '#333',
                    },
                },
            }
        },
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return null

            return CustomTooltip
        },
    },
    {
        exclude: ['custom tooltip example'],
    }
)
