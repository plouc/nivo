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

const CalendarTooltip = memo(({ value, day, color }) => {
    if (value === undefined || isNaN(value)) return null
    return <BasicTooltip id={day} value={value} color={color} enableChip={true} />
})

CalendarTooltip.displayName = 'CalendarTooltip'
CalendarTooltip.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    day: PropTypes.string,
    color: PropTypes.string,
}

export default CalendarTooltip
