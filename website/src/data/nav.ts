import areaBump from './components/area-bump/meta.yml'
import bar from './components/bar/meta.yml'
import circlePacking from './components/circle-packing/meta.yml'
import bump from './components/bump/meta.yml'
import bullet from './components/bullet/meta.yml'
import calendar from './components/calendar/meta.yml'
import choropleth from './components/choropleth/meta.yml'
import chord from './components/chord/meta.yml'
import funnel from './components/funnel/meta.yml'
import geomap from './components/geomap/meta.yml'
import heatmap from './components/heatmap/meta.yml'
import line from './components/line/meta.yml'
import marimekko from './components/marimekko/meta.yml'
import network from './components/network/meta.yml'
import parallelCoordinates from './components/parallel-coordinates/meta.yml'
import pie from './components/pie/meta.yml'
import radar from './components/radar/meta.yml'
import radialBar from './components/radial-bar/meta.yml'
import sankey from './components/sankey/meta.yml'
import scatterplot from './components/scatterplot/meta.yml'
import stream from './components/stream/meta.yml'
import sunburst from './components/sunburst/meta.yml'
import swarmplot from './components/swarmplot/meta.yml'
import timeRange from './components/time-range/meta.yml'
import treemap from './components/treemap/meta.yml'
import voronoi from './components/voronoi/meta.yml'
import waffle from './components/waffle/meta.yml'
import { ChartNavData } from '../types'

export const components: ChartNavData[] = [
    {
        name: 'AreaBump',
        id: 'area-bump',
        tags: areaBump.AreaBump.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Bar',
        id: 'bar',
        tags: bar.Bar.tags,
        flavors: {
            svg: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'CirclePacking',
        id: 'circle-packing',
        tags: circlePacking.CirclePacking.tags,
        flavors: {
            svg: true,
            html: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Bump',
        id: 'bump',
        tags: bump.Bump.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Bullet',
        id: 'bullet',
        tags: bullet.Bullet.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Calendar',
        id: 'calendar',
        tags: calendar.Calendar.tags,
        flavors: {
            svg: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Choropleth',
        id: 'choropleth',
        tags: choropleth.Choropleth.tags,
        flavors: {
            svg: true,
            canvas: true,
        },
    },
    {
        name: 'Chord',
        id: 'chord',
        tags: chord.Chord.tags,
        flavors: {
            svg: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Funnel',
        id: 'funnel',
        tags: funnel.Funnel.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'GeoMap',
        id: 'geomap',
        tags: geomap.GeoMap.tags,
        flavors: {
            svg: true,
            canvas: true,
        },
    },
    {
        name: 'HeatMap',
        id: 'heatmap',
        tags: heatmap.HeatMap.tags,
        flavors: {
            svg: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Line',
        id: 'line',
        tags: line.Line.tags,
        flavors: {
            svg: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Marimekko',
        id: 'marimekko',
        tags: marimekko.Marimekko.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Network',
        id: 'network',
        tags: network.Network.tags,
        flavors: {
            svg: true,
            canvas: true,
        },
    },
    {
        name: 'ParallelCoordinates',
        id: 'parallel-coordinates',
        tags: parallelCoordinates.ParallelCoordinates.tags,
        flavors: {
            svg: true,
            canvas: true,
        },
    },
    {
        name: 'Pie',
        id: 'pie',
        tags: pie.Pie.tags,
        flavors: {
            svg: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Radar',
        id: 'radar',
        tags: radar.Radar.tags,
        flavors: {
            svg: true,
            api: true,
        },
    },
    {
        name: 'RadialBar',
        id: 'radial-bar',
        tags: radialBar.RadialBar.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Sankey',
        id: 'sankey',
        tags: sankey.Sankey.tags,
        flavors: {
            svg: true,
            api: true,
        },
    },
    {
        name: 'ScatterPlot',
        id: 'scatterplot',
        tags: scatterplot.ScatterPlot.tags,
        flavors: {
            svg: true,
            canvas: true,
        },
    },
    {
        name: 'Stream',
        id: 'stream',
        tags: stream.Stream.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Sunburst',
        id: 'sunburst',
        tags: sunburst.Sunburst.tags,
        flavors: {
            svg: true,
            api: true,
        },
    },
    {
        name: 'SwarmPlot',
        id: 'swarmplot',
        tags: swarmplot.SwarmPlot.tags,
        flavors: {
            svg: true,
            canvas: true,
        },
    },
    {
        name: 'TimeRange',
        id: 'time-range',
        tags: timeRange.TimeRange.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'TreeMap',
        id: 'treemap',
        tags: treemap.TreeMap.tags,
        flavors: {
            svg: true,
            html: true,
            canvas: true,
            api: true,
        },
    },
    {
        name: 'Voronoi',
        id: 'voronoi',
        tags: voronoi.Voronoi.tags,
        flavors: {
            svg: true,
        },
    },
    {
        name: 'Waffle',
        id: 'waffle',
        tags: waffle.Waffle.tags,
        flavors: {
            svg: true,
            html: true,
            canvas: true,
        },
    },
]

export const guides = [
    {
        label: 'Axes',
        path: '/guides/axes/',
    },
    {
        label: 'Colors',
        path: '/guides/colors/',
    },
    {
        label: 'Legends',
        path: '/guides/legends/',
    },
    {
        label: 'Gradients',
        path: '/guides/gradients/',
    },
    {
        label: 'Patterns',
        path: '/guides/patterns/',
    },
    {
        label: 'Theming',
        path: '/guides/theming/',
    },
]
