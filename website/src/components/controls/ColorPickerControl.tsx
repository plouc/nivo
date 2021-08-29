import React, { useCallback } from 'react'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Flavor } from '../../types'

interface ColorPickerControlProps {
    id: string
    property: any
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    onChange: (value: string) => void
    context: any
}

export const ColorPickerControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    context,
    onChange,
}: ColorPickerControlProps) => {
    const handleChange = useCallback(
        e => {
            onChange(e.target.value)
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
            <PropertyHeader id={id} {...property} context={context} />
            <div>
                <input type="color" id={id} onChange={handleChange} value={value} />
                &nbsp;&nbsp;&nbsp;
                <code className="code code-string">{value}</code>
            </div>
            <Help>{property.help}</Help>
        </Control>
    )
}
