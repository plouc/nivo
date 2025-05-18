import { defaultVoronoiProps } from '@nivo/voronoi'
import { groupProperties } from '../../../lib/componentProperties'
import { chartDimensions, chartRef } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array.<{
                id: string | number,
                x:  number,
                y:  number
            }>
            \`\`\`
        `,
        type: 'object[]',
        required: true,
    },
    {
        key: 'xDomain',
        group: 'Base',
        flavors: allFlavors,
        help: 'Defines the x values domain.',
        type: '[number, number]',
        required: false,
        defaultValue: defaultVoronoiProps.xDomain,
    },
    {
        key: 'yDomain',
        group: 'Base',
        flavors: allFlavors,
        help: 'Defines the y values domain.',
        type: '[number, number]',
        required: false,
        defaultValue: defaultVoronoiProps.yDomain,
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg']),
    {
        key: 'layers',
        flavors: allFlavors,
        group: 'Customization',
        type: 'string | Component',
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`links\`, \`cells\`, \`points\`, \`bounds\`.

            You can also use this to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart computed
            data and must return a valid SVG element.
        `,
        required: false,
        defaultValue: defaultVoronoiProps.layers,
    },
    {
        key: 'enableLinks',
        help: 'Enable/disable links.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultVoronoiProps.enableLinks,
        control: { type: 'switch' },
        group: 'Links',
    },
    {
        key: 'linkLineWidth',
        help: 'Links line width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultVoronoiProps.linkLineWidth,
        control: { type: 'lineWidth' },
        group: 'Links',
    },
    {
        key: 'linkLineColor',
        help: 'Links color.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaultVoronoiProps.linkLineColor,
        control: { type: 'colorPicker' },
        group: 'Links',
    },
    {
        key: 'enableCells',
        help: 'Enable/disable cells.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultVoronoiProps.enableCells,
        control: { type: 'switch' },
        group: 'Cells',
    },
    {
        key: 'cellLineWidth',
        help: 'Border width for cells.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultVoronoiProps.cellLineWidth,
        control: { type: 'lineWidth' },
        group: 'Cells',
    },
    {
        key: 'cellLineColor',
        help: 'Border color for cells.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaultVoronoiProps.cellLineColor,
        control: { type: 'colorPicker' },
        group: 'Cells',
    },
    {
        key: 'enablePoints',
        help: 'Enable/disable points.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultVoronoiProps.enablePoints,
        control: { type: 'switch' },
        group: 'Points',
    },
    {
        key: 'pointSize',
        help: 'Size of points.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultVoronoiProps.pointSize,
        group: 'Points',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'pointColor',
        help: 'Points color.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaultVoronoiProps.pointColor,
        control: { type: 'colorPicker' },
        group: 'Points',
    },
]

export const groups = groupProperties(props)
