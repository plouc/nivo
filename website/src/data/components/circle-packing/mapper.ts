import { settingsMapper } from '../../../lib/settings'
import { mapFormat } from '../../../lib/property-mappers'

export default settingsMapper({
    valueFormat: mapFormat,
    label: value => {
        if (value === `d => \`\${d.id}: \${d.value}\``) return d => `${d.id}: ${d.value}`
        return value
    },
})
