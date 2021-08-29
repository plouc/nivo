import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import pick from 'lodash/pick'
import { Control } from './Control'
import { TextInput } from './TextInput'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Flavor } from '../../types'

interface RangeControlProps {
    id: string
    property: any
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number
    onChange: (value: number) => void
    options: {
        unit: 'px' | '°'
        min: number
        max: number
        step?: number
    }
}

export const RangeControl = memo(
    ({ id, property, flavors, currentFlavor, options, value, onChange }: RangeControlProps) => {
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
    }
)

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
    margin-bottom: 5px;
`
