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

const Chip = ({ size, color, style }) => (
    <span style={{ display: 'block', width: size, height: size, background: color, ...style }} />
)

Chip.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
}

Chip.defaultProps = {
    size: 12,
    style: {},
}

export default pure(Chip)
