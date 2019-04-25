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

const LineStackedTooltip = memo(({ slice, formatValue }) => {
    return (
        <TableTooltip
            rows={slice.data
                .filter(d => d.position.x !== null && d.position.y !== null)
                .map(d => [<Chip color={d.serie.color} />, d.serie.id, formatValue(d.data.y)])}
        />
    )
})

LineStackedTooltip.displayName = 'LineStackedTooltip'
LineStackedTooltip.propTypes = {
    slice: PropTypes.object.isRequired,
    formatValue: PropTypes.func.isRequired,
}

export default LineStackedTooltip
