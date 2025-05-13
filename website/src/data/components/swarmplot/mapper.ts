import { settingsMapper } from '../../../lib/settings'
import { mapAxis, mapFormat } from '../../../lib/property-mappers'

export default settingsMapper({
    valueFormat: mapFormat,
    axisTop: mapAxis,
    axisRight: mapAxis,
    axisBottom: mapAxis,
    axisLeft: mapAxis,
})
