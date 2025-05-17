import { ChartFlavor, ChartMeta} from "@/types/charts";

export const barFlavors: ChartFlavor[] = [
    { flavor: 'svg', path: '/bar/' },
    { flavor: 'canvas', path: '/bar/canvas/' },
    // { flavor: 'api', path: '/bar/api/' },
]

export const BarMeta: ChartMeta = {
    package: '@nivo/bar',
    tags: ['chart', 'bar'],
    description: 'A simple bar chart',
    stories: [
        {
            label: 'Markers/Annotations',
            description: 'Adding markers and annotations to your bar chart.',
            link: 'bar--with-marker',
        },
        {
            label: 'Diverging stacked bars',
            description: 'Highlighting diverging data in stacked mode.',
            link: 'bar--diverging-stacked',
        },
        {
            label: 'Diverging grouped bars',
            description: 'Highlighting diverging data in grouped mode.',
            link: 'bar--diverging-grouped',
        },
        {
            label: 'Custom bar',
            description: 'Using a custom component to render the bars.',
            link: 'bar--custom-bar-item',
        },
        {
            label: 'Using custom tooltip',
            link: 'bar--custom-tooltip',
        },
        {
            label: 'Custom axis ticks',
            link: 'bar--custom-axis-ticks',
        },
        {
            label: 'Symlog scale',
            link: 'bar--with-symlog-scale',
        },
        {
            label: 'Race bar chart',
            link: 'bar--race-chart',
        },
        {
            label: 'Initial hidden ids',
            link: 'bar--initial-hidden-ids',
        },
        {
            label: 'Using custom label for legends',
            link: 'bar--custom-legend-labels',
        },
    ],
}