import { FunctionComponent } from 'react'
import { barMapping } from './bar'
import { circlePackingMapping } from './circle_packing'
import { calendarMapping } from './calendar'
import { chordMapping } from './chord'
import { heatmapMapping } from './heatmap'
import { lineMapping } from './line'
import { pieMapping } from './pie'
import { radarMapping } from './radar'
import { sankeyMapping } from './sankey'
import { sunburstMapping } from './sunburst'
import { iciclesMapping } from './icicles'
import { treemapMapping } from './treemap'

export const chartsMapping = {
    bar: barMapping,
    circle_packing: circlePackingMapping,
    calendar: calendarMapping,
    chord: chordMapping,
    heatmap: heatmapMapping,
    icicles: iciclesMapping,
    line: lineMapping,
    pie: pieMapping,
    radar: radarMapping,
    sankey: sankeyMapping,
    sunburst: sunburstMapping,
    treemap: treemapMapping,
} as const

type ExtractProps<T> = T extends FunctionComponent<infer P> ? P : never

export type ChartType = keyof typeof chartsMapping
export type ChartComponent<T extends ChartType> = typeof chartsMapping[T]['component']
export type ChartProps<T extends ChartType> = ExtractProps<ChartComponent<T>>

export * from './bar'
export * from './calendar'
export * from './chord'
export * from './circle_packing'
export * from './heatmap'
export * from './line'
export * from './pie'
export * from './radar'
export * from './sankey'
export * from './treemap'
