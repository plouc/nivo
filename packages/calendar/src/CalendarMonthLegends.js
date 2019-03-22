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
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from './constants'

const CalendarMonthLegends = memo(({ months, direction, legend, position, offset, theme }) => {
    return (
        <>
            {months.map(month => {
                let transform
                if (direction === DIRECTION_HORIZONTAL && position === 'before') {
                    transform = `translate(${month.bbox.x + month.bbox.width / 2},${month.bbox.y -
                        offset})`
                } else if (direction === DIRECTION_HORIZONTAL && position === 'after') {
                    transform = `translate(${month.bbox.x + month.bbox.width / 2},${month.bbox.y +
                        month.bbox.height +
                        offset})`
                } else if (direction === DIRECTION_VERTICAL && position === 'before') {
                    transform = `translate(${month.bbox.x - offset},${month.bbox.y +
                        month.bbox.height / 2}) rotate(-90)`
                } else {
                    transform = `translate(${month.bbox.x + month.bbox.width + offset},${month.bbox
                        .y +
                        month.bbox.height / 2}) rotate(-90)`
                }

                return (
                    <text
                        key={`${month.date.toString()}.legend`}
                        transform={transform}
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
    direction: PropTypes.oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
    legend: PropTypes.func.isRequired,
    position: PropTypes.oneOf(['before', 'after']).isRequired,
    offset: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
}

export default CalendarMonthLegends
