import { useCallback } from 'react'
import { ControlContainer, Header, Radio } from '../ui'
import { RadioControlProps } from '../types'

export const RadioControl = <Value extends string | number = string>({
    name,
    description,
    choices,
    columns,
    value,
    onChange: _onChange,
    context = { path: [] },
}: RadioControlProps<Value>) => {
    const onChange = useCallback(
        (value: Value) => {
            console.log('YAY')
            _onChange?.(value)
        },
        [_onChange]
    )

    return (
        <ControlContainer name={name} description={description}>
            <Header name={name} context={context} />
            <Radio<Value> options={choices} columns={columns} value={value} onChange={onChange} />
        </ControlContainer>
    )
}
