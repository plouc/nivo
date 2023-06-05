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
