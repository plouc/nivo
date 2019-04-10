/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { SwarmPlotDefaultProps } from '@nivo/swarmplot'
import {
    motionProperties,
    defsProperties,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const defaults = SwarmPlotDefaultProps

const props = [
    {
        key: 'data',
        help: 'Chart data.',
        description: `
            The Chart data is an array of datum which must conform to this structure:

            \`\`\`
            Array<{
                // Identifier of the serie
                id: string | number
                data: {
                    // Identifier of the datum
                    id:    string | number
                    value: number
                }
            }>
            \`\`\`
        `,
        type: 'object[]',
        group: 'Base',
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
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
        help: 'Chart height.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
    },
    {
        key: 'layout',
        scopes: '*',
        help: `Chart layout.`,
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
        key: 'forceStrength',
        help: 'Force strength.',
        description: `
            This value determine the strength applied on the value
            axis, using lower value will result in a **more linear
            arrangement**, however nodes won't be placed accurately
            according to their values.

            On the other hand, if you increase this value, the
            simulation will try to **align the nodes with their
            corresponding values** on the value axis, resulting
            in a narrower chart.
        `,
        type: 'number',
        required: false,
        defaultValue: defaults.forceStrength,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            step: 0.2,
            min: 0.2,
            max: 9,
        },
    },
    {
        key: 'simulationIterations',
        help: 'Adjust the simulation quality.',
        description: `
            Increasing this number will result in a **more accurate simulation**,
            however it will also involve more computing.
        `,
        type: 'number',
        required: false,
        defaultValue: defaults.simulationIterations,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 100,
            max: 300,
        },
    },
    {
        key: 'gap',
        help: 'Gap between each serie.',
        type: 'number',
        required: false,
        defaultValue: defaults.gap,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'pixelRatio',
        scopes: ['SwarmPlotCanvas'],
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
        key: 'nodeSize',
        help: 'Size of the nodes.',
        type: 'number',
        required: false,
        defaultValue: defaults.nodeSize,
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'nodePadding',
        help: 'Padding between nodes.',
        type: 'number',
        required: false,
        defaultValue: defaults.nodePadding,
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
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
        description: `
            The colors property is used to determine the **ordinal color scale**
            to use to compute nodes' color, it use the serie id as a discriminator.

            You can use a **predefined color scheme**, using the following form:

            \`\`\`
            colors={{ scheme: 'category10' }}
            \`\`\`

            Where \`category10\` is the identifier of the color scheme.
            Please have a look at [the dedicated guide](self:/guides/colors)
            for available schemes.

            If you wish to use **color bound to the data** you pass to the chart,
            you can also use this form:

            \`\`\`
            colors={{ datum: 'color' }}
            \`\`\`

            Where \`color\` is the path to the property containing the color
            to apply in the current datum.

            You can also use a **custom function** which will receive the current
            datum and must **return a valid color code**.

            If you pass a string, it will be **used as a color for each and every nodes**.
        `,
        type: `Function | object | string`,
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
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
    /*
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
    */
    ...defsProperties(['SwarmPlot']),
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
    ...motionProperties(['SwarmPlot'], defaults),
]

export const groupsByScope = {
    SwarmPlot: getPropertiesGroupsControls(props, 'SwarmPlot'),
    SwarmPlotCanvas: getPropertiesGroupsControls(props, 'SwarmPlotCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
