import React, { memo, useCallback } from 'react'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { TextInput } from './TextInput'
import { Help } from './Help'
import { ChartProperty, Flavor } from '../../types'
import { TextControlConfig } from './types'

interface TextControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string | number
    onChange: (value: string) => void
    config: TextControlConfig
    context?: any
}

export const TextControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange, config = {} }: TextControlProps) => {
        const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} />
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
