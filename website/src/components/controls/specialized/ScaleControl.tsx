import React, { memo, useMemo, useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { ScaleSpec, ScaleType } from '@nivo/scales'
import { ChartProperty, ChartPropertyWithControl, Flavor } from '../../../types'
import { ScaleControlConfig, ControlContext, KeysOfUnion } from '../types'
import { PropertyHeader, Help, Cell, Toggle } from '../ui'
import { ControlsGroup } from '../ControlsGroup'

interface ScaleControlProps {
    id: string
    property: ChartPropertyWithControl<ScaleControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: ScaleSpec
    onChange: (value: Record<string, unknown>) => void
    context?: ControlContext
}

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
    help: `Reverse the scale.`,
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

// @todo: add all scale types
const propsByScaleType: Partial<Record<ScaleType, Omit<ChartProperty, 'group'>[]>> = {
    linear: [SCALE_PROP_NICE, SCALE_PROP_ROUND, SCALE_PROP_MIN, SCALE_PROP_MAX, SCALE_PROP_REVERSE],
    band: [SCALE_PROP_ROUND],
    symlog: [SCALE_PROP_NICE, SCALE_PROP_ROUND, SCALE_PROP_REVERSE],
}

// @todo: add all scale types
const defaultsByScaleType: Partial<Record<ScaleType, Partial<ScaleSpec>>> = {
    linear: {
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
        clamp: false,
        nice: false,
        round: true,
    },
    band: {
        type: 'band',
        round: false,
    },
    symlog: {
        type: 'symlog',
        nice: true,
        round: true,
    },
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

        const defaults = defaultsByScaleType[value.type]

        const subProps: ChartProperty[] = []
        propsByScaleType[value.type]!.forEach(prop => {
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

        console.log({
            value,
            subProps,
            defaults,
            latestValueByType: latestValueByType.current,
        })

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
                        onChange={onChange}
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
