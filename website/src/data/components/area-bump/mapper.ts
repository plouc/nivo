import { settingsMapper, mapAxis } from '../../../lib/settings'

export default settingsMapper(
    {
        axisTop: mapAxis('top'),
        axisBottom: mapAxis('bottom'),
    },
    {
        exclude: ['enable axisTop', 'enable axisBottom'],
    }
)
