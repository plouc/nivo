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

const SymbolTriangle = ({ x, y, size, fill }) => (
    <g transform={`translate(${x},${y})`}>
        <path
            fill={fill}
            d={`
                M${size / 2} 0
                L${size} ${size}
                L0 ${size}
                L${size / 2} 0
            `}
        />
    </g>
)

SymbolTriangle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
}

export default SymbolTriangle
