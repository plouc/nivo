/*
 * This file is part of the nivo library.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { PropTypes } from 'react'


const GridLine = props => (
    <line
        {...props}
        className="nivo_grid_line"
        stroke="#ddd"
    />
)

GridLine.propTypes = {
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
}

GridLine.defaultProps = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
}


export default GridLine
