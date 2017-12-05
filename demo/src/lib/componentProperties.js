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
            description: `${axisKey} axis.`,
            type: '{Object}',
            required: false,
        },
        {
            key: `enable axis${axisKey}`,
            description: `enable ${axisKey} axis.`,
            controlType: 'switch',
            controlGroup: 'Axes',
            excludeFromDoc: true,
        },
        //{
        //    key: `axis${axisKey}.orient`,
        //    description: `${axisKey} axis orientation.`,
        //    type: '{string}',
        //    controlType: 'choices',
        //    controlGroup: 'Axes',
        //    controlOptions: {
        //        choices: orientations.map(orientation => ({
        //            label: orientation,
        //            value: orientation,
        //        })),
        //    },
        //},
        {
            key: `axis${axisKey}.tickSize`,
            description: `${axisKey} axis tick size.`,
            type: '{number}',
            controlType: 'range',
            controlGroup: 'Axes',
            controlOptions: {
                unit: 'px',
                min: 0,
                max: 20,
            },
        },
        {
            key: `axis${axisKey}.tickPadding`,
            description: `${axisKey} axis tick padding.`,
            type: '{number}',
            controlType: 'range',
            controlGroup: 'Axes',
            controlOptions: {
                unit: 'px',
                min: 0,
                max: 20,
            },
        },
        {
            key: `axis${axisKey}.tickRotation`,
            description: `${axisKey} axis tick rotation.`,
            type: '{number}',
            controlType: 'range',
            controlGroup: 'Axes',
            controlOptions: {
                unit: 'deg',
                min: -90,
                max: 90,
            },
        },
        //legendPosition: 'end',
        {
            key: `axis${axisKey}.legendOffset`,
            description: `${axisKey} axis legend offset from axis.`,
            type: '{number}',
            controlType: 'range',
            controlGroup: 'Axes',
            controlOptions: {
                unit: 'px',
                min: -60,
                max: 60,
            },
        },
    ]
}, [])

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
