/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { TreeMapDefaultProps } from '@nivo/treemap'
import { motionProperties, defsProperties, groupProperties } from '../../../lib/componentProperties'

const defaults = TreeMapDefaultProps

const props = [
    {
        key: 'root',
        group: 'Base',
        help: 'The hierarchical data object.',
        type: 'object',
        required: true,
    },
    {
        key: 'identity',
        group: 'Base',
        help: 'The key or function to use to retrieve nodes identity.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
    },
    {
        key: 'value',
        group: 'Base',
        help: 'The key or function to use to retrieve nodes value.',
        type: 'string | Function',
        required: false,
        defaultValue: 'value',
    },
    {
        key: 'tile',
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
        help: 'Only render leaf nodes (no parent).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.leavesOnly,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'innerPadding',
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
        key: 'width',
        group: 'Base',
        enableControlForFlavors: ['api'],
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
        group: 'Base',
        enableControlForFlavors: ['api'],
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
        group: 'Base',
        flavors: ['canvas'],
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
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Control node border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'enableLabel',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: true,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
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
        help: 'Orient labels according to max node width/height.',
        type: 'boolean',
        required: false,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        type: 'string | object | Function',
        required: false,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'isInteractive',
        flavors: ['svg', 'html', 'canvas'],
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
        flavors: ['svg', 'html', 'canvas'],
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: 'Function',
        required: false,
    },
    ...motionProperties(['svg', 'html'], defaults),
]

export const groups = groupProperties(props)
