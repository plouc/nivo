import { memo, useCallback, ChangeEvent } from 'react'
import { ChartProperty, ControlContext } from '../types'
import { Control, ControlHeader, ControlHelp, ControlTextInput } from '../chrome'
import { TextControlConfig } from './types'

interface TextControlProps {
    property: ChartProperty<TextControlConfig>
    context?: ControlContext
    value: string
    onChange: (v: string) => void
}

export const TextControl = memo(({ property, context, value, onChange }: TextControlProps) => {
    const handleUpdate = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
        [onChange]
    )

    return (
        <Control property={property} context={context}>
            <ControlHeader property={property} context={context} />
            <ControlTextInput
                type="text"
                value={value}
                onChange={handleUpdate}
                disabled={property.control.disabled === true}
            />
            <ControlHelp>{property.help}</ControlHelp>
        </Control>
    )
})
