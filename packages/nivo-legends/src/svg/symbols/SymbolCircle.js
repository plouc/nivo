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

const SymbolCircle = ({ x, y, size, fill }) => (
    <circle r={size / 2} cx={x + size / 2} cy={y + size / 2} fill={fill} />
)

SymbolCircle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
}

export default SymbolCircle
