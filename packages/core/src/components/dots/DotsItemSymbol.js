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

const DotsItemSymbol = ({ size, color, borderWidth, borderColor }) => (
    <circle
        r={size / 2}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
        style={{ pointerEvents: 'none' }}
    />
)

DotsItemSymbol.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
}

export default memo(DotsItemSymbol)
