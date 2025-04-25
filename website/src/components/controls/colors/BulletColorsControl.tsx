import React, { useCallback } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, BulletColorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useBulletColors,
} from './colorSchemeSelect'

export type BulletColorOption = ReturnType<typeof useBulletColors>[number]

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

    const handleChange = useCallback(
        (value: BulletColorOption | null) => onChange(value!.value),
        [onChange]
    )
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
            <Select<BulletColorOption>
                options={options}
                onChange={handleChange}
                value={value}
                isSearchable
                isClearable={false}
                components={{
                    SingleValue: ColorSchemeSelectValue,
                    Option: ColorSchemeSelectOption,
                }}
            />
            <Help>{property.help}</Help>
        </Control>
    )
}
