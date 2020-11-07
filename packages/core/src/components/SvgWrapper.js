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
import { Defs } from './defs'
import { useTheme } from '../theming'

const SvgWrapper = ({ width, height, margin, defs, children, role }) => {
    const theme = useTheme()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" role={role} width={width} height={height}>
            <Defs defs={defs} />
            <rect width={width} height={height} fill={theme.background} />
            <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
        </svg>
    )
}

SvgWrapper.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    defs: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    role: PropTypes.string,
}

export default SvgWrapper
