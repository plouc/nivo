/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BubbleDefaultProps as defaults } from '@nivo/circle-packing'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    groupProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'root',
        help: 'The hierarchical data object.',
        type: 'object',
        required: true,
        group: 'Base',
    },
    {
        key: 'identity',
        help: 'Define id accessor.',
        description: `
            define id accessor, if string given, will use
            \`datum[value]\`, if function given, it will be
            invoked for each node and will receive the node as
            first argument, it must return the node value.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
        group: 'Base',
    },
    {
        key: 'value',
        help: 'Define value accessor.',
        description: `
            define value accessor, if string given, will use
            \`datum[value]\`, if function given, it will be
            invoked for each node and will receive the node as
            first argument, it must return the node value.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: 'value',
        group: 'Base',
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using \`<ResponsiveBubble/>\`.
        `,
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
        help: 'Chart height.',
        description: `
            not required if using \`<ResponsiveBubble/>\`.
        `,
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
        key: 'pixelRatio',
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
        key: 'leavesOnly',
        help: 'Only render leaf nodes (skip parent nodes).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.leavesOnly,
        controlType: 'switch',
        group: 'Base',
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
        key: 'padding',
        help: 'Padding between each circle.',
        description: `
            Padding between adjacent circles.
            Please be aware that when zoomed
            this value will be affected by the zooming factor
            and is expressed in pixels. See the
            [official d3 documentation](https://github.com/d3/d3-hierarchy#pack_padding).
        `,
        type: 'number',
        required: false,
        defaultValue: defaults.padding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        description: `
            colors used to colorize the circles,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | Function | string[]',
        required: false,
        defaultValue: { scheme: 'nivo' },
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        type: 'string | Function',
        help: 'Property used to determine node color.',
        description: `
            Property to use to determine node color.
            If a function is provided, it will receive
            the current node data and must return
            a string or number which will be passed
            to the color generator.
        `,
        required: false,
        defaultValue: defaults.colorBy,
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
            ],
        },
    },
    {
        key: 'borderWidth',
        help: 'Width of circle border.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
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
        defaultValue: defaults.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        help: 'Label accessor.',
        description: `
            Defines how to get label text,
            can be a string (used to access current node data property)
            or a function which will receive the actual node data.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.label,
        controlType: 'choices',
        group: 'Labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id}: \${d.value}\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelFormat',
        group: 'Labels',
        help: 'Labels formatting.',
        description: `
            How to format label,
            [see d3.format() documentation](https://github.com/d3/d3-format/blob/master/README.md#format).
        `,
        type: 'string | Function',
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'labelSkipRadius',
        help: 'Skip label rendering if node radius is lower than given value, 0 to disable.',
        type: 'number',
        required: false,
        defaultValue: defaults.labelSkipRadius,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'isInteractive',
        flavors: ['svg', 'html'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'isZoomable',
        flavors: ['svg', 'html'],
        help: `Enable/disable zooming ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.isZoomable,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        flavors: ['svg', 'html'],
        help: 'onClick handler, it receives clicked node data and mouse event.',
        type: 'Function',
        required: false,
    },
    ...motionProperties(['svg', 'html'], defaults),
]

export const groups = groupProperties(props)
