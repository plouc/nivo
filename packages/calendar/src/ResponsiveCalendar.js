/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import Calendar from './Calendar'

const ResponsiveCalendar = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Calendar width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveCalendar
