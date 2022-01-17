import { memo, useCallback, useMemo } from 'react'
import {
    AllSupportedValues,
    ControlPropsByType,
    ControlType,
    ObjectControlProps,
    ObjectNestedControlProps,
    SetValue,
    SupportedValues,
} from '../types'
import { ControlContainer, Label } from '../ui'
import { Control } from '../Control'
import { defaultContext } from '../defaults'

const ObjectControlNestedControl = <
    Obj extends Record<string, any>,
    Type extends ControlType,
    Value extends AllSupportedValues
>({
    control,
    objectValue,
    setValue: _setValue,
}: {
    control: ObjectNestedControlProps<Obj>
    objectValue: Obj
    setValue: SetValue<Obj>
}) => {
    const controlId = control.id
    const value = objectValue[controlId]

    const setValue = useCallback(
        (_newValue: Value | ((previous: Value) => Value)) => {
            _setValue(previous => {
                const newValue =
                    typeof _newValue === 'function' ? _newValue(previous[controlId]) : _newValue

                return {
                    ...previous,
                    [controlId]: newValue,
                }
            })
        },
        [_setValue, controlId]
    )

    const boundControl = useMemo(() => {
        return {
            ...control,
            value,
            setValue,
        } as unknown as ControlPropsByType<Type, Value>
    }, [control, value, setValue])

    return <Control<Value> control={boundControl} />
}

const NoMemoObjectControl = <Obj extends SupportedValues<'object'> = Record<string, any>>({
    id,
    label,
    icon,
    description,
    props,
    value,
    setValue,
    context = defaultContext,
}: ObjectControlProps<Obj>) => {
    return (
        <>
            <ControlContainer id={id} description={description} isSingleRow>
                <Label id={id} label={label} icon={icon} context={context} />
            </ControlContainer>
            {props.map(control => {
                return (
                    <ObjectControlNestedControl<Obj, typeof control.type, Obj[typeof control.id]>
                        key={control.id}
                        control={control}
                        objectValue={value}
                        setValue={setValue}
                    />
                )
            })}
        </>
    )
}

export const ObjectControl = memo(NoMemoObjectControl) as typeof NoMemoObjectControl
