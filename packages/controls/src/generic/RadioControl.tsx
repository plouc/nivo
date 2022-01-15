import { useCallback } from 'react'
import { RadioControlProps } from '../types'
import { ControlContainer, Label, Radio } from '../ui'

export const RadioControl = <Value extends string | number = string>({
    name,
    icon,
    description,
    choices,
    columns,
    value,
    onChange: _onChange,
    context = { path: [] },
}: RadioControlProps<Value>) => {
    const onChange = useCallback(
        (value: Value) => {
            _onChange?.(value)
        },
        [_onChange]
    )

    return (
        <ControlContainer name={name} description={description}>
            <Label name={name} icon={icon} context={context} />
            <Radio<Value> options={choices} columns={columns} value={value} onChange={onChange} />
        </ControlContainer>
    )
}
