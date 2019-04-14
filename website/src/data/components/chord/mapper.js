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
    label: value => {
        if (value === `d => \`\${d.id} [\${d.value}]\``) return d => `${d.id} [${d.value}]`
        return value
    },
})
