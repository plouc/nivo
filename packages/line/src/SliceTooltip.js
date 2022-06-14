/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { memo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@nivo/core'
import { Chip, TableTooltip } from '@nivo/tooltip'

const SliceTooltip = ({ slice, axis }) => {
    const theme = useTheme()
    const otherAxis = axis === 'x' ? 'y' : 'x'

    return (
        <TableTooltip
            rows={slice.points.map(point => [
                <Chip key="chip" color={point.serieColor} style={theme.tooltip.chip} />,
                point.serieId,
                <span key="value" style={theme.tooltip.tableCellValue}>
                    {point.data[`${otherAxis}Formatted`]}
                </span>,
            ])}
        />
    )
}

SliceTooltip.propTypes = {
    slice: PropTypes.object.isRequired,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
}

export default memo(SliceTooltip)
