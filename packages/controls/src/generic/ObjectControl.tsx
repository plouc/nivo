import { ObjectControlProps, ObjectControlPropsCollection } from '../types'
import { useCallback, useMemo } from 'react'
import { ControlContainer, Header } from '../ui'
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
    const controlName = control.name
    const value = objectValue[controlName]
    const onChange = useCallback(
        (value: any) => {
            _onChange?.({
                ...objectValue,
                [controlName]: value,
            })
        },
        [objectValue]
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
    name,
    icon,
    description,
    props,
    value,
    onChange,
    context = { path: [] },
}: ObjectControlProps<Value>) => {
    return (
        <>
            <ControlContainer name={name} description={description}>
                <Header name={name} icon={icon} context={context} />
            </ControlContainer>
            {props.map(control => (
                <ObjectControlNestedControl
                    key={control.name}
                    control={control}
                    objectValue={value}
                    onChange={onChange}
                />
            ))}
        </>
    )
}
