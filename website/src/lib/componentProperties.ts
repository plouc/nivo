import uniq from 'lodash/uniq'
import { defaultAnimate, defaultMotionStiffness, defaultMotionDamping } from '@nivo/core'
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

export const polarAxisProperty = ({
    key,
    flavors,
    tickComponent,
}: {
    key: string
    flavors: Flavor[]
    tickComponent: string
}): ChartProperty => {
    return {
        key,
        group: 'Grid & Axes',
        help: `${key} axis configuration.`,
        type: 'object',
        required: false,
        flavors,
        control: {
            type: 'object',
            props: [
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
            ],
        },
    }
}
