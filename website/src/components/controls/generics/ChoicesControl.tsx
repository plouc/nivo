import React, { useCallback } from 'react'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ChoicesControlConfig, ControlContext } from '../types'
import { Control, Select } from '../ui'

interface ChoicesControlProps<Value extends string | boolean> {
    id: string
    property: ChartPropertyWithControl<ChoicesControlConfig<Value>>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: Value
    onChange: (value: Value) => void
    context?: ControlContext
}

export function ChoicesControl<Value extends string | boolean = string>({
    id,
    property,
    flavors,
    currentFlavor,
    value: _value,
    onChange,
    context,
}: ChoicesControlProps<Value>) {
    const handleUpdate = useCallback(
        (option: { value: Value; label: string } | null) => onChange(option!.value),
        [onChange]
    )
    const value = property.control.choices.find(({ value: v }) => v === _value)

    return (
        <Control
            id={id}
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
            <Select<{ value: Value; label: string }>
                options={property.control.choices}
                value={value}
                onChange={handleUpdate}
                isDisabled={property.control.disabled}
            />
        </Control>
    )
}
