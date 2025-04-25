import React, { useCallback } from 'react'
import { ColorSchemeId } from '@nivo/colors'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, OrdinalColorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useOrdinalColorSchemes,
} from './colorSchemeSelect'

export type OrdinalColorOption = ReturnType<typeof useOrdinalColorSchemes>[number]

interface OrdinalColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: OrdinalColorsControlConfig
    value: { scheme: ColorSchemeId }
    onChange: (value: { scheme: ColorSchemeId }) => void
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

    const selectedOption = options.find(o => o.value === value.scheme)!
    const handleChange = useCallback(
        (option: OrdinalColorOption | null) => {
            onChange({ scheme: option!.value })
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
            <Select<OrdinalColorOption>
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
