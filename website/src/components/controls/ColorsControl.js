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
import {
    colorSchemeIds,
    colorSchemes,
    colorInterpolatorIds,
    colorInterpolators,
} from '@nivo/colors'
import { components } from 'react-select'
import ColorsControlItem from './ColorsControlItem'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Select from './Select'

const colors = colorSchemeIds.map(id => ({
    id,
    colors: colorSchemes[id],
}))

const sequentialColors = colorInterpolatorIds.map(id => ({
    id: `seq:${id}`,
    colors: range(0, 1, 0.05).map(t => colorInterpolators[id](t)),
}))

const SingleValue = props => {
    return (
        <components.SingleValue {...props}>
            <ColorsControlItem id={props.data.label} colors={props.data.colors} />
        </components.SingleValue>
    )
}

const Option = props => {
    return (
        <components.Option {...props}>
            <ColorsControlItem id={props.value} colors={props.data.colors} />
        </components.Option>
    )
}

export default class ColorsControl extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        property: PropTypes.object.isRequired,
        flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
        currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        options: PropTypes.shape({
            includeSequential: PropTypes.bool,
        }).isRequired,
    }

    static defaultProps = {
        options: {},
    }

    handleColorsChange = value => {
        const { onChange } = this.props
        onChange(value.value)
    }

    render() {
        const { id, property, flavors, currentFlavor, value, includeSequential } = this.props

        let options = colors
        if (includeSequential === true) {
            options = options.concat(sequentialColors)
        }
        options = options.map(({ id, colors }) => ({
            label: id,
            value: id,
            colors,
        }))
        const selectedOption = options.find(o => o.value === value)

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
                    options={options}
                    onChange={this.handleColorsChange}
                    value={selectedOption}
                    isSearchable
                    components={{
                        SingleValue,
                        Option,
                    }}
                />
                <Help>{property.help}</Help>
            </Control>
        )
    }
}
