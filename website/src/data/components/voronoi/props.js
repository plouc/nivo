/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { VoronoiDefaultProps as defaults } from '@nivo/voronoi'
import { groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
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
        help: 'Defines the x values domain.',
        type: '[number, number]',
        required: false,
        defaultValue: defaults.xDomain,
    },
    {
        key: 'yDomain',
        group: 'Base',
        help: 'Defines the y values domain.',
        type: '[number, number]',
        required: false,
        defaultValue: defaults.yDomain,
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveVoronoi/>\`.
        `,
        help: 'Chart width.',
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveVoronoi/>\`.
        `,
        help: 'Chart height.',
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'layers',
        flavors: ['svg'],
        group: 'Base',
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
        defaultValue: defaults.layers,
    },
    {
        key: 'enableLinks',
        help: 'Enable/disable links.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLinks,
        controlType: 'switch',
        group: 'Links',
    },
    {
        key: 'linkLineWidth',
        help: 'Links line width.',
        type: 'number',
        required: false,
        defaultValue: defaults.linkLineWidth,
        controlType: 'lineWidth',
        group: 'Links',
    },
    {
        key: 'linkLineColor',
        help: 'Links color.',
        type: 'string',
        required: false,
        defaultValue: defaults.linkLineColor,
        controlType: 'colorPicker',
        group: 'Links',
    },
    {
        key: 'enableCells',
        help: 'Enable/disable cells.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableCells,
        controlType: 'switch',
        group: 'Cells',
    },
    {
        key: 'cellLineWidth',
        help: 'Border width for cells.',
        type: 'number',
        required: false,
        defaultValue: defaults.cellLineWidth,
        controlType: 'lineWidth',
        group: 'Cells',
    },
    {
        key: 'cellLineColor',
        help: 'Border color for cells.',
        type: 'string',
        required: false,
        defaultValue: defaults.cellLineColor,
        controlType: 'colorPicker',
        group: 'Cells',
    },
    {
        key: 'enablePoints',
        help: 'Enable/disable points.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePoints,
        controlType: 'switch',
        group: 'Points',
    },
    {
        key: 'pointSize',
        help: 'Size of points.',
        type: 'number',
        required: false,
        defaultValue: defaults.siteSize,
        controlType: 'range',
        group: 'Points',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'pointColor',
        help: 'Points color.',
        type: 'string',
        required: false,
        defaultValue: defaults.pointColor,
        controlType: 'colorPicker',
        group: 'Points',
    },
]

export const groups = groupProperties(props)
