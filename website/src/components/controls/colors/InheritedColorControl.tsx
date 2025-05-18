import React, { useState, useCallback, ReactNode, ChangeEvent } from 'react'
import isString from 'lodash/isString.js'
import isPlainObject from 'lodash/isPlainObject.js'
import styled from 'styled-components'
import {
    InheritedColorConfig,
    isInheritedColorConfigFromTheme,
    isInheritedColorConfigFromContext,
    ColorModifier,
} from '@nivo/colors'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, InheritedColorControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import { InheritedColorModifierControl } from './InheritedColorModifierControl'

const themeProperties = ['background', 'grid.line.stroke', 'labels.text.fill'].map(prop => ({
    label: prop,
    value: prop,
}))
type ThemeProperty = (typeof themeProperties)[number]

const defaultInheritableProperties = ['color']
interface InheritableProperty {
    label: string
    value: string
}

type ColorType = '' | 'custom' | 'theme' | 'inherit'

interface InheritedColorControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: InheritedColorConfig<any>
    config: InheritedColorControlConfig
    onChange: (value: InheritedColorConfig<any>) => any
    context?: ControlContext
}

export const InheritedColorControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    config: {
        inheritableProperties = defaultInheritableProperties,
        defaultCustomColor = 'black',
        defaultThemeProperty = 'background',
        defaultFrom = 'color',
    },
}: InheritedColorControlProps) => {
    const [customColor, setCustomColor] = useState(isString(value) ? value : defaultCustomColor)
    const [themeProp, setThemeProp] = useState(
        isInheritedColorConfigFromTheme(value) ? value.theme : defaultThemeProperty
    )
    const [fromProp, setFromProp] = useState(
        isInheritedColorConfigFromContext(value) ? value.from : defaultFrom
    )
    const [modifiers, setModifiers] = useState<ColorModifier[]>(
        isInheritedColorConfigFromContext(value) ? value.modifiers || [] : []
    )

    let type: ColorType = ''
    let subControl: ReactNode = null

    const handleTypeChange = useCallback(
        (_type: ColorType) => {
            if (_type === 'custom') onChange(customColor)
            if (_type === 'theme') onChange({ theme: themeProp })
            if (_type === 'inherit') onChange({ from: fromProp, modifiers })
        },
        [onChange]
    )
    const handleThemePropertyChange = useCallback(
        (value: ThemeProperty | null) => {
            setThemeProp(value!.value)
            onChange({ theme: value!.value })
        },
        [onChange, setThemeProp]
    )
    const handleFromPropertyChange = useCallback(
        (value: InheritableProperty | null) => {
            setFromProp(value!.value)
            onChange({
                from: value!.value,
                modifiers,
            })
        },
        [onChange, setThemeProp]
    )
    const handleModifierChange = useCallback(
        (index: number) => (modifier: ColorModifier) => {
            const newModifiers = [...modifiers]
            newModifiers[index] = modifier
            setModifiers(newModifiers)
            onChange({
                from: fromProp,
                modifiers: newModifiers,
            })
        },
        [onChange, modifiers]
    )
    const handleCustomColorChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setCustomColor(event.target.value)
            onChange(event.target.value)
        },
        [onChange, setCustomColor]
    )

    if (isPlainObject(value)) {
        if (isInheritedColorConfigFromTheme(value)) {
            type = 'theme'
            subControl = (
                <>
                    <SubLabel>theme property</SubLabel>
                    <Select<ThemeProperty>
                        options={themeProperties}
                        value={themeProperties.find(prop => prop.value === value.theme)}
                        onChange={handleThemePropertyChange}
                    />
                </>
            )
        } else if (isInheritedColorConfigFromContext(value)) {
            type = 'inherit'
            const propertyOptions = inheritableProperties.map(prop => ({
                label: prop,
                value: prop,
            }))
            const hasModifiers = Array.isArray(value.modifiers) && value.modifiers.length > 0
            subControl = (
                <>
                    <SubLabel>inherited property</SubLabel>
                    <Select<InheritableProperty>
                        options={propertyOptions}
                        value={propertyOptions.find(prop => prop.value === value.from)}
                        onChange={handleFromPropertyChange}
                    />
                    <SubLabel>modifiers</SubLabel>
                    {!hasModifiers && <NoModifiers>No modifier.</NoModifiers>}
                    {hasModifiers &&
                        modifiers!.map((modifier, i: number) => (
                            <InheritedColorModifierControl
                                key={i}
                                modifier={modifier}
                                onChange={handleModifierChange(i)}
                            />
                        ))}
                </>
            )
        }
    } else if (isString(value)) {
        type = 'custom'
        subControl = (
            <CustomColor>
                <input type="color" onChange={handleCustomColorChange} value={value} />
                <code>{value}</code>
            </CustomColor>
        )
    }

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <TypeSelector>
                <TypeSelectorItem
                    $isActive={type === 'inherit'}
                    onClick={() => handleTypeChange('inherit')}
                >
                    inherit
                </TypeSelectorItem>
                <TypeSelectorItem
                    $isActive={type === 'theme'}
                    onClick={() => handleTypeChange('theme')}
                >
                    theme
                </TypeSelectorItem>
                <TypeSelectorItem
                    $isActive={type === 'custom'}
                    onClick={() => handleTypeChange('custom')}
                >
                    custom
                </TypeSelectorItem>
            </TypeSelector>
            {subControl}
            <Help>{property.help}</Help>
        </Control>
    )
}

const TypeSelector = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 10px;
`

const TypeSelectorItem = styled.span<{
    $isActive: boolean
}>`
    cursor: pointer;
    padding: 5px 9px;
    text-align: center;
    font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
    background: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.cardBackground : theme.colors.background};
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.accent : theme.colors.textLight)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-left-width: 0;
    box-shadow: ${({ $isActive }) => ($isActive ? 'none' : '0 1px 1px rgba(0, 0, 0, 0.1) inset')};

    &:first-child {
        border-left-width: 1px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    &:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    &:hover {
        color: ${({ $isActive, theme }) => ($isActive ? theme.colors.accent : theme.colors.text)};
        box-shadow: none;
    }
`

const SubLabel = styled.div`
    margin-bottom: 5px;
    font-size: 0.8rem;
`

const CustomColor = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-column-gap: 10px;
    margin-bottom: 5px;
`

const NoModifiers = styled.div`
    color: ${({ theme }) => theme.colors.textLight};
    font-style: italic;
    font-size: 0.8rem;
    margin-bottom: 5px;
`
