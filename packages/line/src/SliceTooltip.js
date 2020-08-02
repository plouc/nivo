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
import { TableTooltip } from '@nivo/tooltip'

const Chip = ({ color }) => (
    <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />
)

Chip.propTypes = {
    color: PropTypes.string.isRequired,
}

const SliceTooltip = ({ slice, axis }) => {
    const otherAxis = axis === 'x' ? 'y' : 'x'

    return (
        <TableTooltip
            rows={slice.points.map(point => [
                <Chip key="chip" color={point.serieColor} />,
                point.serieId,
                <strong key="value">{point.data[`${otherAxis}Formatted`]}</strong>,
            ])}
        />
    )
}

SliceTooltip.propTypes = {
    slice: PropTypes.object.isRequired,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
}

export default memo(SliceTooltip)
