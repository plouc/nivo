/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import set from 'lodash/set'
import merge from 'lodash/merge'
import snakeCase from 'lodash/snakeCase'
import pick from 'lodash/pick'
import classNames from 'classnames'
import CollapsibleCard from '../CollapsibleCard'
import SliderControl from './SliderControl'
import SwitchControl from './SwitchControl'
import SwitchableSliderControl from './SwitchableSliderControl'
import ColorsControl from './ColorsControl'
import QuantizeColorsControl from './QuantizeColorsControl'
import ColorControl from './ColorControl'
import ColorPickerControl from './ColorPickerControl'
import TextControl from './TextControl'
import Select from 'react-select'

export default class ChartControls extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
        group: PropTypes.string,
        ns: PropTypes.string.isRequired,
        mapValues: PropTypes.object.isRequired,
    }

    static defaultProps = {
        mapValues: {},
    }

    constructor(props) {
        super(props)

        this.state = {
            openedGroup: props.group || 'Base',
        }
    }

    mapValue = (key, value) => {
        const { settings, mapValues } = this.props
        const mapper = get(mapValues, key)
        if (mapper === undefined) return value
        return mapper(value, settings)
    }

    handleGroupToggle = groupName => {
        this.setState({ openedGroup: groupName })
    }

    handleSwitchUpdate = key => e => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, e.target.checked)))
    }

    handleRangeUpdate = key => e => {
        const { onChange, settings } = this.props
        onChange(merge({}, settings, set({}, key, Number(e.target.value))))
    }

    handleTextUpdate = key => e => {
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
        const { ns, settings } = this.props

        const id = `${ns}-${snakeCase(groupName)}-${config.name}`

        switch (config.type) {
            case 'choices':
                return (
                    <div className="chart-controls_item" key={config.name}>
                        <label className="control_label" htmlFor={id}>
                            {config.name}
                            :&nbsp;
                            <code className="code code-string">'{get(settings, config.name)}'</code>
                        </label>
                        <Select
                            id={id}
                            name={id}
                            value={get(settings, config.name)}
                            options={config.choices}
                            clearable={false}
                            onChange={this.handleSelectUpdate(config.name)}
                        />
                        <div className="control-help">{config.help}</div>
                    </div>
                )

            case 'range':
                return (
                    <SliderControl
                        {...pick(config, ['min', 'max', 'unit', 'step', 'help'])}
                        key={config.name}
                        id={id}
                        label={config.name}
                        value={get(settings, config.name)}
                        onChange={this.handleRangeUpdate(config.name)}
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
                    <SwitchableSliderControl
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
                    />
                )

            case 'colors':
                return (
                    <div className="chart-controls_item" key={config.name}>
                        <ColorsControl
                            value={get(settings, config.name)}
                            onChange={this.handleDirectUpdate(config.name)}
                        />
                    </div>
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
        const { groups: _groups, scope } = this.props
        const { openedGroup } = this.state

        const groups = _groups.filter(group => {
            return !group.scopes || group.scopes.includes(scope)
        })

        return (
            <CollapsibleCard title="Settings" expandedByDefault={true}>
                <div className="tabs__menu">
                    {groups.map(group => {
                        return (
                            <div
                                key={group.name}
                                className={classNames('no-select tabs__menu__item', {
                                    '_is-active': openedGroup === group.name,
                                })}
                                onClick={() => {
                                    this.handleGroupToggle(group.name)
                                }}
                            >
                                {group.name}
                            </div>
                        )
                    })}
                </div>
                {groups.map(group => {
                    return (
                        <div
                            key={group.name}
                            style={{
                                display: openedGroup === group.name ? 'block' : 'none',
                            }}
                        >
                            <div className="chart-controls">
                                {group.controls.map(control =>
                                    this.renderControl(group.name, control)
                                )}
                            </div>
                        </div>
                    )
                })}
            </CollapsibleCard>
        )
    }
}
