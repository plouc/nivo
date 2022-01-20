import { useEffect, useState } from 'react'
import { ControlPropsByType, ControlType, SupportedValues, DistributiveOmit } from './types'
import { defaultContext } from './defaults'

export const useControl = <
    Type extends ControlType,
    Value extends SupportedValues<Type> = SupportedValues<Type>
>({
    type,
    value: initialValue,
    onChange,
    context = defaultContext,
    ...rest
}: DistributiveOmit<ControlPropsByType<Type, Value>, 'setValue'>): ControlPropsByType<
    Type,
    Value
> => {
    const [value, setValue] = useState<Value>(initialValue as Value)

    useEffect(() => {
        ;(onChange as (value: Value) => void)?.(value)
    }, [onChange, value])

    return {
        ...rest,
        type,
        value,
        setValue,
        context,
    } as unknown as ControlPropsByType<Type, Value>
}
