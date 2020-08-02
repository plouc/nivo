/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import snakeCase from 'lodash/snakeCase'
import ArrayControl from './ArrayControl'
import ObjectControl from './ObjectControl'
import SwitchControl from './SwitchControl'
import SwitchableRangeControl from './SwitchableRangeControl'
import ColorsControl from './ColorsControl'
import QuantizeColorsControl from './QuantizeColorsControl'
import ColorPickerControl from './ColorPickerControl'
import TextControl from './TextControl'
import RadioControl from './RadioControl'
import RangeControl from './RangeControl'
import ChoicesControl from './ChoicesControl'
import BoxAnchorControl from './BoxAnchorControl'
import MarginControl from './MarginControl'
import OpacityControl from './OpacityControl'
import LineWidthControl from './LineWidthControl'
import MotionConfigControl from './MotionConfigControl'
import NumberArrayControl from './NumberArrayControl'
import AngleControl from './AngleControl'
import OrdinalColorsControl from './OrdinalColorsControl'
import InheritedColorControl from './InheritedColorControl'
import BlendModeControl from './BlendModeControl'
import PropertyDocumentation from './PropertyDocumentation'
import ValueFormatControl from './ValueFormatControl'

export const shouldRenderProperty = (property, currentSettings) => {
    if (typeof property.when !== 'function') return true
    return property.when(currentSettings)
}

const ControlSwitcher = memo(
    ({ groupName, flavors, currentFlavor, property, settings, onChange, context }) => {
        // generate a unique identifier for the property
        const id = `${snakeCase(groupName)}-${property.name}`
        const value = get(settings, property.name)
        const options = property.controlOptions || {}
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

        let shouldRenderControl = property.controlType !== undefined
        if (Array.isArray(property.flavors) && !property.flavors.includes(currentFlavor)) {
            shouldRenderControl = false
        }
        if (
            Array.isArray(property.enableControlForFlavors) &&
            !property.enableControlForFlavors.includes('currentFlavor')
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
                />
            )
        }

        if (value === undefined) {
            throw new Error(`no value defined for property: ${property.name}`)
        }

        switch (property.controlType) {
            case 'array':
                return (
                    <ArrayControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        value={value}
                        options={options}
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
                        options={options}
                        value={value}
                        props={options.props}
                        defaults={options.defaults}
                        isOpenedByDefault={options.isOpenedByDefault}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            case 'colors':
                return (
                    <ColorsControl
                        id={id}
                        property={property}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
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
                        options={options}
                        value={value}
                        context={context}
                        onChange={handleChange}
                    />
                )

            default:
                throw new Error(
                    `invalid control type: ${property.controlType} for property: ${property.name}`
                )
        }
    }
)

ControlSwitcher.propTypes = {
    groupName: PropTypes.string.isRequired,
    property: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    context: PropTypes.object,
}

const ControlsGroup = ({ name, flavors, currentFlavor, controls, settings, onChange, context }) => {
    return controls.map(control => (
        <ControlSwitcher
            key={control.name}
            groupName={name}
            flavors={flavors}
            currentFlavor={currentFlavor}
            property={control}
            settings={settings}
            onChange={onChange}
            context={context}
        />
    ))
}

ControlsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    controls: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            group: PropTypes.string.isRequired,
            flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])),
            controlOptions: PropTypes.object,
        })
    ).isRequired,
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}
ControlsGroup.defaultProps = {
    flavors: ['svg'],
    currentFlavor: 'svg',
}

export default ControlsGroup
