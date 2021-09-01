import React, { memo } from 'react'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Switch } from './Switch'
import { ChartProperty, Flavor } from '../../types'

interface SwitchControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: boolean
    onChange: (value: boolean) => void
}

export const SwitchControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange }: SwitchControlProps) => {
        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} />
                <Switch id={id} value={value} onChange={onChange} />
                &nbsp;&nbsp;&nbsp;
                <Help>{property.help}</Help>
            </Control>
        )
    }
)
