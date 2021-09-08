import { svgDefaultProps } from '@nivo/radial-bar'
import { arcTransitionModes } from '@nivo/arcs'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'object[]',
        required: true,
        help: 'Chart data.',
        description: `
            Here is what the data for a single chart with 2 bars would look like:
            
            \`\`\`
            [
                {
                    id: 'Fruits',
                    data: [{ x: 'Apples', y: 32 }]
                },
                {
                    id: 'Vegetables',
                    data: [{ x: 'Eggplants', y: 27 }]
                }
            ]
            \`\`\`
            
            You can add several metrics per group:
            
            \`\`\`
            [
                {
                    id: 'Fruits',
                    data: [
                        { x: 'Apples', y: 32 },
                        { x: 'Mangoes', y: 15 }
                    ]
                },
                {
                    id: 'Vegetables',
                    data: [
                        { x: 'Eggplants', y: 27 },
                        { x: 'Avocados', y: 34 }
                    ]
                }
            ]
            \`\`\`
            
            When a bar is computed, the \`id\` is going to be added
            as the \`groupId\`, \`x\` as the \`category\` and \`y\`
            as the value, for example the first bar for the number of Apples
            in the Fruits group would be:
            
            \`\`\`
            {
                groupId: 'Fruits',
                category: 'Apples',
                value: 32
            }
            \`\`\`
            
            You might read those values when adding an \`onClick\` handler
            for example, or when customizing the tooltip.
        `,
        flavors: ['svg'],
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | (value: number) => string',
        required: false,
        help: 'Optional formatter for values (`y`).',
        description: `
            The formatted value can then be used for labels & tooltips.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        flavors: ['svg'],
        controlType: 'valueFormat',
    },
    {
        key: 'width',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        group: 'Base',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        flavors: ['svg'],
        controlType: 'margin',
    },
    {
        key: 'startAngle',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Start angle (in degrees).',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.startAngle,
        controlType: 'angle',
        controlOptions: {
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'End angle (in degrees).',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.endAngle,
        controlType: 'angle',
        controlOptions: {
            min: -360,
            max: 360,
            step: 5,
        },
    },
    themeProperty(['svg']),
    {
        key: 'colors',
        group: 'Style',
        type: 'string | Function | string[]',
        required: false,
        help: 'Defines how to compute colors.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.colors,
        controlType: 'ordinalColors',
    },
    {
        key: 'cornerRadius',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Rounded corners.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.cornerRadius,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'enableLabels',
        group: 'Labels',
        type: 'boolean',
        required: false,
        help: 'Enable/disable labels.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.enableLabels,
        controlType: 'switch',
    },
    {
        key: 'label',
        group: 'Labels',
        type: 'string | (bar: ComputedBar) => string',
        required: false,
        help:
            'Defines how to get label text, can be a string (used to access current bar property) or a function which will receive the actual bar data.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.label,
        controlType: 'choices',
        controlOptions: {
            choices: ['category', 'groupId', 'value', 'formattedValue'].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelsSkipAngle',
        group: 'Labels',
        type: 'number',
        required: false,
        help: `Skip label if corresponding arc's angle is lower than provided value.`,
        flavors: ['svg'],
        defaultValue: svgDefaultProps.labelsSkipAngle,
        controlType: 'range',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'labelsRadiusOffset',
        group: 'Labels',
        type: 'number',
        required: false,
        help: `
            Define the radius to use to determine the label position, starting from inner radius,
            this is expressed as a ratio. Centered at 0.5 by default.
        `,
        flavors: ['svg'],
        defaultValue: svgDefaultProps.labelsRadiusOffset,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'labelsTextColor',
        group: 'Labels',
        help: 'Defines how to compute label text color.',
        type: 'string | object | Function',
        required: false,
        flavors: ['svg'],
        defaultValue: svgDefaultProps.labelsTextColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'layers',
        group: 'Customization',
        type: '(RadialBarLayerId | RadialBarCustomLayer)[]',
        required: false,
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
            
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element.
        `,
        flavors: ['svg'],
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        help: 'Enable/disable interactivity.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'RadialBarTooltipComponent',
        required: false,
        help: 'Override default tooltip.',
        flavors: ['svg'],
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onClick handler.',
        flavors: ['svg'],
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onMouseEnter handler.',
        flavors: ['svg'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onMouseMove handler.',
        flavors: ['svg'],
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onMouseLeave handler.',
        flavors: ['svg'],
    },
    {
        key: 'role',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element role attribute.',
        flavors: ['svg'],
    },
    {
        key: 'ariaLabel',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
        flavors: ['svg'],
    },
    {
        key: 'ariaLabelledBy',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
        flavors: ['svg'],
    },
    {
        key: 'ariaDescribedBy',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
        flavors: ['svg'],
    },
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
    {
        key: 'transitionMode',
        flavors: ['svg'],
        help: 'Define how transitions behave.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.transitionMode,
        controlType: 'choices',
        group: 'Motion',
        controlOptions: {
            choices: arcTransitionModes.map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
]

export const groups = groupProperties(props)
