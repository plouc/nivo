import React, { memo, useCallback } from 'react'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Radio } from './Radio'
import { ChartProperty, Flavor } from '../../types'
import { RadioControlConfig } from './types'

interface RadioControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    config: RadioControlConfig
    onChange: (value: string) => void
    context?: any
}

export const RadioControl = memo(
    ({ id, property, flavors, currentFlavor, config, value, onChange }: RadioControlProps) => {
        const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader {...property} />
                <Radio options={config.choices} value={value} onChange={handleUpdate} />
                <Help>{property.help}</Help>
            </Control>
        )
    }
)
