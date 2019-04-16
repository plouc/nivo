/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { SankeyDefaultProps as defaults, sankeyAlignmentPropKeys } from '@nivo/sankey'
import { motionProperties, getPropertiesGroupsControls } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        scopes: '*',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            {
                nodes: Array<{
                    id: string | number
                }>,
                links: Array<{
                    source: string | number, // ref to node id
                    target: string | number, // ref to node id
                    value:  number
                }}>
            }
            \`\`\`
        `,
        type: '{ nodes: object[], links: object[] }',
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: `
            not required if using
            \`<ResponsiveSankey/>\`.
        `,
        help: 'Chart width.',
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        description: `
            not required if using
            \`<ResponsiveSankey/>\`.
        `,
        help: 'Chart height.',
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'layout',
        scopes: '*',
        help: `Control sankey layout direction.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'align',
        scopes: '*',
        group: 'Base',
        help: 'Node alignment method.',
        description: `
            Defines node alignment method.
            Please have a look at the
            [official d3 documentation](https://github.com/d3/d3-sankey#sankey_nodeAlign)
            for further information.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.align,
        controlType: 'choices',
        controlOptions: {
            choices: sankeyAlignmentPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'sort',
        scopes: '*',
        description: `
            Defines node sorting method. Must be one of:

            - **'auto'** order of nodes within each
              column is determined automatically by the layout.
            - **'input'** order is fixed by the input.
            - **'ascending'** node with lower values on top.
            - **'descending'** node with higher values on top.
            - \`(nodeA, nodeB) => number\` user defined function.

            Please have a look at the
            [official d3 documentation](https://github.com/d3/d3-sankey#sankey_nodeSort)
            for further information.
        `,
        help: 'Node sorting method.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.sort,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: ['auto', 'input', 'ascending', 'descending'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines how to compute nodes color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
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
        key: 'nodeThickness',
        scopes: ['Sankey'],
        help: 'Node thickness.',
        required: false,
        defaultValue: defaults.nodeThickness,
        type: 'number',
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 100,
        },
    },
    {
        key: 'nodeOpacity',
        scopes: '*',
        help: 'Node opacity (0~1).',
        required: false,
        defaultValue: defaults.nodeOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Nodes',
    },
    {
        key: 'nodeHoverOpacity',
        scopes: ['Sankey'],
        help: 'Node opacity on hover (0~1).',
        required: false,
        defaultValue: defaults.nodeHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Nodes',
    },
    {
        key: 'nodeSpacing',
        scopes: ['Sankey'],
        help: 'Spacing between nodes at an identical level.',
        required: false,
        defaultValue: defaults.nodeSpacing,
        type: 'number',
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'nodeInnerPadding',
        scopes: ['Sankey'],
        help: 'Node inner padding, distance from link, substracted from nodeThickness.',
        required: false,
        defaultValue: defaults.nodePaddingX,
        type: 'number',
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'nodeBorderWidth',
        scopes: '*',
        help: 'Node border width.',
        required: false,
        defaultValue: defaults.nodeBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Nodes',
    },
    {
        key: 'nodeBorderColor',
        scopes: '*',
        description: `
            how to compute node border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute node border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.nodeBorderColor,
        controlType: 'inheritedColor',
        group: 'Nodes',
    },
    {
        key: 'linkOpacity',
        scopes: '*',
        help: 'Link opacity (0~1).',
        required: false,
        defaultValue: defaults.linkOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Links',
    },
    {
        key: 'linkHoverOpacity',
        scopes: ['Sankey'],
        help: 'Link opacity on hover(0~1).',
        required: false,
        defaultValue: defaults.linkHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Links',
    },
    {
        key: 'linkContract',
        scopes: '*',
        help: 'Contract link width.',
        required: false,
        defaultValue: defaults.linkContract,
        type: 'number',
        controlType: 'range',
        group: 'Links',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'linkBlendMode',
        scopes: ['Sankey'],
        help: 'Defines CSS mix-blend-mode property for links.',
        description: `
            Defines CSS \`mix-blend-mode\` property for links, see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.linkBlendMode,
        controlType: 'choices',
        group: 'Links',
        controlOptions: {
            choices: [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
            ].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'enableLinkGradient',
        scopes: ['Sankey'],
        help: 'Enable/disable gradient from source/target nodes instead of plain color.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLinkGradient,
        controlType: 'switch',
        group: 'Links',
    },
    {
        key: 'enableLabels',
        scopes: '*',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabels,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'labelPosition',
        scopes: '*',
        help: 'Label position.',
        type: 'string',
        required: false,
        defaultValue: defaults.labelPosition,
        controlType: 'radio',
        group: 'Labels',
        controlOptions: {
            choices: ['inside', 'outside'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'labelPadding',
        scopes: '*',
        help: 'Label padding from node.',
        required: false,
        defaultValue: defaults.labelPadding,
        type: 'number',
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'labelTextColor',
        scopes: '*',
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
        key: 'labelOrientation',
        scopes: '*',
        help: 'Label orientation.',
        type: 'string',
        required: false,
        defaultValue: defaults.labelOrientation,
        controlType: 'radio',
        group: 'Labels',
        controlOptions: {
            choices: ['horizontal', 'vertical'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'isInteractive',
        scopes: ['Sankey'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['Sankey'], defaults),
]

export const groupsByScope = {
    Sankey: getPropertiesGroupsControls(props, 'Sankey'),
    api: getPropertiesGroupsControls(props, 'api'),
}
