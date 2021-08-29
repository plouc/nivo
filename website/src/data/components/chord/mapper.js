import { settingsMapper } from '../../../lib/settings'

export default settingsMapper({
    label: value => {
        if (value === `d => \`\${d.id} [\${d.value}]\``) return d => `${d.id} [${d.value}]`
        return value
    },
})
