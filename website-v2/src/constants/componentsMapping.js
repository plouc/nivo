import { ResponsiveBar, ResponsiveBarCanvas } from '@nivo/bar'
import { ResponsiveBullet } from '@nivo/bullet'
import { ResponsiveCalendar } from '@nivo/calendar'
import { ResponsiveChord, ResponsiveChordCanvas } from '@nivo/chord'
import { ResponsiveHeatMap, ResponsiveHeatMapCanvas } from '@nivo/heatmap'
import { ResponsiveLine } from '@nivo/line'
import {
    ResponsiveParallelCoordinates,
    ResponsiveParallelCoordinatesCanvas,
} from '@nivo/parallel-coordinates'
import { ResponsivePie, ResponsivePieCanvas } from '@nivo/pie'
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsiveSankey } from '@nivo/sankey'
import { ResponsiveScatterPlot, ResponsiveScatterPlotCanvas } from '@nivo/scatterplot'
import { ResponsiveStream } from '@nivo/stream'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { ResponsiveTreeMap, ResponsiveTreeMapHtml, ResponsiveTreeMapCanvas } from '@nivo/treemap'
import { ResponsiveVoronoi } from '@nivo/voronoi'
import { ResponsiveWaffle, ResponsiveWaffleHtml, ResponsiveWaffleCanvas } from '@nivo/waffle'

export default {
    bar: {
        base: ResponsiveBar,
        canvas: ResponsiveBarCanvas,
    },
    bullet: {
        base: ResponsiveBullet,
    },
    calendar: {
        base: ResponsiveCalendar,
    },
    chord: {
        base: ResponsiveChord,
        canvas: ResponsiveChordCanvas,
    },
    heatmap: {
        base: ResponsiveHeatMap,
        canvas: ResponsiveHeatMapCanvas,
    },
    line: {
        base: ResponsiveLine,
    },
    'parallel-coordinates': {
        base: ResponsiveParallelCoordinates,
        canvas: ResponsiveParallelCoordinatesCanvas,
    },
    pie: {
        base: ResponsivePie,
        canvas: ResponsivePieCanvas,
    },
    radar: {
        base: ResponsiveRadar,
    },
    sankey: {
        base: ResponsiveSankey,
    },
    scatterplot: {
        base: ResponsiveScatterPlot,
        canvas: ResponsiveScatterPlotCanvas,
    },
    stream: {
        base: ResponsiveStream,
    },
    sunburst: {
        base: ResponsiveSunburst,
    },
    treemap: {
        base: ResponsiveTreeMap,
        html: ResponsiveTreeMapHtml,
        canvas: ResponsiveTreeMapCanvas,
    },
    voronoi: {
        base: ResponsiveVoronoi,
    },
    waffle: {
        base: ResponsiveWaffle,
        html: ResponsiveWaffleHtml,
        canvas: ResponsiveWaffleCanvas,
    },
}
