import { ObjectControlProps, ObjectControlPropsCollection } from '../types'
import { useCallback, useMemo } from 'react'
import { ControlContainer, Label } from '../ui'
import { Control } from '../Control'

const ObjectControlNestedControl = <Obj extends Record<string, unknown>>({
    control,
    objectValue,
    onChange: _onChange,
}: {
    control: ObjectControlPropsCollection<Obj>[number]
    objectValue: Obj
    onChange?: (value: Obj) => void
}) => {
    const controlId = control.id
    const value = objectValue[controlId]
    const onChange = useCallback(
        (value: any) => {
            _onChange?.({
                ...objectValue,
                [controlId]: value,
            })
        },
        [objectValue, controlId]
    )

    const boundControl = useMemo(() => {
        return {
            ...control,
            value,
            onChange,
        }
    }, [control, value, onChange])

    return <Control control={boundControl} />
}

export const ObjectControl = <Value extends Record<string, unknown>>({
    id,
    label,
    icon,
    description,
    props,
    value,
    onChange,
    context = { path: [] },
}: ObjectControlProps<Value>) => {
    return (
        <>
            <ControlContainer id={id} description={description} isSingleRow>
                <Label id={id} label={label} icon={icon} context={context} />
            </ControlContainer>
            {props.map(control => (
                <ObjectControlNestedControl
                    key={control.id}
                    control={control}
                    objectValue={value}
                    onChange={onChange}
                />
            ))}
        </>
    )
}
