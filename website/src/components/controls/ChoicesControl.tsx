import React, { memo, useCallback } from 'react'
import { Control } from './Control'
import Select from './Select'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Flavor } from '../../types'
import { ChoicesControlConfig } from './types'

interface ChoicesControlProps {
    id: string
    property: any
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string | number | boolean
    onChange: (value: string | number | boolean) => void
    config: ChoicesControlConfig
    context?: any
}

export const ChoicesControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value: _value,
        config,
        onChange,
    }: ChoicesControlProps) => {
        const handleUpdate = useCallback(value => onChange(value.value), [onChange])
        const value = config.choices.find(({ value: v }) => v === _value)

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} />
                <Select options={config.choices} value={value} onChange={handleUpdate} />
                <Help>{property.help}</Help>
            </Control>
        )
    }
)
