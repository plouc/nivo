/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { settingsMapper } from '../../../lib/settings'

const colorByColorVar = {
    red: '#f47560',
    yellow: '#f1e15a',
    green: '#61cdbb',
}

export default settingsMapper({
    colorBy: value => {
        if (value === `custom using 'color' variable`) {
            return ({ color }) => colorByColorVar[color]
        }

        return value
    },
})
