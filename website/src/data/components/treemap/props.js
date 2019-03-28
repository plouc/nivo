/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { TreeMapDefaultProps } from '@nivo/treemap'
import {
    motionProperties,
    defsProperties,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const defaults = TreeMapDefaultProps

const props = [
    {
        key: 'root',
        scopes: '*',
        group: 'Base',
        help: 'The hierarchical data object.',
        type: 'object',
        required: true,
    },
    {
        key: 'identity',
        scope: '*',
        group: 'Base',
        help: 'The key or function to use to retrieve nodes identity.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
    },
    {
        key: 'value',
        scope: '*',
        group: 'Base',
        help: 'The key or function to use to retrieve nodes value.',
        type: 'string | Function',
        required: false,
        defaultValue: 'value',
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart width.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart height.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
    },
    {
        key: 'pixelRatio',
        scopes: ['TreeMapCanvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'tile',
        scopes: '*',
        group: 'Base',
        help: 'Strategy used to compute nodes.',
        description: `
            Strategy used to compute nodes, see
            [official d3 documentation](https://github.com/mbostock/d3/wiki/Treemap-Layout#mode).
        `,
        type: 'string',
        required: false,
        defaultValue: 'squarify',
        controlType: 'choices',
        controlOptions: {
            choices: [
                { label: 'binary', value: 'binary' },
                { label: 'squarify', value: 'squarify' },
                { label: 'slice', value: 'slice' },
                { label: 'dice', value: 'dice' },
                { label: 'sliceDice', value: 'sliceDice' },
                {
                    label: 'resquarify',
                    value: 'resquarify',
                },
            ],
        },
    },
    {
        key: 'leavesOnly',
        scopes: '*',
        help: 'Only render leaf nodes (no parent).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.leavesOnly,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'innerPadding',
        scopes: '*',
        help: 'Padding between parent and child node.',
        type: 'number',
        required: false,
        defaultValue: defaults.innerPadding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'outerPadding',
        scopes: '*',
        help: 'Padding between parent and child node.',
        type: 'number',
        required: false,
        defaultValue: defaults.outerPadding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines how to compute node color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        help:
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color.',
        type: 'string | Function',
        required: false,
        defaultValue: 'depth',
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'depth',
                    value: 'depth',
                },
                {
                    label: 'name',
                    value: 'name',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'borderWidth',
        scopes: '*',
        help: 'Control node border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        scopes: '*',
        help: 'Method to compute border color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...defsProperties(['TreeMap']),
    {
        key: 'enableLabel',
        scopes: '*',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: true,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        scopes: '*',
        help: 'Label accessor.',
        description:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data and must return the desired label.',
        type: 'string | Function',
        required: false,
        controlType: 'choices',
        group: 'Labels',
        controlOptions: {
            choices: ['loc', 'name', `d => \`\${d.name} (\${d.loc})\``].map(prop => ({
                label: prop,
                value: prop,
            })),
        },
    },
    {
        key: 'labelSkipSize',
        scopes: '*',
        help:
            'Skip label rendering if node minimal side length is lower than given value, 0 to disable.',
        type: 'number',
        required: false,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'orientLabel',
        scopes: '*',
        help: 'Orient labels according to max node width/height.',
        type: 'boolean',
        required: false,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'labelTextColor',
        scopes: '*',
        help: 'Method to compute label text color.',
        type: 'string | Function',
        required: false,
        controlType: 'color',
        group: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['TreeMap', 'TreeMapHTML', 'TreeMapCanvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        scopes: ['TreeMap', 'TreeMapHTML', 'TreeMapCanvas'],
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: 'Function',
        required: false,
    },
    ...motionProperties(['TreeMap', 'TreeMapHTML', 'TreeMapPlaceholders'], defaults),
]

export const groupsByScope = {
    TreeMap: getPropertiesGroupsControls(props, 'TreeMap'),
    TreeMapHtml: getPropertiesGroupsControls(props, 'TreeMapHTML'),
    TreeMapCanvas: getPropertiesGroupsControls(props, 'TreeMapCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
