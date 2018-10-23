import { bar } from './bar'
import { heatmap } from './heatmap'
import { line } from './line'

const defaultMapper = settings => settings

export const getSettingsMapper = (pkg /*, componentId*/) => {
    if (pkg === 'bar') return bar
    if (pkg === 'heatmap') return heatmap
    if (pkg === 'line') return line

    return defaultMapper
}
