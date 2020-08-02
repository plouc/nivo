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
import styled from 'styled-components'
import pick from 'lodash/pick'
import Control from './Control'
import TextInput from './TextInput'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

const RangeControl = memo(({ id, property, flavors, currentFlavor, options, value, onChange }) => {
    const handleChange = useCallback(event => onChange(Number(event.target.value)), [onChange])

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader id={id} {...property} />
            <Row>
                <TextInput
                    id={id}
                    value={value}
                    unit={options.unit}
                    isNumber={true}
                    onChange={handleChange}
                />
                <input
                    type="range"
                    value={value}
                    onChange={handleChange}
                    {...pick(options, ['min', 'max', 'step'])}
                />
            </Row>
            <Help>{property.help}</Help>
        </Control>
    )
})

RangeControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.shape({
        unit: PropTypes.string,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
    }).isRequired,
}

export default RangeControl

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
    margin-bottom: 5px;
`
