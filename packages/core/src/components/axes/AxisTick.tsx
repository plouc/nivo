/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { axisThemePropType, AxisTheme } from '../../theming'

export interface AxisTickProps {
    value: number | string | Date
    format?: any
    x: number
    y: number
    lineX: number
    lineY: number
    textX: number
    textY: number
    textBaseline: any
    textAnchor: any
    opacity?: number
    rotate?: number
    onClick?: any
    theme: {
        axis: AxisTheme
    }
}

export const AxisTick: React.SFC<AxisTickProps> = ({
    value: _value,
    x,
    y,
    opacity = 1,
    rotate = 0,
    format,
    lineX,
    lineY,
    onClick,
    textX,
    textY,
    textBaseline,
    textAnchor,
    theme,
}) => {
    let value = _value
    if (format !== undefined) {
        value = format(value)
    }

    const gStyle: React.CSSProperties = { opacity }
    if (onClick) {
        gStyle.cursor = 'pointer'
    }

    return (
        <g
            transform={`translate(${x},${y})`}
            {...(onClick ? { onClick: e => onClick(e, value) } : {})}
            style={gStyle}
        >
            <line x1={0} x2={lineX} y1={0} y2={lineY} style={theme.axis.ticks.line} />
            <text
                alignmentBaseline={textBaseline}
                textAnchor={textAnchor}
                transform={`translate(${textX},${textY}) rotate(${rotate})`}
                style={theme.axis.ticks.text}
            >
                {value}
            </text>
        </g>
    )
}

AxisTick.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
    format: PropTypes.func,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    lineX: PropTypes.number.isRequired,
    lineY: PropTypes.number.isRequired,
    textX: PropTypes.number.isRequired,
    textY: PropTypes.number.isRequired,
    textBaseline: PropTypes.string.isRequired,
    textAnchor: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    rotate: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    theme: PropTypes.shape({
        axis: axisThemePropType.isRequired,
    }).isRequired as React.Requireable<{
        axis: AxisTheme
    }>,
}
