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

const CalendarTooltip = memo(({ data }) => {
    if (data.value === undefined || isNaN(data.value)) return null
    return (
        <BasicTooltip
            id={data.day}
            value={data.value}
            color={data.color}
            enableChip={true}
        />
    )
})

CalendarTooltip.displayName = 'CalendarTooltip'
CalendarTooltip.propTypes = {
    data: PropTypes.object.isRequired,
}

export default CalendarTooltip
