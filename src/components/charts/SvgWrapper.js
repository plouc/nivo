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
import { Defs } from '../defs'

const SvgWrapper = ({ width, height, margin, defs, children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
        <Defs defs={defs} />
        <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
    </svg>
)

SvgWrapper.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    defs: PropTypes.array,
}

export default SvgWrapper
