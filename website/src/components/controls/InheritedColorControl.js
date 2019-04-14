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
import { mapInheritedColor } from '../../lib/settings'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Select from './Select'

const themeProperties = ['background', 'grid.line.stroke'].map(prop => ({
    label: prop,
    value: prop,
}))

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
`

const InheritedColorControl = ({
    id,
    property,
    value,
    defaultCustomColor,
    defaultThemeProperty,
    defaultFrom,
    inheritableProperties,
    onChange,
}) => {
    const [customColor, setCustomColor] = useState(isString(value) ? value : defaultCustomColor)
    const [themeProp, setThemeProp] = useState(
        isPlainObject(value) && value.theme !== undefined ? value.theme : defaultThemeProperty
    )
    const [fromProp, setFromProp] = useState(
        isPlainObject(value) && value.from !== undefined ? value.from : defaultFrom
    )

    let type
    let subControl = null

    const handleTypeChange = useCallback(
        type => {
            if (type === 'custom') {
                onChange(customColor)
            }
            if (type === 'theme') {
                onChange({ theme: themeProp })
            }
            if (type === 'inherit') {
                onChange({ from: fromProp })
            }
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

    if (isString(value)) {
        type = 'custom'
        subControl = <div>static color: {value}</div>
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
                        //onChange={handleThemePropertyChange}
                    />
                </>
            )
        }
    }

    return (
        <Control description={property.description}>
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
    onChange: PropTypes.func.isRequired,
    //defaultGammaValue: PropTypes.number.isRequired,
    //withTheme: PropTypes.bool.isRequired,
    //withCustomColor: PropTypes.bool.isRequired,
    inheritableProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultCustomColor: PropTypes.string.isRequired,
    defaultThemeProperty: PropTypes.string.isRequired,
    defaultFrom: PropTypes.string.isRequired,
    value: inheritedColorPropType.isRequired,
}
InheritedColorControl.defaultProps = {
    defaultCustomColor: 'black',
    defaultThemeProperty: 'background',
    defaultFrom: 'color',
    inheritableProperties: ['color'],
}

export default InheritedColorControl
