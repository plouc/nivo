import React, { memo } from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { Control, PropertyHeader, Help, Switch } from '../ui'
import { ControlContext } from '../types'

interface SwitchControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: boolean
    onChange: (value: boolean) => void
    context?: ControlContext
}

export const SwitchControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange, context }: SwitchControlProps) => {
        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} context={context} />
                <Switch id={id} value={value} onChange={onChange} />
                &nbsp;&nbsp;&nbsp;
                <Help>{property.help}</Help>
            </Control>
        )
    }
)
