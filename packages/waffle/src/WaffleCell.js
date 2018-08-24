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

const WaffleCell = ({
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
    <rect
        width={size}
        height={size}
        x={x}
        y={y}
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

WaffleCell.propTypes = {
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    fill: PropTypes.string,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onHover: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}
WaffleCell.defaultProps = {
    data: {},
}
WaffleCell.displayName = 'WaffleCell'

export default pure(WaffleCell)
