import React, { useCallback } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, QuantizeColorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useLegacyQuantizeColors,
} from './colorSchemeSelect'

export type LegacyQuantizeColorsOption = ReturnType<typeof useLegacyQuantizeColors>[number]

interface QuantizeColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: QuantizeColorsControlConfig
    onChange: (value: string) => void
    value: string
    context?: ControlContext
}

export const QuantizeColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value: _value,
    onChange,
    context,
}: QuantizeColorsControlProps) => {
    const options = useLegacyQuantizeColors()

    const handleChange = useCallback(
        (value: LegacyQuantizeColorsOption | null) => onChange(value!.value),
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
            <Select<LegacyQuantizeColorsOption>
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
