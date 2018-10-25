import { bar } from './bar'
import { heatmap } from './heatmap'
import { line } from './line'
import { sankey } from './sankey'
import { treemap } from './treemap'

const defaultMapper = settings => settings

export const getSettingsMapper = (pkg /*, componentId*/) => {
    if (pkg === 'bar') return bar
    if (pkg === 'heatmap') return heatmap
    if (pkg === 'line') return line
    if (pkg === 'sankey') return sankey
    if (pkg === 'treemap') return treemap

    return defaultMapper
}
