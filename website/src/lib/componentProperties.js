/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import upperFirst from 'lodash/upperFirst'
import uniq from 'lodash/uniq'
import { defaultAnimate, defaultMotionStiffness, defaultMotionDamping } from '@nivo/core'

export const defsProperties = scopes => [
    {
        key: 'defs',
        scopes,
        help: 'define SVG defs.',
        description: `
            define SVG defs, supports
            [gradients](self:/guides/gradients) and
            [patterns](self:/guides/patterns).
        `,
        type: 'object[]',
        required: false,
    },
    {
        key: 'fill',
        scopes,
        help: 'define rules to apply SVG defs',
        description: `
            define rules to apply SVG defs, supports
            [gradients](self:/guides/gradients) and
            [patterns](self:/guides/patterns).
        `,
        type: 'object[]',
        required: false,
    },
]

export const motionProperties = (scopes, defaults) => [
    {
        key: 'animate',
        scopes,
        help: 'Enable/disable transitions.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.animate !== undefined ? defaults.animate : defaultAnimate,
        controlType: 'switch',
        group: 'Motion',
    },
    {
        key: 'motionStiffness',
        scopes,
        help: 'Motion stiffness.',
        type: 'number',
        required: false,
        defaultValue:
            defaults.motionStiffness !== undefined
                ? defaults.motionStiffness
                : defaultMotionStiffness,
        controlType: 'range',
        group: 'Motion',
        controlOptions: {
            min: 0,
            max: 300,
            step: 5,
        },
    },
    {
        key: 'motionDamping',
        scopes,
        help: 'Motion damping.',
        type: 'number',
        required: false,
        defaultValue:
            defaults.motionDamping !== undefined ? defaults.motionDamping : defaultMotionDamping,
        controlType: 'range',
        group: 'Motion',
        controlOptions: {
            min: 0,
            max: 40,
        },
    },
]

export const axesProperties = [
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
].reduce((properties, { position }) => {
    const axisKey = upperFirst(position)

    return [
        ...properties,
        {
            key: `axis${axisKey}`,
            help: `${axisKey} axis configuration.`,
            type: 'object',
            required: false,
            group: 'Grid & Axes',
            controlType: 'object',
            controlOptions: {
                props: [
                    {
                        key: `enable`,
                        help: `enable ${axisKey} axis, it's not an actual prop (demo only).`,
                        controlType: 'switch',
                        excludeFromDoc: true,
                    },
                    {
                        key: `tickSize`,
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
                        help: `${axisKey} axis legend.`,
                        type: 'string',
                        controlType: 'text',
                    },
                    {
                        key: `legendOffset`,
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

export const getLegendsProps = () => [
    {
        key: 'anchor',
        help: `Defines legend anchor relative to chart's viewport.`,
        type: 'string',
        controlType: 'boxAnchor',
        controlOptions: {},
    },
    {
        key: 'direction',
        help: `Legend direction, must be one of 'column', 'row'.`,
        type: `'column' | 'row'`,
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
        help: `Justify symbol and label.`,
        controlType: 'switch',
        type: 'boolean',
    },
    {
        key: 'translateX',
        help: `Legend block x translation.`,
        type: `number`,
        controlType: 'range',
        controlOptions: {
            min: -200,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'translateY',
        help: `Legend block y translation.`,
        type: `number`,
        controlType: 'range',
        controlOptions: {
            min: -200,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemWidth',
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
        help: `Spacing between each item.`,
        type: `number`,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 60,
            unit: 'px',
        },
    },
    {
        key: 'symbolSize',
        help: `Item symbol size.`,
        type: `number`,
        controlType: 'range',
        controlOptions: {
            min: 2,
            max: 60,
            unit: 'px',
        },
    },
    {
        key: 'itemDirection',
        help: `Item layout direction.`,
        type: `string`,
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

export const filterPropertyByScope = (requiredScope, forDocumentation = false) => property => {
    if (forDocumentation === false) {
        return (
            property.scopes === undefined ||
            property.scopes === '*' ||
            property.scopes.includes(requiredScope)
        )
    }

    const { docScopes } = property
    if (docScopes === undefined) {
        return (
            property.scopes === undefined ||
            property.scopes === '*' ||
            property.scopes.includes(requiredScope)
        )
    }

    return docScopes === '*' || docScopes.includes(requiredScope)
}

export const filterPropertiesByScope = (properties, scope, forDocumentation = false) =>
    properties.filter(filterPropertyByScope(scope, forDocumentation))

export const getPropertiesGroupControls = (properties, group, scope) => {
    const scopeFilter = filterPropertyByScope(scope)

    return properties
        .filter(property => property.group === group && scopeFilter(property))
        .map(property => ({
            ...property,
            name: property.key,
        }))
}

export const getPropertiesGroupsControls = (properties, scope) => {
    const scopeFilter = filterPropertyByScope(scope)

    const groups = uniq(
        properties
            .filter(property => property.group !== undefined && scopeFilter(property))
            .map(property => property.group)
    )

    return groups.reduce((acc, group) => {
        return [
            ...acc,
            {
                name: group,
                properties: getPropertiesGroupControls(properties, group, scope),
            },
        ]
    }, [])
}
