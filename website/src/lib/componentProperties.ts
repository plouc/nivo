import uniq from 'lodash/uniq.js'
import { defaultAnimate } from '@nivo/core'
import { TooltipPosition, TooltipAnchor } from '@nivo/tooltip'
import { Flavor, ChartProperty } from '../types'

export const themeProperty = (flavors: Flavor[]): ChartProperty => ({
    key: 'theme',
    group: 'Style',
    type: 'Theme',
    required: false,
    help: 'Define style for common elements such as labels, axes…',
    flavors,
    description: `
        Please have a look at [the dedicated guide](self:/guides/theming/)
        on how to define a theme for your charts. 
    `,
})

export const defsProperties = (group: string, flavors: Flavor[]): ChartProperty[] => [
    {
        key: 'defs',
        group,
        flavors,
        help: 'Define patterns and gradients.',
        description: `
            Supports
            [gradients](self:/guides/gradients/) and
            [patterns](self:/guides/patterns/).
        `,
        type: 'object[]',
        required: false,
    },
    {
        key: 'fill',
        group,
        flavors,
        help: 'Define rules to apply patterns and gradients',
        description: `
            Supports
            [gradients](self:/guides/gradients/) and
            [patterns](self:/guides/patterns/).
        `,
        type: 'object[]',
        required: false,
    },
]

export const motionProperties = (flavors: Flavor[], defaults: any): ChartProperty[] => {
    return [
        {
            key: 'animate',
            flavors,
            help: 'Enable/disable transitions.',
            type: 'boolean',
            required: false,
            defaultValue: defaults.animate !== undefined ? defaults.animate : defaultAnimate,
            control: { type: 'switch' },
            group: 'Motion',
        },
        {
            key: 'motionConfig',
            flavors,
            help: 'Motion config for react-spring, either a preset or a custom configuration.',
            type: 'string | object',
            required: false,
            defaultValue: defaults.motionConfig,
            control: { type: 'motionConfig' },
            group: 'Motion',
        },
    ]
}

