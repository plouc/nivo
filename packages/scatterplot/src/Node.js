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
import { blendModePropType } from '@nivo/core'

const Node = ({
    x,
    y,
    size,
    color,
    blendMode,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => (
    <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={color}
        style={{ mixBlendMode: blendMode }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    />
)

Node.propTypes = {
    node: PropTypes.object.isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    blendMode: blendModePropType.isRequired,

    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default memo(Node)
