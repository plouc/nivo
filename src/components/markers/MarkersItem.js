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

const MarkersItem = ({
    x,
    y,
    size,
    color,
    borderWidth,
    borderColor,
    label,
    labelTextAnchor,
    labelYOffset,
    theme,
}) => {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <circle r={size / 2} fill={color} stroke={borderColor} strokeWidth={borderWidth} />
            {label &&
                <text
                    textAnchor={labelTextAnchor}
                    y={labelYOffset}
                    style={{
                        fontSize: theme.markers.fontSize,
                        fill: theme.markers.textColor,
                    }}
                >
                    {label}
                </text>}
        </g>
    )
}

MarkersItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelTextAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
    labelYOffset: PropTypes.number.isRequired,
    theme: PropTypes.shape({
        markers: PropTypes.shape({
            textColor: PropTypes.string.isRequired,
            fontSize: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export const MarkersItemDefaultProps = {
    labelTextAnchor: 'middle',
    labelYOffset: -12,
}

MarkersItem.defaultProps = MarkersItemDefaultProps

export default pure(MarkersItem)
