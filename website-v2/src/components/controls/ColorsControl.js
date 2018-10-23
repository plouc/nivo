/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import { colorSchemeIds, colorSchemes, colorInterpolatorIds, colorInterpolators } from '@nivo/core'
import Select from 'react-select'
import ColorsControlItem from './ColorsControlItem'

const colors = colorSchemeIds.map(id => ({
    id,
    colors: colorSchemes[id],
}))

const sequentialColors = colorInterpolatorIds.map(id => ({
    id: `seq:${id}`,
    colors: range(0, 1, 0.05).map(t => colorInterpolators[id](t)),
}))

export default class ColorsControl extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        includeSequential: PropTypes.bool.isRequired,
        help: PropTypes.node.isRequired,
    }

    static defaultProps = {
        label: 'colors',
        help: 'Chart color range.',
        includeSequential: false,
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
        const { label, value, includeSequential, help } = this.props

        let options = colors
        if (includeSequential === true) {
            options = options.concat(sequentialColors)
        }

        return (
            <div className="control control-colors">
                <label className="control_label">
                    {label}
                    :&nbsp;
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
                <div className="control-help">{help}</div>
            </div>
        )
    }
}
