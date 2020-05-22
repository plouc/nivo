/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../../theming'

/**
 *
 * @param {string} axis
 * @param {number} width
 * @param {number} height
 * @param {string} position
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {string} orientation
 * @return {{ x: number, y: number, textAnchor: string }}
 */
const computeLabel = ({ axis, width, height, position, offsetX, offsetY, orientation }) => {
    let x = 0
    let y = 0
    const rotation = orientation === 'vertical' ? -90 : 0
    let textAnchor = 'start'

    if (axis === 'x') {
        switch (position) {
            case 'top-left':
                x = -offsetX
                y = offsetY
                textAnchor = 'end'
                break
            case 'top':
                y = -offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'top-right':
                x = offsetX
                y = offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'right':
                x = offsetX
                y = height / 2
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'middle'
                }
                break
            case 'bottom-right':
                x = offsetX
                y = height - offsetY
                textAnchor = 'start'
                break
            case 'bottom':
                y = height + offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'bottom-left':
                y = height - offsetY
                x = -offsetX
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'left':
                x = -offsetX
                y = height / 2
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'middle'
                }
                break
        }
    } else {
        switch (position) {
            case 'top-left':
                x = offsetX
                y = -offsetY
                textAnchor = 'start'
                break
            case 'top':
                x = width / 2
                y = -offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'top-right':
                x = width - offsetX
                y = -offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'right':
                x = width + offsetX
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'middle'
                }
                break
            case 'bottom-right':
                x = width - offsetX
                y = offsetY
                textAnchor = 'end'
                break
            case 'bottom':
                x = width / 2
                y = offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'bottom-left':
                x = offsetX
                y = offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'left':
                x = -offsetX
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'middle'
                }
                break
        }
    }

    return { x, y, rotation, textAnchor }
}

const CartesianMarkersItem = ({
    width,
    height,
    axis,
    scale,
    value,
    lineStyle,
    textStyle,
    legend,
    legendPosition,
    legendOffsetX,
    legendOffsetY,
    legendOrientation,
}) => {
    const theme = useTheme()

    let x = 0
    let x2 = 0
    let y = 0
    let y2 = 0

    if (axis === 'y') {
        y = scale(value)
        x2 = width
    } else {
        x = scale(value)
        y2 = height
    }

    let legendNode = null
    if (legend) {
        const legendProps = computeLabel({
            axis,
            width,
            height,
            position: legendPosition,
            offsetX: legendOffsetX,
            offsetY: legendOffsetY,
            orientation: legendOrientation,
        })
        legendNode = (
            <text
                transform={`translate(${legendProps.x}, ${legendProps.y}) rotate(${legendProps.rotation})`}
                textAnchor={legendProps.textAnchor}
                dominantBaseline="central"
                style={textStyle}
            >
                {legend}
            </text>
        )
    }

    return (
        <g transform={`translate(${x}, ${y})`}>
            <line
                x1={0}
                x2={x2}
                y1={0}
                y2={y2}
                stroke={theme.markers.lineColor}
                strokeWidth={theme.markers.lineStrokeWidth}
                style={lineStyle}
            />
            {legendNode}
        </g>
    )
}

CartesianMarkersItem.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    scale: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
    lineStyle: PropTypes.object,
    textStyle: PropTypes.object,

    legend: PropTypes.string,
    legendPosition: PropTypes.oneOf([
        'top-left',
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
    ]),
    legendOffsetX: PropTypes.number.isRequired,
    legendOffsetY: PropTypes.number.isRequired,
    legendOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
}
CartesianMarkersItem.defaultProps = {
    legendPosition: 'top-right',
    legendOffsetX: 14,
    legendOffsetY: 14,
    legendOrientation: 'horizontal',
}

export default memo(CartesianMarkersItem)