export const getLegendsProps = (flavors: Flavor[]): Omit<ChartProperty, 'group'>[] => [
    {
        key: 'anchor',
        flavors,
        help: `Defines legend anchor relative to chart's viewport.`,
        type: 'string',
        required: false,
        control: { type: 'boxAnchor' },
    },
    {
        key: 'direction',
        flavors,
        help: `Legend direction, must be one of 'column', 'row'.`,
        type: `'column' | 'row'`,
        required: false,
        control: {
            type: 'radio',
            choices: [
                {
                    label: 'column',
                    value: 'column',
                },
                {
                    label: 'row',
                    value: 'row',
                },
            ],
        },
    },
    {
        key: 'justify',
        flavors,
        help: `Justify symbol and label.`,
        control: { type: 'switch' },
        type: 'boolean',
        required: false,
    },
    {
        key: 'translateX',
        flavors,
        help: `Legend block x translation.`,
        type: `number`,
        required: false,
        control: {
            type: 'range',
            min: -200,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'translateY',
        flavors,
        help: `Legend block y translation.`,
        type: `number`,
        required: false,
        control: {
            type: 'range',
            min: -200,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemWidth',
        flavors,
        help: `Legend item width.`,
        type: `number`,
        required: true,
        control: {
            type: 'range',
            min: 10,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemHeight',
        flavors,
        help: `Legend item height.`,
        type: `number`,
        required: true,
        control: {
            type: 'range',
            min: 10,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemsSpacing',
        flavors,
        help: `Spacing between each item.`,
        type: `number`,
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 60,
            unit: 'px',
        },
    },
    {
        key: 'symbolSize',
        flavors,
        help: `Item symbol size.`,
        type: `number`,
        required: false,
        control: {
            type: 'range',
            min: 2,
            max: 60,
            unit: 'px',
        },
    },
    {
        key: 'itemDirection',
        flavors,
        help: `Item layout direction.`,
        type: `string`,
        required: false,
        control: {
            type: 'choices',
            choices: ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'].map(
                v => ({
                    label: v,
                    value: v,
                })
            ),
        },
    },
]

export const groupProperties = (
    properties: ChartProperty[]
): {
    name: string
    properties: ChartProperty[]
}[] => {
    const groups: string[] = uniq(properties.map(property => property.group))
    const grouped: {
        name: string
        properties: ChartProperty[]
    }[] = groups.reduce(
        (acc, group) => {
            return [
                ...acc,
                {
                    name: group,
                    properties: properties
                        .filter(property => property.group === group)
                        .map(property => ({
                            ...property,
                            name: property.key,
                        })),
                },
            ]
        },
        [] as {
            name: string
            properties: ChartProperty[]
        }[]
    )

    return grouped
}

export const tooltipPositionProperty = ({
    group = 'Interactivity',
    key = 'tooltipPosition',
    help = `Define the tooltip positioning behavior.`,
    flavors,
    defaultValue,
}: {
    group?: string
    key?: string
    help?: string
    flavors: Flavor[]
    defaultValue?: TooltipPosition
}): ChartProperty => {
    return {
        key,
        group,
        help,
        description: `
            For the \`cursor\` mode, the tooltip is going to follow the cursor position,
            while for the \`fixed\` mode, the tooltip stays at the element's position. 
        `,
        type: `'cursor' | 'fixed'`,
        required: false,
        flavors,
        defaultValue,
        control: {
            type: 'radio',
            choices: [
                {
                    label: 'cursor',
                    value: 'cursor',
                },
                {
                    label: 'fixed',
                    value: 'fixed',
                },
            ],
        },
    }
}

export const tooltipAnchorProperty = ({
    group = 'Interactivity',
    key = 'tooltipAnchor',
    help = `Define the tooltip anchor.`,
    flavors,
    defaultValue,
}: {
    group?: string
    key?: string
    help?: string
    flavors: Flavor[]
    defaultValue?: TooltipAnchor
}): ChartProperty => {
    return {
        key,
        group,
        help,
        type: `'top' | 'right' | 'bottom' | 'left'`,
        required: false,
        flavors,
        defaultValue,
        control: {
            type: 'choices',
            choices: [
                {
                    label: 'top',
                    value: 'top',
                },
                {
                    label: 'right',
                    value: 'right',
                },
                {
                    label: 'bottom',
                    value: 'bottom',
                },
                {
                    label: 'left',
                    value: 'left',
                },
            ],
        },
    }
}

type PolarAxisProperty =
    | 'angle'
    | 'ticksPosition'
    | 'tickSize'
    | 'tickPadding'
    | 'tickRotation'
    | 'tickComponent'
    | 'style'

export const polarAxisProperty = ({
    key,
    flavors,
    tickComponent,
    exclude = [],
}: {
    key: string
    flavors: Flavor[]
    tickComponent: string
    exclude?: PolarAxisProperty[]
}): ChartProperty => {
    const props = [
        {
            key: 'enable',
            type: 'boolean',
            required: false,
            help: `enable ${key} axis, it's not an actual prop (demo only).`,
            flavors,
            excludeFromDoc: true,
            control: { type: 'switch' },
        },
        {
            key: 'angle',
            type: 'number',
            required: true,
            help: `${key} angle.`,
            flavors,
            control: {
                type: 'angle',
                start: 0,
                min: 0,
                max: 360,
            },
        },
        {
            key: 'ticksPosition',
            type: `'before' | 'after'`,
            required: true,
            help: `${key} ticks position, considering the current angle.`,
            flavors,
            control: {
                type: 'radio',
                choices: [
                    {
                        label: 'before',
                        value: 'before',
                    },
                    {
                        label: 'after',
                        value: 'after',
                    },
                ],
            },
        },
        {
            key: 'tickSize',
            type: 'number',
            required: false,
            help: `${key} axis tick size.`,
            flavors,
            control: {
                type: 'range',
                unit: 'px',
                min: 0,
                max: 20,
            },
        },
        {
            key: 'tickPadding',
            type: 'number',
            required: false,
            help: `${key} axis tick padding.`,
            flavors,
            control: {
                type: 'range',
                unit: 'px',
                min: 0,
                max: 20,
            },
        },
        {
            key: 'tickRotation',
            type: 'number',
            required: false,
            help: `${key} axis tick rotation.`,
            flavors,
            control: {
                type: 'angle',
                start: 90,
                min: -90,
                max: 90,
            },
        },
        {
            key: 'tickComponent',
            type: tickComponent,
            required: false,
            help: 'Override default tick component.',
            flavors,
        },
        {
            key: 'style',
            type: `PartialTheme['axis']`,
            required: false,
            flavors,
            help: `${key} axis style overrides.`,
            description: `
                The theme contains a single style for all axes,
                you can use this to override the style of a specific axis.
                
                Please note that the overrides are applied to the complete
                theme object computed internally:
                
                \`(theme prop <- default theme & inheritance) -> axis <- axis style\`
                
                You should try to define the style statically, or to memoize it
                in case it's dynamic.
            `,
        },
    ]

    const filteredProps = props.filter(prop => !exclude.includes(prop.key as PolarAxisProperty))

    return {
        key,
        group: 'Grid & Axes',
        help: `${key} axis configuration.`,
        type: 'object',
        required: false,
        flavors,
        control: {
            type: 'object',
            props: filteredProps,
        },
    }
}
