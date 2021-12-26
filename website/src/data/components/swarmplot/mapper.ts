import { settingsMapper, mapAxis, mapFormat } from '../../../lib/settings'

export default settingsMapper({
    valueFormat: mapFormat,
    axisTop: mapAxis('top'),
    axisRight: mapAxis('right'),
    axisBottom: mapAxis('bottom'),
    axisLeft: mapAxis('left'),
})
