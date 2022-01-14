import { useCallback } from 'react'
import { ControlContainer, Header, Radio } from '../ui'
import { RadioControlProps } from '../types'

export const RadioControl = <Value extends string | number = string>({
    name,
    description,
    choices,
    columns,
    value,
    onChange,
    context = { path: [] },
}: RadioControlProps<Value>) => {
    const handleUpdate = useCallback(event => onChange?.(event.target.value), [onChange])

    return (
        <ControlContainer name={name} description={description}>
            <Header name={name} context={context} />
            <Radio<Value>
                options={choices}
                columns={columns}
                value={value}
                onChange={handleUpdate}
            />
        </ControlContainer>
    )
}
