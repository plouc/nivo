import { settingsMapper, mapFormat } from '../../../lib/settings'

export default settingsMapper({
    valueFormat: mapFormat,
    dotLabel: (value: string) => {
        if (value === `p => \`\${p.key}: \${p.value}\``) return (p: any) => `${p.key}: ${p.value}`
        if (value === `p => \`\${p.index}: \${p.value}\``)
            return (p: any) => `${p.index}: ${p.value}`
        return value
    },
})
