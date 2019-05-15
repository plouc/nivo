/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { settingsMapper, mapAxis } from '../../../lib/settings'

export default settingsMapper(
    {
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)
