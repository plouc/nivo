import React, { useCallback } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, BulletColorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useBulletColors,
} from './colorSchemeSelect'

interface QuantizeColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: BulletColorsControlConfig
    onChange: (value: string) => void
    value: string
    context?: ControlContext
}

export const BulletColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value: _value,
    onChange,
    context,
}: QuantizeColorsControlProps) => {
    const options = useBulletColors()

    const handleChange = useCallback(value => onChange(value.value), [onChange])
    const value = options.find(({ value: v }) => v === _value)

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} context={context} />
            <Select
                options={options}
                onChange={handleChange}
                value={value}
                isSearchable
                clearable={false}
                components={{
                    SingleValue: ColorSchemeSelectValue,
                    Option: ColorSchemeSelectOption,
                }}
            />
            <Help>{property.help}</Help>
        </Control>
    )
}
