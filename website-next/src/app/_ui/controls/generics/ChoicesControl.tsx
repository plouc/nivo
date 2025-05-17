import { useCallback } from 'react'
import { Flavor, ChartProperty} from "@/types/charts";
import { ChoicesControlConfig} from "@/types/controls";
// import { ChoicesControlConfig, ControlContext } from '../types'
// import { Help, Select } from './Control'
import { Control } from './Control'
import { ControlHeader} from "./ControlHeader";

interface ChoicesControlProps<V extends string = string> {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: V
    onChange: (value: V) => void
    config: ChoicesControlConfig<V>
    // context?: ControlContext
}

export function ChoicesControl<V extends string = string>({
    id,
    property: _property,
    flavors,
    currentFlavor,
    value: _value,
    config,
    onChange,
    // context,
}: ChoicesControlProps<V>) {
    console.log('ChoicesControl', {currentFlavor})
    const { key, ...property } = _property
    const handleUpdate = useCallback(
        (option: { value: V; label: string } | null) => onChange(option!.value),
        [onChange]
    )
    // const value = config.choices.find(({ value: v }) => v === _value)

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <ControlHeader {...property} key={key} id={id} currentFlavor={currentFlavor}/>
            {/*
            <PropertyHeader id={id} {...property} context={context} />
            <Select<{ value: Value; label: string }>
                options={config.choices}
                value={value}
                onChange={handleUpdate}
            />
            <Help>{property.help}</Help>
            */}
        </Control>
    )
}
