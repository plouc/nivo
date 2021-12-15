import bar from './bar'
import calendar from './calendar'
import chord from './chord'
import circle_packing from './circle_packing'
import heatmap from './heatmap'
import line from './line'
import pie from './pie'
import radar from './radar'
import sankey from './sankey'
import sunburst from './sunburst'
import treemap from './treemap'
import { FunctionComponent } from 'react'

export const chartsMapping = {
    bar,
    circle_packing,
    calendar,
    chord,
    heatmap,
    line,
    pie,
    radar,
    sankey,
    sunburst,
    treemap,
} as const

type ExtractProps<T> = T extends FunctionComponent<infer P> ? P : never

export type ChartType = keyof typeof chartsMapping
export type ChartComponent<T extends ChartType> = typeof chartsMapping[T]['component']
export type ChartProps<T extends ChartType> = ExtractProps<ChartComponent<T>>
