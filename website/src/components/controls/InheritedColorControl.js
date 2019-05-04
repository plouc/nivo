/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inheritedColorPropType } from '@nivo/colors'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Select from './Select'
import InheritedColorModifierControl from './InheritedColorModifierControl'

const themeProperties = ['background', 'grid.line.stroke', 'labels.text.fill'].map(prop => ({
    label: prop,
    value: prop,
}))

const defaultInheritableProperties = ['color']

const InheritedColorControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    defaultCustomColor,
    defaultThemeProperty,
    defaultFrom,
    onChange,
    options: { inheritableProperties = defaultInheritableProperties } = {},
}) => {
    const [customColor, setCustomColor] = useState(isString(value) ? value : defaultCustomColor)
    const [themeProp, setThemeProp] = useState(
        isPlainObject(value) && value.theme !== undefined ? value.theme : defaultThemeProperty
    )
    const [fromProp, setFromProp] = useState(
        isPlainObject(value) && value.from !== undefined ? value.from : defaultFrom
    )
    const [modifiers, setModifiers] = useState(
        isPlainObject(value) && value.modifiers !== undefined ? value.modifiers : []
    )

    let type
    let subControl = null

    const handleTypeChange = useCallback(
        type => {
            if (type === 'custom') onChange(customColor)
            if (type === 'theme') onChange({ theme: themeProp })
            if (type === 'inherit') onChange({ from: fromProp, modifiers })
        },
        [onChange]
    )
    const handleThemePropertyChange = useCallback(
        value => {
            setThemeProp(value.value)
            onChange({ theme: value.value })
        },
        [onChange, setThemeProp]
    )
    const handleFromPropertyChange = useCallback(
        value => {
            setFromProp(value.value)
            onChange({
                from: value.value,
                modifiers,
            })
        },
        [onChange, setThemeProp]
    )
    const handleModifierChange = useCallback(
        index => modifier => {
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
        event => {
            setCustomColor(event.target.value)
            onChange(event.target.value)
        },
        [onChange, setCustomColor]
    )

    if (isString(value)) {
        type = 'custom'
        subControl = (
            <CustomColor>
                <input type="color" onChange={handleCustomColorChange} value={value} />
                <code>{value}</code>
            </CustomColor>
        )
    } else if (isPlainObject(value)) {
        if (value.theme !== undefined) {
            type = 'theme'
            subControl = (
                <>
                    <SubLabel>theme property</SubLabel>
                    <Select
                        options={themeProperties}
                        value={themeProperties.find(prop => prop.value === value.theme)}
                        onChange={handleThemePropertyChange}
                    />
                </>
            )
        } else if (value.from !== undefined) {
            type = 'inherit'
            const propertyOptions = inheritableProperties.map(prop => ({
                label: prop,
                value: prop,
            }))
            subControl = (
                <>
                    <SubLabel>inherited property</SubLabel>
                    <Select
                        options={propertyOptions}
                        value={propertyOptions.find(prop => prop.value === value.from)}
                        onChange={handleFromPropertyChange}
                    />
                    <SubLabel>modifiers</SubLabel>
                    {modifiers.length === 0 && <NoModifiers>No modifier.</NoModifiers>}
                    {modifiers.map((modifier, i) => (
                        <InheritedColorModifierControl
                            key={i}
                            modifier={modifier}
                            onChange={handleModifierChange(i)}
                        />
                    ))}
                </>
            )
        }
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
                    isActive={type === 'inherit'}
                    onClick={() => handleTypeChange('inherit')}
                >
                    inherit
                </TypeSelectorItem>
                <TypeSelectorItem
                    isActive={type === 'theme'}
                    onClick={() => handleTypeChange('theme')}
                >
                    theme
                </TypeSelectorItem>
                <TypeSelectorItem
                    isActive={type === 'custom'}
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

InheritedColorControl.propTypes = {
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    onChange: PropTypes.func.isRequired,
    defaultCustomColor: PropTypes.string.isRequired,
    defaultThemeProperty: PropTypes.string.isRequired,
    defaultFrom: PropTypes.string.isRequired,
    value: inheritedColorPropType.isRequired,
    options: PropTypes.shape({
        inheritableProperties: PropTypes.arrayOf(PropTypes.string),
    }),
}
InheritedColorControl.defaultProps = {
    defaultCustomColor: 'black',
    defaultThemeProperty: 'background',
    defaultFrom: 'color',
}

export default InheritedColorControl

const TypeSelector = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 10px;
`

const TypeSelectorItem = styled.span`
    cursor: pointer;
    padding: 5px 9px;
    text-align: center;
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    background: ${({ isActive, theme }) =>
        isActive ? theme.colors.cardBackground : theme.colors.background};
    color: ${({ isActive, theme }) => (isActive ? theme.colors.accent : theme.colors.textLight)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-left-width: 0;
    box-shadow: ${({ isActive }) => (isActive ? 'none' : '0 1px 1px rgba(0, 0, 0, 0.1) inset')};

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
        color: ${({ isActive, theme }) => (isActive ? theme.colors.accent : theme.colors.text)};
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
