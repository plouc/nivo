import { bar, barCanvas } from './bar'
import bullet from './bullet'
import { calendar } from './calendar'
import { chord, chordCanvas } from './chord'
import { heatmap, heatmapCanvas } from './heatmap'
import { line } from './line'
import { parallelCoordinates, parallelCoordinatesCanvas } from './parallel-coordinates'
import { pie, pieCanvas } from './pie'
import { radar } from './radar'
import { sankey } from './sankey'
import { scatterplot, scatterplotCanvas } from './scatterplot'
import { stream, streamCanvas } from './stream'
import { sunburst } from './sunburst'
import { treemap, treemapCanvas } from './treemap'
import { voronoi } from './voronoi'
import { waffle, waffleCanvas } from './waffle'

export default {
    bar: {
        base: bar,
        canvas: barCanvas,
    },
    bullet: {
        base: bullet,
    },
    calendar: {
        base: calendar,
    },
    chord: {
        base: chord,
        canvas: chordCanvas,
    },
    heatmap: {
        base: heatmap,
        canvas: heatmapCanvas,
    },
    line: {
        base: line,
    },
    'parallel-coordinates': {
        base: parallelCoordinates,
        canvas: parallelCoordinatesCanvas,
    },
    pie: {
        base: pie,
        canvas: pieCanvas,
    },
    radar: {
        base: radar,
    },
    sankey: {
        base: sankey,
    },
    scatterplot: {
        base: scatterplot,
        canvas: scatterplotCanvas,
    },
    stream: {
        base: stream,
        canvas: streamCanvas,
    },
    sunburst: {
        base: sunburst,
    },
    treemap: {
        base: treemap,
        html: treemap,
        canvas: treemapCanvas,
    },
    voronoi: {
        base: voronoi,
    },
    waffle: {
        base: waffle,
        html: waffle,
        canvas: waffleCanvas,
    },
}