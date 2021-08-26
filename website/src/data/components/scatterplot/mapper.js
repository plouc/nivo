import React from 'react'
import { settingsMapper, mapAxis, mapFormat } from '../../../lib/settings'

export default settingsMapper(
    {
        xFormat: mapFormat,
        yFormat: mapFormat,
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)
