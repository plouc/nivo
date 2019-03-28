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
    motionProperties,
    defsProperties,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'root',
        scopes: '*',
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
        scopes: ['api'],
        docScopes: '*',
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
        scopes: ['api'],
        docScopes: '*',
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
        scopes: ['BubbleCanvas'],
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
        scopes: '*',
        help: 'Only render leaf nodes (skip parent nodes).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.leavesOnly,
        controlType: 'switch',
        group: 'Base',
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
        key: 'padding',
        scopes: '*',
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
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines how to compute node color.',
        description: `
            colors used to colorize the circles,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        help: 'Node color.',
        description: `
            Property to use to determine node color.
            If a function is provided, it will receive current
            node data and must return a valide color.
        `,
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
        help: 'Width of circle border.',
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
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...defsProperties(['Bubble']),
    {
        key: 'enableLabel',
        scopes: '*',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        scopes: '*',
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
        scopes: '*',
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
        scopes: '*',
        help: 'Method to compute label text color.',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        controlType: 'color',
        group: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'labelSkipRadius',
        scopes: '*',
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
        scopes: ['Bubble', 'BubbleHtml'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'isZoomable',
        scopes: ['Bubble', 'BubbleHtml'],
        help: `Enable/disable zooming ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.isZoomable,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['Bubble', 'BubbleHtml'],
        help: 'onClick handler, it receives clicked node data and mouse event.',
        type: 'Function',
        required: false,
    },
    ...motionProperties(['Bubble', 'BubbleHtml'], defaults),
]

export const groupsByScope = {
    Bubble: getPropertiesGroupsControls(props, 'Bubble'),
    BubbleHtml: getPropertiesGroupsControls(props, 'BubbleHtml'),
    BubbleCanvas: getPropertiesGroupsControls(props, 'BubbleCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
