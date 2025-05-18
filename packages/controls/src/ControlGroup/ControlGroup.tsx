import { memo, useCallback } from 'react'
import get from 'lodash/get.js'
// import snakeCase from 'lodash/snakeCase.js'
import { ChartProperty, ControlConfig, ControlContext } from '../types'
import { ObjectControl, ObjectControlConfig } from '../ObjectControl'
import { OpacityControl, OpacityControlConfig } from '../OpacityControl'
import { RangeControl, RangeControlConfig } from '../RangeControl'
import { SwitchControl, SwitchControlConfig } from '../SwitchControl'
import { TextControl, TextControlConfig } from '../TextControl'

// add some extra logic to render properties conditionally
// depending on the current settings.
export const shouldRenderProperty = (
    property: ChartProperty<ControlConfig>,
    parentValue: Record<string, unknown>
) => {
    if (typeof property.when !== 'function') return true
    return property.when(parentValue)
}

interface ControlSwitcherProps {
    property: ChartProperty<ControlConfig>
    context?: ControlContext
    parentValue: Record<string, unknown>
    onChange: (v: Record<string, unknown>) => void
}

const ControlSwitcher = memo(
    ({ property, context, parentValue, onChange }: ControlSwitcherProps) => {
        // generate a unique identifier for the property
        // const id = `${snakeCase(groupName)}-${property.name}`
        const value = get(parentValue, property.name!)
        const controlConfig = property.control
        const handleChange = useCallback(
            (value: any) => {
                onChange({
                    ...parentValue,
                    [property.name!]: value,
                })
            },
            [onChange, parentValue, property.name]
        )

        if (!shouldRenderProperty(property, parentValue)) {
            return null
        }

        // let shouldRenderControl = controlConfig !== undefined
        //
        // // the property is not available for the current flavor
        // if (Array.isArray(property.flavors) && !property.flavors.includes(currentFlavor)) {
        //     shouldRenderControl = false
        // }

        // the control is only available for certain flavors in the UI
        // while being available for usage, this is typically used for
        // `width` & `height` properties, which cannot be set for the demos
        // as we use the responsive version of the charts, but has to be defined
        // when using the HTTP API.
        // if (
        //     Array.isArray(property.enableControlForFlavors) &&
        //     !property.enableControlForFlavors.includes(currentFlavor)
        // ) {
        //     shouldRenderControl = false
        // }

        // if (!shouldRenderControl) {
        //     return (
        //         <PropertyDocumentation
        //             id={id}
        //             property={property}
        //             flavors={flavors}
        //             currentFlavor={currentFlavor}
        //             context={context}
        //         />
        //     )
        // }

        // Every property that has a control should have a value.
        if (value === undefined) {
            throw new Error(
                `no value defined for property: ${property.name} (${JSON.stringify(
                    property,
                    null,
                    '  '
                )}, ${JSON.stringify(context, null, '  ')})`
            )
        }

        switch (controlConfig.type) {
            case 'object':
                return (
                    <ObjectControl
                        property={property as ChartProperty<ObjectControlConfig>}
                        context={context}
                        value={value as Record<string, unknown>}
                        onChange={handleChange}
                    />
                )

            case 'range':
                return (
                    <RangeControl
                        property={property as ChartProperty<RangeControlConfig>}
                        context={context}
                        value={value as number}
                        onChange={handleChange}
                    />
                )

            case 'switch':
                return (
                    <SwitchControl
                        property={property as ChartProperty<SwitchControlConfig>}
                        context={context}
                        value={value as boolean}
                        onChange={handleChange}
                    />
                )

            case 'text':
                return (
                    <TextControl
                        property={property as ChartProperty<TextControlConfig>}
                        context={context}
                        value={value as string}
                        onChange={handleChange}
                    />
                )

            case 'opacity':
                return (
                    <OpacityControl
                        property={property as ChartProperty<OpacityControlConfig>}
                        context={context}
                        value={value as number}
                        onChange={handleChange}
                    />
                )

            default:
                throw new Error(
                    // @ts-expect-error
                    `invalid control type: ${controlConfig!.type} for property: ${property.name}`
                )
        }
    }
)

interface ControlGroupProps {
    name: string
    context?: ControlContext
    props: ChartProperty<any>[]
    value: Record<string, unknown>
    onChange: (v: any) => void
}

export const ControlGroup = ({ props, context, value, onChange }: ControlGroupProps) => (
    <>
        {props.map(prop => (
            <ControlSwitcher
                key={prop.name}
                property={prop}
                context={context}
                parentValue={value}
                onChange={onChange}
            />
        ))}
    </>
)
