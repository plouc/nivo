import React from 'react'
import styled from 'styled-components'
import { TextInput, Select } from '../ui'

const modifierTypes = ['brighter', 'darker', 'opacity'].map(prop => ({
    label: prop,
    value: prop,
}))

interface InheritedColorModifierControlProps {
    modifier: any[]
    onChange: (modifier: any[]) => void
}

export const InheritedColorModifierControl = ({
    modifier,
    onChange,
}: InheritedColorModifierControlProps) => {
    return (
        <Container>
            <Select
                options={modifierTypes}
                value={modifierTypes.find(prop => prop.value === modifier[0])}
                onChange={(value: any) => onChange([value.value, modifier[1]])}
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

const Container = styled.div`
    display: grid;
    grid-template-columns: 110px 40px auto;
    margin-bottom: 5px;
    align-items: center;
    grid-column-gap: 12px;
`
