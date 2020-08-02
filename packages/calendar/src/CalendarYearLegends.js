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

const CalendarYearLegends = memo(({ years, legend, theme }) => {
    return (
        <>
            {years.map(year => {
                return (
                    <text
                        key={year.year}
                        transform={`translate(${year.x},${year.y}) rotate(${year.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(year.year)}
                    </text>
                )
            })}
        </>
    )
})

CalendarYearLegends.propTypes = {
    years: PropTypes.array.isRequired,
    legend: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

CalendarYearLegends.displayName = 'CalendarYearLegends'

export default CalendarYearLegends
