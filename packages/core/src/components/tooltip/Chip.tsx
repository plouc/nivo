/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'

export interface ChipProps {
    size?: number
    color: string
    style?: any
}

const Chip: React.SFC<ChipProps> = React.memo(({ size = 12, color, style = {} }) => (
    <span style={{ display: 'block', width: size, height: size, background: color, ...style }} />
))

Chip.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string.isRequired,
    style: PropTypes.object,
}

export default Chip
