import React, { useCallback, ChangeEvent } from 'react'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ColorPickerControlConfig, ControlContext } from '../types'
import { Control } from '../ui'

interface ColorPickerControlProps {
    id: string
    property: ChartPropertyWithControl<ColorPickerControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    onChange: (value: string) => void
    context?: ControlContext
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
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
        },
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
            <div>
                <input type="color" id={id} onChange={handleChange} value={value} />
                &nbsp;&nbsp;&nbsp;
                <code className="code code-string">{value}</code>
            </div>
        </Control>
    )
}
