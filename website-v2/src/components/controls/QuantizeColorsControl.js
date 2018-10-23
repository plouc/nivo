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
import { quantizeColorScales } from '@nivo/core'
import Select from 'react-select'
import ColorsControlItem from './ColorsControlItem'

const options = Object.keys(quantizeColorScales).map(id => ({
    id,
    colors: quantizeColorScales[id],
}))

export default class QuantizeColorsControl extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        help: PropTypes.node,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleColorsChange = value => {
        const { onChange } = this.props
        onChange(value.value)
    }

    renderOption(option) {
        return <ColorsControlItem id={option.value} colors={option.colors} />
    }

    renderValue(value) {
        return (
            <div className="colors_item colors_item-current">
                <div className="colors_item_colors">
                    {value.colors.map(color => (
                        <span
                            key={color}
                            className="colors_item_colors_item"
                            style={{ background: color }}
                        />
                    ))}
                </div>
            </div>
        )
    }

    render() {
        const { help, value } = this.props

        return (
            <div className="control control-colors">
                <label className="control_label">
                    colors:&nbsp;
                    <code className="code code-string">'{value}'</code>
                </label>
                <Select
                    options={options.map(({ id, colors }) => ({
                        label: id,
                        value: id,
                        colors,
                    }))}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderValue}
                    onChange={this.handleColorsChange}
                    value={value}
                    clearable={false}
                />
                {help && <div className="control-help">{help}</div>}
            </div>
        )
    }
}
