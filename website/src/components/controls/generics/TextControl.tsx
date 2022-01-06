import React, { memo, useCallback } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, TextControlConfig } from '../types'
import { Control, PropertyHeader, Help, TextInput } from '../ui'

interface TextControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string | number
    onChange: (value: string) => void
    config: TextControlConfig
    context?: ControlContext
}

export const TextControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value,
        onChange,
        config,
        context,
    }: TextControlProps) => {
        const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} context={context} />
                <TextInput
                    id={id}
                    type="text"
                    value={value}
                    onChange={handleUpdate}
                    disabled={config.disabled === true}
                />
                <Help>{property.help}</Help>
            </Control>
        )
    }
)
