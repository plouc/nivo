import { ControlPropsByType, ControlType, SupportedValues, DistributiveOmit } from './types'
import { defaultContext } from './defaults'

export const useControl = <
    Type extends ControlType,
    Value extends SupportedValues<Type> = SupportedValues<Type>
>({
    type,
    value,
    onChange,
    context = defaultContext,
    ...rest
}: DistributiveOmit<ControlPropsByType<Type, Value>, 'setValue'>): ControlPropsByType<
    Type,
    Value
> => {
    return {
        ...rest,
        type,
        value,
        onChange,
        context,
    } as unknown as ControlPropsByType<Type, Value>
}
