import { settingsMapper, mapAxis } from '../../../lib/settings'

export default settingsMapper(
    {
        markersLabel: value => {
            if (value === `d => \`\${d.x}: \${d.y}\``) return d => `${d.x}: ${d.y}`
            return value
        },
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)
