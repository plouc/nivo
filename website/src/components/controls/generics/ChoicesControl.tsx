import React, { useCallback } from 'react'
import { Flavor } from '../../../types'
import { ChoicesControlConfig, ControlContext } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'

interface ChoicesControlProps<Value extends string | boolean> {
    id: string
    property: any
    flavors: Flavor[]
    currentFlavor: Flavor
    value: Value
    onChange: (value: Value) => void
    config: ChoicesControlConfig<Value>
    context?: ControlContext
}

export function ChoicesControl<Value extends string | boolean = string>({
    id,
    property,
    flavors,
    currentFlavor,
    value: _value,
    config,
    onChange,
    context,
}: ChoicesControlProps<Value>) {
    const handleUpdate = useCallback(
        (option: { value: Value; label: string } | null) => onChange(option!.value),
        [onChange]
    )
    const value = config.choices.find(({ value: v }) => v === _value)

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader id={id} {...property} context={context} />
            <Select<{ value: Value; label: string }>
                options={config.choices}
                value={value}
                onChange={handleUpdate}
            />
            <Help>{property.help}</Help>
        </Control>
    )
}
