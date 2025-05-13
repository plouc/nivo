import { settingsMapper } from '../../../lib/settings'
import { mapFormat } from '../../../lib/property-mappers'

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
