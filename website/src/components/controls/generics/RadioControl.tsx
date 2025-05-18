import React, { memo, useCallback, ChangeEvent } from 'react'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ControlContext, RadioControlConfig } from '../types'
import { Control, Radio } from '../ui'

interface RadioControlProps {
    id: string
    property: ChartPropertyWithControl<RadioControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    onChange: (value: string) => void
    context?: ControlContext
}

export const RadioControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange, context }: RadioControlProps) => {
        const { choices, columns } = property.control

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
                <Radio options={choices} columns={columns} value={value} onChange={handleUpdate} />
            </Control>
        )
    }
)
