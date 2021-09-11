import upperFirst from 'lodash/upperFirst'
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
        Please have a look at [the dedicated guide](self:/guides/theming)
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

export const motionProperties = (
    flavors: Flavor[],
    defaults: any,
    type: 'react-spring' | 'react-motion' = 'react-motion'
): ChartProperty[] => {
    const props: ChartProperty[] = [
        {
            key: 'animate',
            flavors,
            help: 'Enable/disable transitions.',
            type: 'boolean',
            required: false,
            defaultValue: defaults.animate !== undefined ? defaults.animate : defaultAnimate,
            controlType: 'switch',
            group: 'Motion',
        },
    ]

    if (type === 'react-motion') {
        props.push({
            key: 'motionStiffness',
            flavors,
            help: 'Motion stiffness.',
            type: 'number',
            required: false,
            defaultValue:
                defaults.motionStiffness !== undefined
                    ? defaults.motionStiffness
                    : defaultMotionStiffness,
            group: 'Motion',
            controlType: 'range',
            controlOptions: {
                min: 0,
                max: 300,
                step: 5,
            },
        })
        props.push({
            key: 'motionDamping',
            flavors,
            help: 'Motion damping.',
            type: 'number',
            required: false,
            defaultValue:
                defaults.motionDamping !== undefined
                    ? defaults.motionDamping
                    : defaultMotionDamping,
            controlType: 'range',
            group: 'Motion',
            controlOptions: {
                min: 0,
                max: 40,
            },
        })
    } else if (type === 'react-spring') {
        props.push({
            key: 'motionConfig',
            flavors,
            help: 'Motion config for react-spring, either a preset or a custom configuration.',
            type: 'string | object',
            required: false,
            defaultValue: defaults.motionConfig,
            controlType: 'motionConfig',
            group: 'Motion',
        })
    }

    return props
}

export const axesProperties = ({
    flavors,
    exclude = [],
}: {
    flavors?: Flavor[]
    exclude?: string[]
} = {}): ChartProperty[] =>
    [
        {
            position: 'top',
            orientations: ['top', 'bottom'],
        },
        {
            position: 'right',
            orientations: ['left', 'right'],
        },
        {
            position: 'bottom',
            orientations: ['top', 'bottom'],
        },
        {
            position: 'left',
            orientations: ['left', 'right'],
        },
    ]
        .filter(axis => !exclude.includes(axis.position))
        .reduce((properties: any[], { position }) => {
            const axisKey = upperFirst(position)

            return [
                ...properties,
                {
                    key: `axis${axisKey}`,
                    flavors,
                    help: `${axisKey} axis configuration.`,
                    type: 'object',
                    required: false,
                    group: 'Grid & Axes',
                    controlType: 'object',
                    controlOptions: {
                        props: [
                            {
                                key: `enable`,
                                flavors,
                                help: `enable ${axisKey} axis, it's not an actual prop (demo only).`,
                                controlType: 'switch',
                                excludeFromDoc: true,
                            },
                            {
                                key: `tickSize`,
                                flavors,
                                help: `${axisKey} axis tick size.`,
                                type: 'number',
                                controlType: 'range',
                                controlOptions: {
                                    unit: 'px',
                                    min: 0,
                                    max: 20,
                                },
                            },
                            {
                                key: `tickPadding`,
                                flavors,
                                help: `${axisKey} axis tick padding.`,
                                type: 'number',
                                controlType: 'range',
                                controlOptions: {
                                    unit: 'px',
                                    min: 0,
                                    max: 20,
                                },
                            },
                            {
                                key: `tickRotation`,
                                flavors,
                                help: `${axisKey} axis tick rotation.`,
                                type: 'number',
                                controlType: 'angle',
                                controlOptions: {
                                    start: 90,
                                    min: -90,
                                    max: 90,
                                },
                            },
                            {
                                key: `legend`,
                                flavors,
                                help: `${axisKey} axis legend.`,
                                type: 'string',
                                controlType: 'text',
                            },
                            {
                                key: `legendOffset`,
                                flavors,
                                help: `${axisKey} axis legend offset from axis.`,
                                type: 'number',
                                controlType: 'range',
                                controlOptions: {
                                    unit: 'px',
                                    min: -60,
                                    max: 60,
                                },
                            },
                        ],
                    },
                },
            ]
        }, [])

export const getLegendsProps = (flavors: Flavor[]): Omit<ChartProperty, 'group'>[] => [
    {
        key: 'anchor',
        flavors,
        help: `Defines legend anchor relative to chart's viewport.`,
        type: 'string',
        required: false,
        controlType: 'boxAnchor',
    },
    {
        key: 'direction',
        flavors,
        help: `Legend direction, must be one of 'column', 'row'.`,
        type: `'column' | 'row'`,
        required: false,
        controlType: 'radio',
        controlOptions: {
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
        controlType: 'switch',
        type: 'boolean',
        required: false,
    },
    {
        key: 'translateX',
        flavors,
        help: `Legend block x translation.`,
        type: `number`,
        required: false,
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'choices',
        controlOptions: {
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
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'enable',
                    type: 'boolean',
                    required: false,
                    help: `enable ${key} axis, it's not an actual prop (demo only).`,
                    flavors,
                    excludeFromDoc: true,
                    controlType: 'switch',
                },
                {
                    key: 'tickSize',
                    type: 'number',
                    required: false,
                    help: `${key} axis tick size.`,
                    flavors,
                    controlType: 'range',
                    controlOptions: {
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
                    controlType: 'range',
                    controlOptions: {
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
                    controlType: 'angle',
                    controlOptions: {
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
