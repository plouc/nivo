import React, { useCallback } from 'react'
// @ts-ignore
import { quantizeColorScales } from '@nivo/core'
import Select from './Select'
import { ColorsControlItem } from './ColorsControlItem'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { ChartProperty, Flavor } from '../../types'
import { QuantizeColorsControlConfig } from './types'

const options = Object.keys(quantizeColorScales).map(id => ({
    id,
    colors: quantizeColorScales[id],
}))

interface QuantizeColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: QuantizeColorsControlConfig
    onChange: (value: string) => void
    value: string
    context?: any
}

const renderOption = (option: { value: string; colors: string[] }) => {
    return <ColorsControlItem id={option.value} colors={option.colors} />
}

const renderValue = (value: { value: string; colors: string[] }) => {
    return (
        <div className="colors_item colors_item-current">
            <div className="colors_item_colors">
                {value.colors.map(color => (
                    <span
                        key={color}
                        className="colors_item_colors_item"
                        style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    )
}

export const QuantizeColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
}: QuantizeColorsControlProps) => {
    const handleColorsChange = useCallback(
        (value: { value: string }) => {
            onChange(value.value)
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
            <PropertyHeader {...property} />
            <Select
                options={options.map(({ id, colors }) => ({
                    label: id,
                    value: id,
                    colors,
                }))}
                optionRenderer={renderOption}
                valueRenderer={renderValue}
                onChange={handleColorsChange}
                value={value}
                clearable={false}
            />
            <Help>{property.help}</Help>
        </Control>
    )
}
