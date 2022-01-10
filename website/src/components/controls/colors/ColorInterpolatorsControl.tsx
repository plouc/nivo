import React, { useCallback } from 'react'
// @ts-ignore
import { components } from 'react-select'
import { ColorInterpolatorId } from '@nivo/colors'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, ColorInterpolatorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import {
    ColorSchemeSelectOption,
    ColorSchemeSelectValue,
    useColorInterpolators,
} from './colorSchemeSelect'

interface OrdinalColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: ColorInterpolatorsControlConfig
    value: ColorInterpolatorId
    onChange: (value: ColorInterpolatorId) => void
    context?: ControlContext
}

export const ColorInterpolatorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value: _value,
    onChange,
    context,
}: OrdinalColorsControlProps) => {
    const options = useColorInterpolators()

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
