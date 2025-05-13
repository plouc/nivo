import { settingsMapper } from '../../../lib/settings'
import { mapAxis, mapFormat, mapLegends } from '../../../lib/property-mappers'

export default settingsMapper(
    {
        xFormat: mapFormat,
        yFormat: mapFormat,
        axisTop: mapAxis,
        axisRight: mapAxis,
        axisBottom: mapAxis,
        axisLeft: mapAxis,
        legends: mapLegends,
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)
