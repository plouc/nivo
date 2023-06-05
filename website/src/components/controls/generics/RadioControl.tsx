import React, { memo, useCallback } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, RadioControlConfig } from '../types'
import { Control, PropertyHeader, Help, Radio } from '../ui'

interface RadioControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    config: RadioControlConfig
    onChange: (value: string) => void
    context?: ControlContext
}

export const RadioControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        config: { choices, columns },
        value,
        onChange,
        context,
    }: RadioControlProps) => {
        const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader {...property} context={context} />
                <Radio options={choices} columns={columns} value={value} onChange={handleUpdate} />
                <Help>{property.help}</Help>
            </Control>
        )
    }
)
