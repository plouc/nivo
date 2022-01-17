import { useCallback, useState } from 'react'
import { ControlPropsByType, ControlType, SupportedValues } from './types'

export const useControl = <
    Type extends ControlType,
    Value extends SupportedValues<Type> = SupportedValues<Type>
>({
    type,
    value: initialValue,
    onChange: _onChange,
    ...rest
}: ControlPropsByType<Type, Value>) => {
    const [value, setValue] = useState<Value>(initialValue as Value)

    const onChange = useCallback(
        (newValue: Value) => {
            setValue(newValue)
            ;(_onChange as (value: Value) => void)?.(newValue)
        },
        [setValue, _onChange]
    )

    return {
        ...rest,
        type,
        value,
        onChange,
    } as unknown as Omit<ControlPropsByType<Type, Value>, 'onChange'> & {
        onChange: NonNullable<ControlPropsByType<Type, Value>['onChange']>
    }
}
