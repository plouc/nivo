/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import set from 'lodash/set'
import isFunction from 'lodash/isFunction'
import merge from 'lodash/merge'
import snakeCase from 'lodash/snakeCase'
import pick from 'lodash/pick'
import { getPropertiesGroupControls } from '../../lib/componentProperties'
import ArrayControl from '../controls/ArrayControl'
import ObjectControl from './controls/ObjectControl'
import SwitchControl from './controls/SwitchControl'
import SwitchableRangeControl from './controls/SwitchableRangeControl'
import ColorsControl from '../controls/ColorsControl'
import QuantizeColorsControl from '../controls/QuantizeColorsControl'
import ColorControl from '../controls/ColorControl'
import ColorPickerControl from '../controls/ColorPickerControl'
import TextControl from './controls/TextControl'
import RadioControl from './controls/RadioControl'
import RangeControl from './controls/RangeControl'
import ChoicesControl from './controls/ChoicesControl'
import MarginControl from './controls/MarginControl'
import AxisControl from './controls/AxisControl'

export const shouldRenderControl = (config, context) => {
    if (!isFunction(config.when)) return true
    return config.when(context)
}

export default class ControlsGroup extends Component {
    static propTypes = {
        component: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        controls: PropTypes.array.isRequired,
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        isNested: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        isNested: false,
    }

    handleArrayUpdate = key => value => {
        const { onChange, settings } = this.props
        onChange(set({ ...settings }, key, value))
    }

    handleSwitchUpdate = key => e => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, e.target.checked)))
    }

    handleTextUpdate = key => e => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, e.target.value)))
    }

    handleRadioUpdate = key => e => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, e.target.value)))
    }

    handleDirectUpdate = key => value => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, value)))
    }

    handleSelectUpdate = key => value => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, value.value)))
    }

    renderControl(groupName, config) {
        const { component, settings } = this.props

        const id = `${component}-${snakeCase(groupName)}-${config.name}`

        if (!shouldRenderControl(config, settings)) {
            return null
        }

        switch (config.type) {
            case 'array':
                return (
                    <ArrayControl
                        key={config.name}
                        component={component}
                        label={config.name}
                        help={config.help}
                        onChange={this.handleArrayUpdate(config.name)}
                        value={get(settings, config.name)}
                        props={getPropertiesGroupControls(config.props)}
                        shouldCreate={config.shouldCreate}
                        addLabel={config.addLabel}
                        shouldRemove={config.shouldRemove}
                        defaults={config.defaults}
                        getItemTitle={config.getItemTitle}
                    />
                )

            case 'object':
                return (
                    <ObjectControl
                        key={config.name}
                        component={component}
                        label={config.name}
                        help={config.help}
                        onChange={this.handleArrayUpdate(config.name)}
                        value={get(settings, config.name)}
                        props={getPropertiesGroupControls(config.props)}
                        defaults={config.defaults}
                    />
                )

            case 'choices':
                return (
                    <ChoicesControl
                        key={config.name}
                        id={config.name}
                        label={config.name}
                        help={config.help}
                        choices={config.choices}
                        value={get(settings, config.name)}
                        onChange={this.handleSelectUpdate(config.name)}
                    />
                )
            /*
                return (
                        <Select
                            id={id}
                            name={id}
                            value={get(settings, config.name)}
                            onChange={this.handleSelectUpdate(config.name)}
                            {...omit(config, ['name', 'help', 'type', 'choices'])}
                        />
                )
                */

            case 'radio':
                return (
                    <RadioControl
                        key={config.name}
                        id={id}
                        label={config.name}
                        choices={config.choices}
                        value={get(settings, config.name)}
                        onChange={this.handleRadioUpdate(config.name)}
                        help={config.help}
                    />
                )

            case 'range':
                return (
                    <RangeControl
                        {...pick(config, ['min', 'max', 'unit', 'step', 'help'])}
                        key={config.name}
                        id={id}
                        label={config.name}
                        value={get(settings, config.name)}
                        onChange={this.handleDirectUpdate(config.name)}
                    />
                )

            case 'switch':
                return (
                    <SwitchControl
                        key={config.name}
                        id={id}
                        label={config.name}
                        value={get(settings, config.name)}
                        onChange={this.handleSwitchUpdate(config.name)}
                        help={config.help}
                    />
                )

            case 'switchableRange':
                return (
                    <SwitchableRangeControl
                        {...pick(config, [
                            'min',
                            'max',
                            'defaultValue',
                            'disabledValue',
                            'unit',
                            'step',
                            'help',
                        ])}
                        key={config.name}
                        id={id}
                        label={config.name}
                        value={get(settings, config.name)}
                        onChange={this.handleDirectUpdate(config.name)}
                    />
                )

            case 'text':
                return (
                    <TextControl
                        key={config.name}
                        id={id}
                        label={config.name}
                        value={get(settings, config.name)}
                        onChange={this.handleTextUpdate(config.name)}
                        help={config.help}
                        disabled={config.disabled}
                    />
                )

            case 'colors':
                return (
                    <div className="chart-controls_item" key={config.name}>
                        <ColorsControl
                            label={config.name}
                            value={get(settings, config.name)}
                            includeSequential={!!config.includeSequential}
                            onChange={this.handleDirectUpdate(config.name)}
                            help={config.help}
                        />
                    </div>
                )

            case 'margin':
                return (
                    <MarginControl
                        key={config.name}
                        component={component}
                        id={config.name}
                        help={config.help}
                        label={config.name}
                        value={get(settings, config.name)}
                        onChange={this.handleDirectUpdate(config.name)}
                    />
                )

            case 'axis':
                return (
                    <AxisControl
                        key={config.name}
                        component={component}
                        id={config.name}
                        label={config.name}
                        help={config.help}
                        value={get(settings, config.name)}
                        onChange={this.handleArrayUpdate(config.name)}
                    />
                )

            case 'quantizeColors':
                return (
                    <div className="chart-controls_item" key={config.name}>
                        <QuantizeColorsControl
                            value={get(settings, config.name)}
                            onChange={this.handleDirectUpdate(config.name)}
                            help={config.help}
                        />
                    </div>
                )

            case 'color':
                return (
                    <div className="chart-controls_item" key={config.name}>
                        <ColorControl
                            label={config.name}
                            value={get(settings, config.name)}
                            onChange={this.handleDirectUpdate(config.name)}
                            {...pick(config, [
                                'withTheme',
                                'withCustomColor',
                                'defaultCustomColor',
                                'help',
                            ])}
                        />
                    </div>
                )

            case 'colorPicker':
                return (
                    <div className="chart-controls_item" key={config.name}>
                        <ColorPickerControl
                            label={config.name}
                            help={config.help}
                            onChange={this.handleDirectUpdate(config.name)}
                            value={get(settings, config.name)}
                        />
                    </div>
                )

            default:
                return null
        }
    }

    render() {
        const { name, controls, isNested } = this.props

        if (isNested === true) {
            return <Fragment>{controls.map(control => this.renderControl(name, control))}</Fragment>
        }

        return (
            <div className="Controls_Group">
                {controls.map(control => this.renderControl(name, control))}
            </div>
        )
    }
}
