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
import Select from './Select'
import ColorsControlItem from './ColorsControlItem'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

const options = Object.keys(quantizeColorScales).map(id => ({
    id,
    colors: quantizeColorScales[id],
}))

export default class QuantizeColorsControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        property: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
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
        const { id, property, flavors, currentFlavor, value } = this.props

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader {...property} />
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
                <Help>{property.help}</Help>
            </Control>
        )
    }
}
