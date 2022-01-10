import React, { useCallback } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, OrdinalColorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useOrdinalColorSchemes,
} from './colorSchemeSelect'

interface OrdinalColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: OrdinalColorsControlConfig
    value: { scheme: string }
    onChange: (value: { scheme: string }) => void
    context?: ControlContext
}

export const OrdinalColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: OrdinalColorsControlProps) => {
    const options = useOrdinalColorSchemes()

    const selectedOption = options.find(o => o.value === value.scheme)
    const handleChange = useCallback(
        option => {
            onChange({ scheme: option.value })
        },
        [onChange]
    )

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
                value={selectedOption}
                isSearchable
                components={{
                    SingleValue: ColorSchemeSelectValue,
                    Option: ColorSchemeSelectOption,
                }}
            />
            <Help>{property.help}</Help>
        </Control>
    )
}
