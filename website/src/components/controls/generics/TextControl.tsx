import React, { memo, useCallback, ChangeEvent } from 'react'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ControlContext, TextControlConfig } from '../types'
import { Control, TextInput } from '../ui'

interface TextControlProps {
    id: string
    property: ChartPropertyWithControl<TextControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string | number
    onChange: (value: string) => void
    context?: ControlContext
}

export const TextControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange, context }: TextControlProps) => {
        const handleUpdate = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
            [onChange]
        )

        return (
            <Control
                id={id}
                property={property}
                flavors={flavors}
                currentFlavor={currentFlavor}
                context={context}
            >
                <TextInput
                    id={id}
                    type="text"
                    value={value}
                    onChange={handleUpdate}
                    disabled={property.control.disabled === true}
                />
            </Control>
        )
    }
)
