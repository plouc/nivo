import { svgDefaultProps } from '@nivo/waffle-grid'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    motionConfigProperty,
} from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'number[][]',
        required: true,
        help: 'Chart data.',
        description: `
            Please note that the number of rows should match the length
            of \`yRange\` and each row number of columns should match
            the length of \`xRange\`.
        `,
        flavors: ['svg'],
    },
    {
        key: 'xRange',
        group: 'Base',
        type: 'string[]',
        required: true,
        help: 'X range.',
        flavors: ['svg'],
    },
    {
        key: 'yRange',
        group: 'Base',
        type: 'string[]',
        required: true,
        help: 'Y range.',
        flavors: ['svg'],
    },
    {
        key: 'width',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveRadialBar/>\`.
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
            \`<ResponsiveRadialBar/>\`.
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
        key: 'cellValue',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Define the value each cell represents.',
        flavors: ['svg'],
        controlType: 'range',
        controlOptions: {
            min: 500,
            max: 2000,
            step: 100,
            unit: 'px',
        },
    },
    {
        key: 'enableBlankCells',
        group: 'Base',
        type: 'boolean',
        required: false,
        help: 'Enable/disable blank cells.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.enableBlankCells,
        controlType: 'switch',
    },
    {
        key: 'spacing',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Spacing between each waffle.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.spacing,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 36,
            unit: 'px',
        },
    },
    themeProperty(['svg']),
    {
        key: 'layers',
        group: 'Customization',
        type: '(WaffleGridLayerId | WaffleGridCustomLayer)[]',
        required: false,
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
            
            The component will receive properties as defined in
            the \`WaffleGridCustomLayerProps\` interface
            and must return a valid SVG element.
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
    motionConfigProperty(
        'blankCellsMotionConfig',
        ['svg'],
        undefined,
        'Optional motion config override for blank cells, use global `motionConfig` if unspecified.'
    ),
    {
        key: 'blankCellsStaggeredDelay',
        group: 'Motion',
        type: 'number',
        required: false,
        help: 'Control the delay between each blank cell transition.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.blankCellsStaggeredDelay,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 20,
            unit: 'ms',
        },
    },
    motionConfigProperty(
        'valueCellsMotionConfig',
        ['svg'],
        undefined,
        'Optional motion config override for value cells, use global `motionConfig` if unspecified.'
    ),
    {
        key: 'valueCellsStaggeredDelay',
        group: 'Motion',
        type: 'number',
        required: false,
        help: 'Control the delay between each value cell transition.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.valueCellsStaggeredDelay,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 20,
            unit: 'ms',
        },
    },
]

export const groups = groupProperties(props)
