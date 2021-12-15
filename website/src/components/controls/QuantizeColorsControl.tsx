import React, { useCallback } from 'react'
import { quantizeColorScales } from '@nivo/core'
import Select from './Select'
import { ColorsControlItem } from './ColorsControlItem'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'

const options = Object.keys(quantizeColorScales).map(id => ({
    id,
    colors: quantizeColorScales[id],
}))

interface QuantizeColorsControlProps {
    id: string
    property: any
    onChange: any
    value: string
}

const renderOption = option => {
    return <ColorsControlItem id={option.value} colors={option.colors} />
}

const renderValue = value => {
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

const QuantizeColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
}: QuantizeColorsControlProps) => {
    const handleColorsChange = useCallback(
        value => {
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

export default QuantizeColorsControl
