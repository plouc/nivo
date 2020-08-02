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

const CalendarMonthLegends = memo(({ months, legend, theme }) => {
    return (
        <>
            {months.map(month => {
                return (
                    <text
                        key={`${month.date.toString()}.legend`}
                        transform={`translate(${month.x},${month.y}) rotate(${month.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(month.year, month.month, month.date)}
                    </text>
                )
            })}
        </>
    )
})

CalendarMonthLegends.propTypes = {
    months: PropTypes.array.isRequired,
    legend: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

CalendarMonthLegends.displayName = 'CalendarMonthLegends'

export default CalendarMonthLegends
