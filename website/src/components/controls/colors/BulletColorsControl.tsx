import React, { useCallback } from 'react'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ControlContext, BulletColorsControlConfig } from '../types'
import { Control, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useBulletColors,
} from './colorSchemeSelect'

export type BulletColorOption = ReturnType<typeof useBulletColors>[number]

interface QuantizeColorsControlProps {
    id: string
    property: ChartPropertyWithControl<BulletColorsControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    onChange: (value: string) => void
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
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
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
        </Control>
    )
}
