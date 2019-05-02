/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import sortBy from 'lodash/sortBy'
import bar from './components/bar/meta.yml'
import bubble from './components/bubble/meta.yml'
import bullet from './components/bullet/meta.yml'
import calendar from './components/calendar/meta.yml'
import geomap from './components/geomap/meta.yml'
import choropleth from './components/choropleth/meta.yml'
import chord from './components/chord/meta.yml'
import heatmap from './components/heatmap/meta.yml'
import line from './components/line/meta.yml'
import parallelCoordinates from './components/parallel-coordinates/meta.yml'
import pie from './components/pie/meta.yml'
import radar from './components/radar/meta.yml'
import sankey from './components/sankey/meta.yml'
import scatterplot from './components/scatterplot/meta.yml'
import stream from './components/stream/meta.yml'
import sunburst from './components/sunburst/meta.yml'
import swarmplot from './components/swarmplot/meta.yml'
import treemap from './components/treemap/meta.yml'
import voronoi from './components/voronoi/meta.yml'
import waffle from './components/waffle/meta.yml'

export const components = [
    {
        label: 'Bar',
        path: '/bar/',
        icon: 'bar',
        tags: bar.Bar.tags,
    },
    {
        label: 'Bubble',
        path: '/bubble/',
        icon: 'circle-packing',
        tags: bubble.Bubble.tags,
    },
    {
        label: 'Bullet',
        path: '/bullet/',
        icon: 'bullet',
        tags: bullet.Bullet.tags,
    },
    {
        label: 'Calendar',
        path: '/calendar/',
        icon: 'calendar',
        tags: calendar.Calendar.tags,
    },
    {
        label: 'Choropleth',
        path: '/choropleth/',
        icon: 'choropleth',
        tags: choropleth.Choropleth.tags,
    },
    {
        label: 'Chord',
        path: '/chord/',
        icon: 'chord',
        tags: chord.Chord.tags,
    },
    {
        label: 'GeoMap',
        path: '/geomap/',
        icon: 'geomap',
        tags: geomap.GeoMap.tags,
    },
    {
        label: 'HeatMap',
        path: '/heatmap/',
        icon: 'heatmap',
        tags: heatmap.HeatMap.tags,
    },
    {
        label: 'Line',
        path: '/line/',
        icon: 'line',
        tags: line.Line.tags,
    },
    {
        label: 'ParallelCoordinates',
        path: '/parallel-coordinates/',
        icon: 'parallel-coordinates',
        tags: parallelCoordinates.ParallelCoordinates.tags,
    },
    {
        label: 'Pie',
        path: '/pie/',
        icon: 'pie',
        tags: pie.Pie.tags,
    },
    {
        label: 'Radar',
        path: '/radar/',
        icon: 'radar',
        tags: radar.Radar.tags,
    },
    {
        label: 'Sankey',
        path: '/sankey/',
        icon: 'sankey',
        tags: sankey.Sankey.tags,
    },
    {
        label: 'ScatterPlot',
        path: '/scatterplot/',
        icon: 'scatterplot',
        tags: scatterplot.ScatterPlot.tags,
    },
    {
        label: 'Stream',
        path: '/stream/',
        icon: 'stream',
        tags: stream.Stream.tags,
    },
    {
        label: 'Sunburst',
        path: '/sunburst/',
        icon: 'sunburst',
        tags: sunburst.Sunburst.tags,
    },
    {
        label: 'SwarmPlot',
        path: '/swarmplot/',
        icon: 'swarmplot',
        tags: swarmplot.SwarmPlot.tags,
    },
    {
        label: 'TreeMap',
        path: '/treemap/',
        icon: 'treemap',
        tags: treemap.TreeMap.tags,
    },
    {
        label: 'Voronoi',
        path: '/voronoi/',
        icon: 'voronoi',
        tags: voronoi.Voronoi.tags,
    },
    {
        label: 'Waffle',
        path: '/waffle/',
        icon: 'waffle',
        tags: waffle.Waffle.tags,
    },
]

