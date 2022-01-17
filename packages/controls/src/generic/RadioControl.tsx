import { useCallback } from 'react'
import { RadioControlProps, SupportedValues } from '../types'
import { ControlContainer, Label, Radio, YGapSpacer } from '../ui'

export const RadioControl = <Value extends SupportedValues<'radio'> = string>({
    id,
    label,
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
        <ControlContainer id={id} description={description} isSingleRow={false}>
            <Label id={id} label={label} icon={icon} context={context} />
            <YGapSpacer />
            <Radio<Value> options={choices} columns={columns} value={value} onChange={onChange} />
        </ControlContainer>
    )
}
