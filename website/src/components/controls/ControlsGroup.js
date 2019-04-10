/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import snakeCase from 'lodash/snakeCase'
import pick from 'lodash/pick'
import { getPropertiesGroupControls } from '../../lib/componentProperties'
import ArrayControl from './ArrayControl'
import ObjectControl from './ObjectControl'
import SwitchControl from './SwitchControl'
import SwitchableRangeControl from './SwitchableRangeControl'
import ColorsControl from './ColorsControl'
import QuantizeColorsControl from './QuantizeColorsControl'
import ColorControl from './ColorControl'
import ColorPickerControl from './ColorPickerControl'
import TextControl from './TextControl'
import RadioControl from './RadioControl'
import RangeControl from './RangeControl'
import ChoicesControl from './ChoicesControl'
import BoxAnchorControl from './BoxAnchorControl'
import MarginControl from './MarginControl'
import OpacityControl from './OpacityControl'
import LineWidthControl from './LineWidthControl'
import NumberArrayControl from './NumberArrayControl'
import AngleControl from './AngleControl'
import OrdinalColorsControl from './OrdinalColorsControl'
import PropertyDocumentation from './PropertyDocumentation'

export const shouldRenderControl = (config, context) => {
    if (!isFunction(config.when)) return true
    return config.when(context)
}

const ControlChoser = memo(({ groupName, property, settings, onChange }) => {
    const id = `${snakeCase(groupName)}-${property.name}`
    const value = get(settings, property.name)
    const handleChange = useCallback(onChange(property.name), [onChange, property.name])
    const options = property.controlOptions || {}

    if (!shouldRenderControl(property, settings)) {
        return null
    }

    switch (property.controlType) {
        case 'array':
            return (
                <ArrayControl
                    id={id}
                    property={property}
                    value={value}
                    options={{
                        ...options,
                        props: getPropertiesGroupControls(options.props),
                    }}
                    onChange={handleChange}
                />
            )

        case 'object':
            return (
                <ObjectControl
                    id={id}
                    property={property}
                    value={value}
                    props={getPropertiesGroupControls(options.props)}
                    defaults={options.defaults}
                    onChange={handleChange}
                />
            )

        case 'choices':
            return (
                <ChoicesControl
                    id={id}
                    property={property}
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'radio':
            return (
                <RadioControl
                    id={id}
                    property={property}
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'range':
            return (
                <RangeControl
                    id={id}
                    value={value}
                    property={property}
                    options={options}
                    onChange={handleChange}
                />
            )

        case 'switch':
            return (
                <SwitchControl id={id} property={property} value={value} onChange={handleChange} />
            )

        case 'switchableRange':
            return (
                <SwitchableRangeControl
                    id={id}
                    property={property}
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'text':
            return (
                <TextControl
                    id={id}
                    property={property}
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'colors':
            return (
                <ColorsControl
                    id={id}
                    property={property}
                    value={value}
                    options={options}
                    onChange={handleChange}
                />
            )

        case 'boxAnchor':
            return (
                <BoxAnchorControl
                    id={id}
                    property={property}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'margin':
            return (
                <MarginControl id={id} property={property} value={value} onChange={handleChange} />
            )

        case 'opacity':
            return (
                <OpacityControl id={id} property={property} value={value} onChange={handleChange} />
            )

        case 'lineWidth':
            return (
                <LineWidthControl
                    id={id}
                    property={property}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'numberArray':
            return (
                <NumberArrayControl
                    id={id}
                    property={property}
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'quantizeColors':
            return (
                <QuantizeColorsControl
                    id={id}
                    property={property}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'ordinalColors':
            return (
                <OrdinalColorsControl
                    id={id}
                    property={property}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'color':
            return (
                <ColorControl
                    id={id}
                    property={property}
                    value={value}
                    {...pick(options, [
                        'withTheme',
                        'withCustomColor',
                        'defaultCustomColor',
                        'help',
                    ])}
                    onChange={handleChange}
                />
            )

        case 'colorPicker':
            return (
                <ColorPickerControl
                    id={id}
                    property={property}
                    value={value}
                    onChange={handleChange}
                />
            )

        case 'angle':
            return (
                <AngleControl
                    id={id}
                    property={property}
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            )

        default:
            return <PropertyDocumentation property={property} />
    }
})

const ControlsGroup = ({ name, controls, settings, onChange }) => {
    const setValue = useCallback(
        key => value => {
            onChange({
                ...settings,
                [key]: value,
            })
        },
        [settings, onChange]
    )

    return (
        <Fragment>
            {controls.map(control => {
                return (
                    <ControlChoser
                        key={control.name}
                        groupName={name}
                        property={control}
                        settings={settings}
                        onChange={setValue}
                    />
                )
            })}
        </Fragment>
    )
}

ControlsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    controls: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ControlsGroup
