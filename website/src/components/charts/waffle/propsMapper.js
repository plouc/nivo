/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { settingsMapper, mapInheritedColor } from '../../../lib/settings'
import CustomTooltip from './CustomTooltip'

export default settingsMapper(
    {
        colorBy: value => {
            if (value === 'd => d.color') return d => d.color
            return value
        },
        borderColor: mapInheritedColor,
        theme: (value, values) => {
            if (!values['custom tooltip example']) return value

            return {
                ...values.theme,
                tooltip: {
                    container: {
                        ...values.theme.tooltip.container,
                        background: '#333',
                    },
                },
            }
        },
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return null

            return CustomTooltip
        },
    },
    {
        exclude: ['custom tooltip example'],
    }
)
