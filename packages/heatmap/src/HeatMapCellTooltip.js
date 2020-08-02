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
import { BasicTooltip } from '@nivo/tooltip'

const HeatMapCellTooltip = ({ cell, format, tooltip }) => (
    <BasicTooltip
        id={`${cell.yKey} - ${cell.xKey}`}
        value={cell.value}
        enableChip={true}
        color={cell.color}
        format={format}
        renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...cell }) : null}
    />
)

HeatMapCellTooltip.propTypes = {
    cell: PropTypes.shape({
        xKey: PropTypes.string.isRequired,
        yKey: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
    format: PropTypes.func,
    tooltip: PropTypes.func,
}

export default memo(HeatMapCellTooltip)
