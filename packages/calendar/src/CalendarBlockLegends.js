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

const CalendarBlockLegends = memo(({ blocks, legend, theme }) => {
    return (
        <>
            {blocks.map(block => {
                return (
                    <text
                        key={
                            String(block.firstYear) +
                            String(block.firstMonth) +
                            String(block.lastYear) +
                            String(block.lastMonth)
                        }
                        transform={`translate(${block.x},${block.y}) rotate(${block.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(block)}
                    </text>
                )
            })}
        </>
    )
})

CalendarBlockLegends.propTypes = {
    blocks: PropTypes.array.isRequired,
    legend: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

CalendarBlockLegends.displayName = 'CalendarBlockLegends'

export default CalendarBlockLegends
