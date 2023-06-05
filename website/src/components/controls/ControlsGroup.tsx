import React, { memo, useCallback } from 'react'
import get from 'lodash/get'
import snakeCase from 'lodash/snakeCase'
import { ChartProperty, Flavor } from '../../types'
import { ControlContext } from './types'
import {
    ArrayControl,
    ObjectControl,
    SwitchControl,
    SwitchableRangeControl,
    TextControl,
    RadioControl,
    RangeControl,
    ChoicesControl,
    NumberArrayControl,
    PropertyDocumentation,
} from './generics'
import {
    BoxAnchorControl,
    MarginControl,
    LineWidthControl,
    MotionConfigControl,
    AngleControl,
    ValueFormatControl,
    AnnotationsControl,
} from './specialized'
import {
    BlendModeControl,
    BulletColorsControl,
    ColorInterpolatorsControl,
    ContinuousColorsControl,
    ColorPickerControl,
    OrdinalColorsControl,
    OpacityControl,
    InheritedColorControl,
    QuantizeColorsControl,
} from './colors'

// add some extra logic to render properties conditionally
// depending on the current settings.
export const shouldRenderProperty = (property: ChartProperty, currentSettings: any) => {
    if (typeof property.when !== 'function') return true
    return property.when(currentSettings)
}

interface ControlSwitcherProps {
    groupName: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    settings: any
    onChange: any
    context?: ControlContext
}

const ControlSwitcher = memo(
    ({
        groupName,
        flavors = ['svg'],
        currentFlavor = 'svg',
        property,
        settings,
        onChange,
        context,
    }: ControlSwitcherProps) => {
        // generate a unique identifier for the property
        const id = `${snakeCase(groupName)}-${property.name}`
        const value = get(settings, property.name)
        const controlConfig = 'control' in property ? property.control : undefined
        const handleChange = useCallback(
            value => {
                onChange({
                    ...settings,
                    [property.name]: value,
                })
            },
            [onChange, settings, property.name]
        )

        if (!shouldRenderProperty(property, settings)) {
            return null
        }

        let shouldRenderControl = controlConfig !== undefined

        // the property is not available for the current flavor
        if (Array.isArray(property.flavors) && !property.flavors.includes(currentFlavor)) {
            shouldRenderControl = false
        }

        // the control is only available for certain flavors in the UI
        // while being available for usage, this is typically used for
        // `width` & `height` properties, which cannot be set for the demos
        // as we use the responsive version of the charts, but has to be defined
        // when using the HTTP API.
        if (
            Array.isArray(property.enableControlForFlavors) &&
            !property.enableControlForFlavors.includes(currentFlavor)
        ) {
            shouldRenderControl = false
        }

        if (!shouldRenderControl) {
            return (
                <PropertyDocumentation
                    id={id}
                    property={property}
                    flavors={flavors}
                    currentFlavor={currentFlavor}
                    context={context}
                />
            )
        }

        // every property which has a control should have a value
        if (value === undefined) {
            throw new Error(
                `no value defined for property: ${property.name} (${JSON.stringify(
                    property,
                    null,
                    '  '
                )}, ${JSON.stringify(context, null, '  ')})`
            )
        }

        switch (controlConfig!.type) {
            case 'array':
                return (
                    <ArrayControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        config={controlConfig}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'object':
                return (
                    <ObjectControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'choices':
                return (
                    <ChoicesControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'radio':
                return (
                    <RadioControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'range':
                return (
                    <RangeControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'switch':
                return (
                    <SwitchControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'switchableRange':
                return (
                    <SwitchableRangeControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'text':
                return (
                    <TextControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'inheritedColor':
                return (
                    <InheritedColorControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'boxAnchor':
                return (
                    <BoxAnchorControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'margin':
                return (
                    <MarginControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'motionConfig':
                return (
                    <MotionConfigControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'opacity':
                return (
                    <OpacityControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'lineWidth':
                return (
                    <LineWidthControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'numberArray':
                return (
                    <NumberArrayControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'quantizeColors':
                return (
                    <QuantizeColorsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'ordinalColors':
                return (
                    <OrdinalColorsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'colorPicker':
                return (
                    <ColorPickerControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'angle':
                return (
                    <AngleControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'blendMode':
                return (
                    <BlendModeControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'valueFormat':
                return (
                    <ValueFormatControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'annotations':
                return (
                    <AnnotationsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'continuous_colors':
                return (
                    <ContinuousColorsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'color_interpolators':
                return (
                    <ColorInterpolatorsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'bullet_colors':
                return (
                    <BulletColorsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        config={controlConfig}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            default:
                throw new Error(
                    `invalid control type: ${controlConfig!.type} for property: ${property.name}`
                )
        }
    }
)

interface ControlsGroupProps {
    name: string
    flavors?: Flavor[]
    currentFlavor?: Flavor
    controls: ChartProperty[]
    settings: any
    onChange: any
    context?: ControlContext
}

export const ControlsGroup = ({
    name,
    flavors = ['svg'],
    currentFlavor = 'svg',
    controls,
    settings,
    onChange,
    context,
}: ControlsGroupProps) => (
    <>
        {controls.map((control, index) => (
            <ControlSwitcher
                key={`${control.name}.${index}`}
                groupName={name}
                flavors={flavors}
                currentFlavor={currentFlavor}
                property={control}
                settings={settings}
                onChange={onChange}
                context={context}
            />
        ))}
    </>
)
