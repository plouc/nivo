import React, { memo, useMemo, useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import {
    ScaleSpec,
    ScaleType,
    linearScaleDefaults,
    bandScaleDefaults,
    logScaleDefaults,
    symlogScaleDefaults,
} from '@nivo/scales'
import { ChartProperty, ChartPropertyWithControl, Flavor } from '../../../types'
import { ScaleControlConfig, ControlContext, KeysOfUnion } from '../types'
import { PropertyHeader, Help, Cell, Toggle } from '../ui'
import { ControlsGroup } from '../ControlsGroup'

const SCALE_PROP_ROUND: Omit<ChartProperty, 'group'> = {
    name: 'round',
    key: 'round',
    type: 'boolean',
    help: `Round positions and bandwidth to the nearest integer.`,
    control: {
        type: 'switch',
    },
}

const SCALE_PROP_NICE: Omit<ChartProperty, 'group'> = {
    name: 'nice',
    key: 'nice',
    type: 'boolean',
    help: `Expands the values to “round” human-friendly values.`,
    control: {
        type: 'switch',
    },
}

const SCALE_PROP_REVERSE: Omit<ChartProperty, 'group'> = {
    name: 'reverse',
    key: 'reverse',
    type: 'boolean',
    help: `Reverse the scale output range (e.g. x/y position).`,
    control: {
        type: 'switch',
    },
}

const SCALE_PROP_MIN: Omit<ChartProperty, 'group'> = {
    key: 'min',
    name: 'min',
    type: `number | 'auto'`,
    help: `Minimum value, if \`auto\`, it's inferred from the data.`,
    control: {
        type: 'switchableRange',
        disabledValue: 'auto',
        defaultValue: 0,
        min: -2000,
        max: 2000,
    },
}

const SCALE_PROP_MAX: Omit<ChartProperty, 'group'> = {
    key: 'max',
    name: 'max',
    help: `Maximum value, if \`auto\`, it's inferred from the data.`,
    type: `number | 'auto'`,
    control: {
        type: 'switchableRange',
        disabledValue: 'auto',
        defaultValue: 1200,
        min: -2000,
        max: 2000,
    },
}

const SCALE_PROP_CLAMP: Omit<ChartProperty, 'group'> = {
    key: 'clamp',
    name: 'clamp',
    help: `For any input outside the domain, clamp the output to the nearest endpoint.`,
    type: `boolean`,
    control: {
        type: 'switch',
    },
}

// @todo: add all scale types
const SCALE_PROPS_BY_TYPE: Partial<Record<ScaleType, Omit<ChartProperty, 'group'>[]>> = {
    linear: [
        SCALE_PROP_NICE,
        SCALE_PROP_ROUND,
        SCALE_PROP_MIN,
        SCALE_PROP_MAX,
        SCALE_PROP_REVERSE,
        SCALE_PROP_CLAMP,
    ],
    band: [SCALE_PROP_NICE, SCALE_PROP_ROUND, SCALE_PROP_REVERSE],
    log: [SCALE_PROP_NICE, SCALE_PROP_ROUND, SCALE_PROP_REVERSE],
    symlog: [SCALE_PROP_NICE, SCALE_PROP_ROUND, SCALE_PROP_REVERSE],
}

// @todo: add all scale types
const SCALE_DEFAULTS_BY_TYPE: Partial<Record<ScaleType, Partial<ScaleSpec>>> = {
    linear: linearScaleDefaults,
    band: bandScaleDefaults,
    log: logScaleDefaults,
    symlog: symlogScaleDefaults,
}

const SCALE_CHOICES: {
    value: ScaleType
    label: ScaleType
}[] = [
    {
        value: 'linear',
        label: 'linear',
    },
    {
        value: 'band',
        label: 'band',
    },
    {
        value: 'log',
        label: 'log',
    },
    {
        value: 'symlog',
        label: 'symlog',
    },
    {
        value: 'point',
        label: 'point',
    },
]

interface ScaleControlProps {
    id: string
    property: ChartPropertyWithControl<ScaleControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: ScaleSpec
    onChange: (value: Record<string, unknown>) => void
    context?: ControlContext
}

export const ScaleControl = memo(
    ({ property, flavors, currentFlavor, value: _value, onChange, context }: ScaleControlProps) => {
        const [isOpened, setIsOpened] = useState(property.control.isOpenedByDefault === true)
        const toggle = useCallback(() => setIsOpened(flag => !flag), [setIsOpened])

        // We need to keep the latest value used for a given scale type,
        // so that we can use it to set the default values for the props
        // if we ever go back to a previous scale type.
        const latestValueByType = useRef<Partial<Record<ScaleType, Partial<ScaleSpec>>>>({})

        const value = { ..._value }

        const excludedProps: NonNullable<ScaleControlConfig['disabledProps']> =
            property.control.disabledProps || {}
        const excludedPropsForType = excludedProps[value.type] || []

        const defaults = SCALE_DEFAULTS_BY_TYPE[value.type]

        const scaleChoices = SCALE_CHOICES.filter(({ value }) =>
            property.control.allowedTypes.includes(value)
        )
        const subProps: ChartProperty[] = [
            {
                name: 'type',
                key: 'type',
                group: property.group,
                type: 'string',
                help: `The [scale](self:/guides/scales/) type.`,
                control: {
                    type: 'choices',
                    choices: scaleChoices,
                    disabled: scaleChoices.length === 1,
                },
            },
        ]
        SCALE_PROPS_BY_TYPE[value.type]!.forEach(prop => {
            if (excludedPropsForType.includes(prop.key as KeysOfUnion<ScaleSpec>)) {
                return
            }

            const propValue = (value as Record<string, unknown>)[prop.key]
            if (propValue === undefined) {
                ;(value as any)[prop.key] = (defaults as Record<string, unknown>)[prop.key]
            }

            subProps.push({
                ...prop,
                group: property.group,
            })
        })

        useMemo(() => {
            latestValueByType.current = {
                ...latestValueByType.current,
                [value.type]: {
                    ...value,
                },
            }
        }, [value])

        const handleChange = (newValue: ScaleSpec) => {
            const newType = newValue.type
            if (newType === value.type) {
                onChange(newValue as Record<string, unknown>)
                return
            }

            const latestValue = latestValueByType.current[newType]
            if (latestValue) {
                onChange(latestValue)
                return
            }

            const defaultValue = SCALE_DEFAULTS_BY_TYPE[newType]
            if (defaultValue) {
                onChange(defaultValue)
                return
            }

            onChange(newValue as Record<string, unknown>)
        }

        const newContext = {
            path: [...(context ? context.path : []), property.key || property.name] as string[],
        }

        return (
            <>
                <Header $isOpened={isOpened} onClick={toggle}>
                    <PropertyHeader {...property} context={context} />
                    <Help>{property.help}</Help>
                    <Toggle isOpened={isOpened} />
                </Header>
                {isOpened && (
                    <ControlsGroup
                        name={property.key}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        controls={subProps}
                        settings={value}
                        onChange={handleChange}
                        context={newContext}
                    />
                )}
            </>
        )
    }
)

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accentLight};
`

const Header = styled(Cell)<{
    $isOpened: boolean
}>`
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};

        ${Title} {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    ${Title} {
        ${({ $isOpened, theme }) => ($isOpened ? `color: ${theme.colors.accent};` : '')}
    }
`
