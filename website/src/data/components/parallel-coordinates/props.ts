// @ts-ignore
import { lineCurvePropKeys } from '@nivo/core'
// @ts-ignore
import { commonDefaultProps as defaults } from '@nivo/parallel-coordinates'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { chartDimensions, ordinalColors } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart data.',
        type: 'Array<object | Array>',
        required: true,
    },
    {
        key: 'variables',
        type: 'object[]',
        flavors: allFlavors,
        help: 'Variables configuration.',
        description: `
            Variables configuration, define accessor (\`key\`)
            and variable type. Type must be one of
            \`linear\` or \`point\`, \`linear\`
            variables are suitable for continuous numerical
            data such as age or cost while
            \`point\` variables are suitable for
            discrete values such as gender.
        `,
        group: 'Variables',
        required: true,
        control: {
            type: 'array',
            shouldCreate: false,
            shouldRemove: false,
            getItemTitle: (_index: number, values: any) => `${values.key} (${values.type})`,
            props: [
                {
                    key: 'key',
                    help: 'Variable key, used to access to corresponding datum value.',
                    flavors: allFlavors,
                    type: 'string',
                    required: true,
                    control: {
                        type: 'text',
                        disabled: true,
                    },
                },
                {
                    key: 'type',
                    help: `Variable type, must be one of: 'linear', 'point'.`,
                    flavors: allFlavors,
                    type: `'linear' | 'point'`,
                    required: true,
                    control: {
                        type: 'text',
                        disabled: true,
                    },
                },
                {
                    key: 'min',
                    help: 'Min value of linear scale.',
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    required: false,
                    when: ({ type }) => type === 'linear',
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'max',
                    help: 'Max value of linear scale.',
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    required: false,
                    when: ({ type }) => type === 'linear',
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 1000,
                        min: -100,
                        max: 100,
                    },
                },
                // {
                //     key: 'padding',
                //     help: 'Outer padding (0~1).',
                //     type: `number`,
                //     controlType: 'range',
                //     controlOptions: {
                //         when: ({ type }) => type === 'point',
                //         min: 0,
                //         max: 1,
                //         step: 0.01,
                //     },
                // },
            ],
        },
    },
    {
        key: 'layout',
        help: `Chart layout.`,
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        group: 'Base',
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'curve',
        help: 'Curve interpolation.',
        flavors: allFlavors,
        description: `
            Defines the curve factory to use for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        group: 'Base',
        control: {
            type: 'choices',
            choices: lineCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'axesPlan',
        help: `Axes plan.`,
        flavors: allFlavors,
        type: `string`,
        required: false,
        defaultValue: defaults.axesPlan,
        group: 'Base',
        control: {
            type: 'radio',
            choices: [
                { label: 'foreground', value: 'foreground' },
                { label: 'background', value: 'background' },
            ],
        },
    },
    {
        key: 'axesTicksPosition',
        help: `Axes ticks position.`,
        flavors: allFlavors,
        type: `string`,
        required: false,
        defaultValue: defaults.axesTicksPosition,
        group: 'Base',
        control: {
            type: 'radio',
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(['svg', 'canvas']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'strokeWidth',
        help: 'Lines stroke width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.strokeWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'lineOpacity',
        help: 'Lines opacity.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.lineOpacity,
        control: { type: 'opacity' },
        group: 'Style',
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
