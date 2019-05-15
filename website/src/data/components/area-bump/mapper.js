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
        axisBottom: mapAxis('bottom'),
    },
    {
        exclude: ['enable axisTop', 'enable axisBottom'],
    }
)
