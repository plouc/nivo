/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { settingsMapper, mapFormat } from '../../../lib/settings'

export default settingsMapper({
    label: value => {
        if (value === `node => \`\${node.id} (\${node.formattedValue})\``)
            return node => `${node.id} (${node.formattedValue})`
        return value
    },
    parentLabel: value => {
        if (value === `node => node.pathComponents.join(' / ')`)
            return node => node.pathComponents.join(' / ')
        return value
    },
    valueFormat: mapFormat,
})
