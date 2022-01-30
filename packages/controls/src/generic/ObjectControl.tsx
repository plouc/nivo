import { memo, useCallback, useMemo } from 'react'
import {
    AllSupportedValues,
    ControlPropsByType,
    ControlType,
    ObjectControlProps,
    ObjectNestedControlProps,
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
    onChange: _onChange,
}: {
    control: ObjectNestedControlProps<Obj>
    objectValue: Obj
    onChange: (value: Obj) => void
}) => {
    const controlId = control.id
    const value = objectValue[controlId]

    const onChange = useCallback(
        (newValue: Value) => {
            _onChange({
                ...objectValue,
                [controlId]: newValue,
            })
        },
        [objectValue, _onChange, controlId]
    )

    const boundControl = useMemo(() => {
        return {
            ...control,
            value,
            onChange,
        } as unknown as ControlPropsByType<Type, Value>
    }, [control, value, onChange])

    return <Control<Value> control={boundControl} />
}

const NoMemoObjectControl = <Obj extends SupportedValues<'object'> = Record<string, any>>({
    id,
    label,
    icon,
    description,
    props,
    value,
    onChange,
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
                        onChange={onChange}
                    />
                )
            })}
        </>
    )
}

export const ObjectControl = memo(NoMemoObjectControl) as typeof NoMemoObjectControl
