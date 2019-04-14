/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { settingsMapper } from '../../../lib/settings'

export default settingsMapper({
    colorBy: value => {
        if (value === 'd => d.color') return d => d.color
        return value
    },
    markersLabel: value => {
        if (value === `d => \`\${d.key}: \${d.value}\``) return d => `${d.key}: ${d.value}`
        if (value === `d => \`\${d.index}: \${d.value}\``) return d => `${d.index}: ${d.value}`
        return value
    },
})
