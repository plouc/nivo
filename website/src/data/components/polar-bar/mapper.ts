import omit from 'lodash/omit'
import { settingsMapper, mapFormat } from '../../../lib/settings'

export const mapAxis = (key: string) => (value: any, settings: any) =>
    settings[key].enable ? omit(value, ['enable']) : null

export default settingsMapper({
    valueFormat: mapFormat,
    radialAxis: mapAxis('radialAxis'),
    circularAxisInner: mapAxis('circularAxisInner'),
    circularAxisOuter: mapAxis('circularAxisOuter'),
})
