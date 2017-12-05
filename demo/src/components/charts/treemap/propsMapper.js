/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { settingsMapper, mapInheritedColor } from '../../../lib/settings'

export default settingsMapper({
    colorBy: value => {
        if (value === 'd => d.color') return d => d.color
        return value
    },
    label: value => {
        if (value === `d => \`\${d.name} (\${d.loc})\``) return d => `${d.name} (${d.loc})`
        return value
    },
    labelFormat: (value, settings) => (settings.label === 'loc' ? value : undefined),
    borderColor: mapInheritedColor,
    labelTextColor: mapInheritedColor,
})