const all = components.concat([
    {
        label: 'BarCanvas',
        path: '/bar/canvas/',
        icon: 'bar',
        tags: bar.BarCanvas.tags,
    },
    {
        label: 'Bar HTTP API',
        path: '/bar/api/',
        icon: 'bar',
        tags: [...bar.Bar.tags, 'HTTP API'],
    },
    {
        label: 'BubbleHtml',
        path: '/bubble/html/',
        icon: 'circle-packing',
        tags: bubble.BubbleHtml.tags,
    },
    {
        label: 'BubbleCanvas',
        path: '/bubble/canvas/',
        icon: 'circle-packing',
        tags: bubble.BubbleCanvas.tags,
    },
    {
        label: 'Bubble HTTP API',
        path: '/bubble/api/',
        icon: 'circle-packing',
        tags: [...bubble.Bubble.tags, 'HTTP API'],
    },
    {
        label: 'CalendarCanvas',
        path: '/calendar/canvas/',
        icon: 'calendar',
        tags: calendar.CalendarCanvas.tags,
    },
    {
        label: 'Calendar HTTP API',
        path: '/calendar/api/',
        icon: 'calendar',
        tags: [...calendar.Calendar.tags, 'HTTP API'],
    },
    {
        label: 'ChoroplethCanvas',
        path: '/choropleth/canvas/',
        icon: 'choropleth',
        tags: choropleth.ChoroplethCanvas.tags,
    },
    {
        label: 'ChordCanvas',
        path: '/chord/canvas/',
        icon: 'chord',
        tags: chord.ChordCanvas.tags,
    },
    {
        label: 'Chord HTTP API',
        path: '/chord/api/',
        icon: 'chord',
        tags: [...chord.Chord.tags, 'HTTP API'],
    },
    {
        label: 'GeoMapCanvas',
        path: '/geomap/canvas/',
        icon: 'geomap',
        tags: geomap.GeoMapCanvas.tags,
    },
    {
        label: 'HeatMapCanvas',
        path: '/heatmap/canvas/',
        icon: 'heatmap',
        tags: heatmap.HeatMapCanvas.tags,
    },
    {
        label: 'HeatMap HTTP API',
        path: '/heatmap/api/',
        icon: 'heatmap',
        tags: [...heatmap.HeatMap.tags, 'HTTP API'],
    },
    {
        label: 'LineCanvas',
        path: '/line/canvas/',
        icon: 'line',
        tags: line.LineCanvas.tags,
    },
    {
        label: 'Line HTTP API',
        path: '/line/api/',
        icon: 'line',
        tags: [...line.Line.tags, 'HTTP API'],
    },
    {
        label: 'ParallelCoordinatesCanvas',
        path: '/parallel-coordinates/canvas/',
        icon: 'parallel-coordinates',
        tags: parallelCoordinates.ParallelCoordinatesCanvas.tags,
    },
    {
        label: 'PieCanvas',
        path: '/pie/canvas/',
        icon: 'pie',
        tags: pie.PieCanvas.tags,
    },
    {
        label: 'Pie HTTP API',
        path: '/pie/api/',
        icon: 'pie',
        tags: [...pie.Pie.tags, 'HTTP API'],
    },
    {
        label: 'Radar HTTP API',
        path: '/radar/api/',
        icon: 'radar',
        tags: [...radar.Radar.tags, 'HTTP API'],
    },
    {
        label: 'Sankey HTTP API',
        path: '/sankey/api/',
        icon: 'sankey',
        tags: [...sankey.Sankey.tags, 'HTTP API'],
    },
    {
        label: 'ScatterPlotCanvas',
        path: '/scatterplot/canvas/',
        icon: 'scatterplot',
        tags: scatterplot.ScatterPlotCanvas.tags,
    },
    {
        label: 'Sunburst HTTP API',
        path: '/sunburst/api/',
        icon: 'sunburst',
        tags: [...sunburst.Sunburst.tags, 'HTTP API'],
    },
    {
        label: 'SwarmPlotCanvas',
        path: '/swarmplot/canvas/',
        icon: 'swarmplot',
        tags: swarmplot.SwarmPlotCanvas.tags,
    },
    {
        label: 'TreeMapHtml',
        path: '/treemap/html/',
        icon: 'treemap',
        tags: treemap.TreeMapHtml.tags,
    },
    {
        label: 'TreeMapCanvas',
        path: '/treemap/canvas/',
        icon: 'treemap',
        tags: treemap.TreeMapCanvas.tags,
    },
    {
        label: 'TreeMap HTTP API',
        path: '/treemap/api/',
        icon: 'treemap',
        tags: [...treemap.TreeMap.tags, 'HTTP API'],
    },
    {
        label: 'WaffleHtml',
        path: '/waffle/html/',
        icon: 'waffle',
        tags: waffle.WaffleHtml.tags,
    },
    {
        label: 'WaffleCanvas',
        path: '/waffle/canvas/',
        icon: 'waffle',
        tags: waffle.WaffleCanvas.tags,
    },
])

export const allComponents = sortBy(all, 'label')

export const guides = [
    {
        label: 'Axes',
        path: '/guides/axes',
    },
    {
        label: 'Colors',
        path: '/guides/colors',
    },
    {
        label: 'Legends',
        path: '/guides/legends',
    },
    {
        label: 'Gradients',
        path: '/guides/gradients',
    },
    {
        label: 'Patterns',
        path: '/guides/patterns',
    },
    // {
    //     label: 'Theming',
    //     path: '/guides/theming',
    // },
]
