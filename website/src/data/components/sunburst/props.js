/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { defaultProps } from '@nivo/sunburst'
import { groupProperties, defsProperties, motionProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveSunburst/>\`.
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
            \`<ResponsiveSunburst/>\`.
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
        key: 'id',
        group: 'Base',
        help: 'Id accessor.',
        description: `
            define id accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            id (string | number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.id,
    },
    {
        key: 'value',
        group: 'Base',
        help: 'Value accessor',
        description: `
            define value accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            value (number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.value,
    },
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        required: false,
        defaultValue: defaultProps.colors,
        controlType: 'ordinalColors',
        type: 'string | Function | string[]',
        group: 'Base',
    },
    ...defsProperties('Style', ['svg', 'api']),
    {
        key: 'showcase pattern usage',
        flavors: ['svg'],
        help: 'Patterns.',
        description: `
            You can use \`defs\` and \`fill\` properties
            to use patterns, see
            [dedicated guide](self:/guides/patterns)
            for further information.
        `,
        type: 'boolean',
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.childColor,
        controlType: 'inheritedColor',
        group: 'Base',
    },
    {
        key: 'borderWidth',
        help: 'Node border width.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.borderWidth,
        controlType: 'lineWidth',
        group: 'Base',
    },
    {
        key: 'cornerRadius',
        help: 'Round node shape.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.cornerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.

            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Sunburst\` component.

            The context passed to layers has the following structure:

            \`\`\`
            {
                nodes:  ComputedDatum<RawDatum>[],
                arcGenerator: Function
                centerX:      number
                centerY:      number
                radius:       number
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaultProps.layers,
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        help: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        defaultValue: defaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
    {
        key: 'tooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following data:
            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        controlType: 'switch',
    },
    {
        key: 'onClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onClick handler',
        description: `
            onClick handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
        `,
    },
]

export const groups = groupProperties(props)
