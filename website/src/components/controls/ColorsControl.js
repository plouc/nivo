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
import { defaultCategoricalColors } from '@nivo/core'
import Select from 'react-select'
import ColorsControlItem from './ColorsControlItem'
import { schemeCategory10, schemeCategory20, schemeCategory20b, schemeCategory20c } from 'd3-scale'
import {
    schemeAccent,
    schemeDark2,
    schemePaired,
    schemePastel1,
    schemePastel2,
    schemeSet1,
    schemeSet2,
    schemeSet3,
} from 'd3-scale-chromatic'

const colors = [
    { id: 'nivo', colors: defaultCategoricalColors().range() },
    { id: 'd310', colors: schemeCategory10 },
    { id: 'd320', colors: schemeCategory20 },
    { id: 'd320b', colors: schemeCategory20b },
    { id: 'd320c', colors: schemeCategory20c },
    { id: 'accent', colors: schemeAccent },
    { id: 'dark2', colors: schemeDark2 },
    { id: 'paired', colors: schemePaired },
    { id: 'pastel1', colors: schemePastel1 },
    { id: 'pastel2', colors: schemePastel2 },
    { id: 'set1', colors: schemeSet1 },
    { id: 'set2', colors: schemeSet2 },
    { id: 'set3', colors: schemeSet3 },
]

class ColorsControl extends Component {
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
        const { value } = this.props

        return (
            <div className="control control-colors">
                <label className="control_label">
                    colors:&nbsp;
                    <code className="code code-string">'{value}'</code>
                </label>
                <Select
                    options={colors.map(({ id, colors }) => ({
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
                <div className="control-help">Chart color range.</div>
            </div>
        )
    }
}

ColorsControl.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

export default ColorsControl
