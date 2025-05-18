import React, { useCallback } from 'react'
import { ColorSchemeId } from '@nivo/colors'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ControlContext, OrdinalColorsControlConfig } from '../types'
import { Control, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useOrdinalColorSchemes,
} from './colorSchemeSelect'

export type OrdinalColorOption = ReturnType<typeof useOrdinalColorSchemes>[number]

interface OrdinalColorsControlProps {
    id: string
    property: ChartPropertyWithControl<OrdinalColorsControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
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
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
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
        </Control>
    )
}
