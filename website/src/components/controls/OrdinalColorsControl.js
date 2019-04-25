/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
    colorSchemeIds,
    colorSchemes,
    isCategoricalColorScheme,
    isDivergingColorScheme,
    isSequentialColorScheme,
} from '@nivo/colors'
import { components } from 'react-select'
import ColorsControlItem from './ColorsControlItem'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Select from './Select'

const Value = styled.div`
    font-family: ${({ theme }) => theme.fontFamilyMono};
    margin: 10px 0 5px;
    font-size: 0.8rem;
    line-height: 1.7;
`

const options = colorSchemeIds.map(scheme => {
    let colors = []
    if (isCategoricalColorScheme(scheme)) {
        colors = colorSchemes[scheme]
    } else if (isDivergingColorScheme(scheme)) {
        colors = colorSchemes[scheme][11]
    } else if (isSequentialColorScheme(scheme)) {
        colors = colorSchemes[scheme][9]
    }

    return {
        label: scheme,
        value: scheme,
        colors,
    }
})

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

const OrdinalColorsControl = ({ id, property, flavors, currentFlavor, value, onChange }) => {
    const selectedOption = options.find(o => o.value === value.scheme)
    const handleChange = useCallback(
        option => {
            onChange({ scheme: option.value })
        },
        [onChange]
    )

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
                onChange={handleChange}
                value={selectedOption}
                isSearchable
                components={{
                    SingleValue,
                    Option,
                }}
            />
            {/*
            <Value>
                {`{ scheme: `}
                <code className="code-string">'{value.scheme}'</code>
                {` }`}
            </Value>
            */}
            <Help>{property.help}</Help>
        </Control>
    )
}

OrdinalColorsControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    options: PropTypes.shape({
        includeSequential: PropTypes.bool,
    }).isRequired,
}
OrdinalColorsControl.defaultProps = {
    options: {},
}

export default OrdinalColorsControl
