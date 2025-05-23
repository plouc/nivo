import React, { memo, useCallback } from 'react'
import get from 'lodash/get.js'
import snakeCase from 'lodash/snakeCase.js'
import { ChartProperty, ChartPropertyWithControl, Flavor } from '../../types'
import {
    AngleControlConfig,
    AnnotationsControlConfig,
    BlendModeControlConfig,
    BorderRadiusControlConfig,
    BoxAnchorControlConfig,
    BulletColorsControlConfig,
    CartesianOrientationControlConfig,
    ChoicesControlConfig,
    ColorInterpolatorsControlConfig,
    ColorPickerControlConfig,
    ContinuousColorsControlConfig,
    ControlContext,
    InheritedColorControlConfig,
    LineWidthControlConfig,
    MarginControlConfig,
    MotionConfigControlConfig,
    NumberArrayControlConfig,
    ObjectControlConfig,
    OpacityControlConfig,
    OrdinalColorsControlConfig,
    QuantizeColorsControlConfig,
    RadioControlConfig,
    RangeControlConfig,
    ScaleControlConfig,
    SwitchableRangeControlConfig,
    SwitchControlConfig,
    TextControlConfig,
    ValueFormatControlConfig,
} from './types'
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
    AngleControl,
    AnnotationsControl,
    BorderRadiusControl,
    BoxAnchorControl,
    CartesianOrientationControl,
    LineWidthControl,
    MarginControl,
    MotionConfigControl,
    ScaleControl,
    ValueFormatControl,
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
        const value = get(settings, property.name!)
        const controlConfig = 'control' in property ? property.control : undefined
        const handleChange = useCallback(
            (value: any) => {
                onChange({
                    ...settings,
                    [property.name!]: value,
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
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'object':
                return (
                    <ObjectControl
                        id={id}
                        property={property as ChartPropertyWithControl<ObjectControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'choices':
                return (
                    <ChoicesControl
                        id={id}
                        property={property as ChartPropertyWithControl<ChoicesControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'radio':
                return (
                    <RadioControl
                        id={id}
                        property={property as ChartPropertyWithControl<RadioControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'range':
                return (
                    <RangeControl
                        id={id}
                        property={property as ChartPropertyWithControl<RangeControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'switch':
                return (
                    <SwitchControl
                        id={id}
                        property={property as ChartPropertyWithControl<SwitchControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'switchableRange':
                return (
                    <SwitchableRangeControl
                        id={id}
                        property={
                            property as ChartPropertyWithControl<SwitchableRangeControlConfig>
                        }
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'text':
                return (
                    <TextControl
                        id={id}
                        property={property as ChartPropertyWithControl<TextControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'inheritedColor':
                return (
                    <InheritedColorControl
                        id={id}
                        property={property as ChartPropertyWithControl<InheritedColorControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'boxAnchor':
                return (
                    <BoxAnchorControl
                        id={id}
                        property={property as ChartPropertyWithControl<BoxAnchorControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'margin':
                return (
                    <MarginControl
                        id={id}
                        property={property as ChartPropertyWithControl<MarginControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'motionConfig':
                return (
                    <MotionConfigControl
                        id={id}
                        property={property as ChartPropertyWithControl<MotionConfigControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'opacity':
                return (
                    <OpacityControl
                        id={id}
                        property={property as ChartPropertyWithControl<OpacityControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'lineWidth':
                return (
                    <LineWidthControl
                        id={id}
                        property={property as ChartPropertyWithControl<LineWidthControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'numberArray':
                return (
                    <NumberArrayControl
                        id={id}
                        property={property as ChartPropertyWithControl<NumberArrayControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'quantizeColors':
                return (
                    <QuantizeColorsControl
                        id={id}
                        property={property as ChartPropertyWithControl<QuantizeColorsControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'ordinalColors':
                return (
                    <OrdinalColorsControl
                        id={id}
                        property={property as ChartPropertyWithControl<OrdinalColorsControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'colorPicker':
                return (
                    <ColorPickerControl
                        id={id}
                        property={property as ChartPropertyWithControl<ColorPickerControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'angle':
                return (
                    <AngleControl
                        id={id}
                        property={property as ChartPropertyWithControl<AngleControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'blendMode':
                return (
                    <BlendModeControl
                        id={id}
                        property={property as ChartPropertyWithControl<BlendModeControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'valueFormat':
                return (
                    <ValueFormatControl
                        id={id}
                        property={property as ChartPropertyWithControl<ValueFormatControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'annotations':
                return (
                    <AnnotationsControl
                        id={id}
                        property={property as ChartPropertyWithControl<AnnotationsControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'continuous_colors':
                return (
                    <ContinuousColorsControl
                        id={id}
                        property={
                            property as ChartPropertyWithControl<ContinuousColorsControlConfig>
                        }
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'color_interpolators':
                return (
                    <ColorInterpolatorsControl
                        id={id}
                        property={
                            property as ChartPropertyWithControl<ColorInterpolatorsControlConfig>
                        }
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'bullet_colors':
                return (
                    <BulletColorsControl
                        id={id}
                        property={property as ChartPropertyWithControl<BulletColorsControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'cartesianOrientation':
                return (
                    <CartesianOrientationControl
                        id={id}
                        property={
                            property as ChartPropertyWithControl<CartesianOrientationControlConfig>
                        }
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'scale':
                return (
                    <ScaleControl
                        id={id}
                        property={property as ChartPropertyWithControl<ScaleControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            case 'borderRadius':
                return (
                    <BorderRadiusControl
                        id={id}
                        property={property as ChartPropertyWithControl<BorderRadiusControlConfig>}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        onChange={handleChange}
                        context={context}
                    />
                )

            default:
                throw new Error(
                    // @ts-expect-error this can happen at runtime.
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
