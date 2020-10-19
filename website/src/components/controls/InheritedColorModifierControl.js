/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from './Select'
import TextInput from './TextInput'

const modifierTypes = ['brighter', 'darker', 'opacity'].map(prop => ({
    label: prop,
    value: prop,
}))

const InheritedColorModifierControl = ({ modifier, onChange }) => {
    return (
        <Container>
            <Select
                options={modifierTypes}
                value={modifierTypes.find(prop => prop.value === modifier[0])}
                onChange={value => onChange([value.value, modifier[1]])}
            />
            <TextInput
                value={modifier[1]}
                isNumber={true}
                onChange={event => onChange([modifier[0], event.target.value])}
            />
            <input
                type="range"
                value={modifier[1]}
                min={0}
                max={3}
                step={0.1}
                onChange={event => onChange([modifier[0], event.target.value])}
            />
        </Container>
    )
}

InheritedColorModifierControl.propTypes = {
    modifier: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default InheritedColorModifierControl

const Container = styled.div`
    display: grid;
    grid-template-columns: 110px 40px auto;
    margin-bottom: 5px;
    align-items: center;
    grid-column-gap: 12px;
`
