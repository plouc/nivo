import React from 'react'
import { Link } from 'react-router-dom'
import upperFirst from 'lodash/upperFirst'
import uniq from 'lodash/uniq'
import { defaultAnimate, defaultMotionStiffness, defaultMotionDamping } from '@nivo/core'

export const defsProperties = scopes => [
    {
        key: 'defs',
        scopes,
        description: (
            <span>
                define SVG defs, supports <Link to="/guides/gradients">gradients</Link> and{' '}
                <Link to="/guides/patterns">patterns</Link>.
            </span>
        ),
        type: '{Array.<Object>}',
        required: false,
    },
    {
        key: 'fill',
        scopes,
        description: (
            <span>
                define rules to apply SVG defs, supports{' '}
                <Link to="/guides/gradients">gradients</Link> and{' '}
                <Link to="/guides/patterns">patterns</Link>.
            </span>
        ),
        type: '{Array.<Object>}',
        required: false,
    },
]

export const motionProperties = (scopes, defaults) => [
    {
        key: 'animate',
        scopes,
        description: 'Enable/disable transitions.',
        type: '{boolean}',
        required: false,
        default: defaults.animate !== undefined ? defaults.animate : defaultAnimate,
        controlType: 'switch',
        controlGroup: 'Motion',
    },
    {
        key: 'motionStiffness',
        scopes,
        description: 'Motion stiffness.',
        type: '{number}',
        required: false,
        default:
            defaults.motionStiffness !== undefined
                ? defaults.motionStiffness
                : defaultMotionStiffness,
        controlType: 'range',
        controlGroup: 'Motion',
        controlOptions: {
            min: 0,
            max: 300,
            step: 5,
        },
    },
    {
        key: 'motionDamping',
        scopes,
        description: 'Motion damping.',
        type: '{number}',
        required: false,
        default:
            defaults.motionDamping !== undefined ? defaults.motionDamping : defaultMotionDamping,
        controlType: 'range',
        controlGroup: 'Motion',
        controlOptions: {
            min: 0,
            max: 40,
        },
    },
]

export const marginProperties = ['top', 'right', 'bottom', 'left'].map(marginType => ({
    key: `margin.${marginType}`,
    scopes: '*',
    description: `${upperFirst(marginType)} margin (px).`,
    type: '{number}',
    controlType: 'range',
    controlGroup: 'Margin',
    controlOptions: {
        unit: 'px',
        min: 0,
        max: 320,
    },
}))

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
            description: `${axisKey} axis configuration.`,
            type: '{object}',
            required: false,
            controlGroup: 'Grid & Axes',
            controlType: 'object',
            controlOptions: {
                props: [
                    {
                        key: `enable`,
                        description: `enable ${axisKey} axis.`,
                        controlType: 'switch',
                        excludeFromDoc: true,
                    },
                    {
                        key: `tickSize`,
                        description: `${axisKey} axis tick size.`,
                        type: '{number}',
                        controlType: 'range',
                        controlOptions: {
                            unit: 'px',
                            min: 0,
                            max: 20,
                        },
                    },
                    {
                        key: `tickPadding`,
                        description: `${axisKey} axis tick padding.`,
                        type: '{number}',
                        controlType: 'range',
                        controlOptions: {
                            unit: 'px',
                            min: 0,
                            max: 20,
                        },
                    },
                    {
                        key: `tickRotation`,
                        description: `${axisKey} axis tick rotation.`,
                        type: '{number}',
                        controlType: 'range',
                        controlOptions: {
                            unit: '°',
                            min: -90,
                            max: 90,
                        },
                    },
                    {
                        key: `legend`,
                        description: `${axisKey} axis legend.`,
                        type: '{number}',
                        controlType: 'text',
                    },
                    {
                        key: `legendOffset`,
                        description: `${axisKey} axis legend offset from axis.`,
                        type: '{number}',
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
        description: `Defines legend anchor relative to chart's viewport.`,
        type: '{string}',
        controlType: 'choices',
        controlOptions: {
            choices: [
                'top',
                'top-right',
                'right',
                'bottom-right',
                'bottom',
                'bottom-left',
                'left',
                'top-left',
                'center',
            ].map(v => ({
                label: v,
                value: v,
            })),
        },
    },
    {
        key: 'direction',
        description: `Legend direction, must be one of 'column', 'row'.`,
        type: `{'column'|'row'}`,
        controlType: 'choices',
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
        description: `Justify symbol and label.`,
        controlType: 'switch',
    },
    {
        key: 'translateX',
        description: `Legend block x translation.`,
        type: `{number}`,
        controlType: 'range',
        controlOptions: {
            min: -200,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'translateY',
        description: `Legend block y translation.`,
        type: `{number}`,
        controlType: 'range',
        controlOptions: {
            min: -200,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemWidth',
        description: `Legend item width.`,
        type: `{number}`,
        controlType: 'range',
        controlOptions: {
            min: 10,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemHeight',
        description: `Legend item height.`,
        type: `{number}`,
        controlType: 'range',
        controlOptions: {
            min: 10,
            max: 200,
            unit: 'px',
        },
    },
    {
        key: 'itemsSpacing',
        description: `Spacing between each item.`,
        type: `{number}`,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 60,
            unit: 'px',
        },
    },
    {
        key: 'symbolSize',
        description: `Item symbol size.`,
        type: `{number}`,
        controlType: 'range',
        controlOptions: {
            min: 2,
            max: 60,
            unit: 'px',
        },
    },
    {
        key: 'itemDirection',
        description: `Item layout, must be one of 'left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'.`,
        type: `{string}`,
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
        .filter(property => property.controlGroup === group && scopeFilter(property))
        .map(property => ({
            name: property.key,
            help: property.help || property.description,
            type: property.controlType,
            ...(property.controlOptions || {}),
        }))
}

export const getPropertiesGroupsControls = (properties, scope) => {
    const scopeFilter = filterPropertyByScope(scope)

    const groups = uniq(
        properties
            .filter(property => property.controlGroup !== undefined && scopeFilter(property))
            .map(property => property.controlGroup)
    )

    return groups.reduce((acc, group) => {
        return [
            ...acc,
            {
                name: group,
                controls: getPropertiesGroupControls(properties, group, scope),
            },
        ]
    }, [])
}
