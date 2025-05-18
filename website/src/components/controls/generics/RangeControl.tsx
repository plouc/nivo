import React, { memo, useCallback, ChangeEvent } from 'react'
import styled from 'styled-components'
import pick from 'lodash/pick.js'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ControlContext, RangeControlConfig } from '../types'
import { Control, TextInput } from '../ui'

interface RangeControlProps {
    id: string
    property: ChartPropertyWithControl<RangeControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number
    onChange: (value: number) => void
    context?: ControlContext
}

export const RangeControl = memo(
    ({ id, property, flavors, currentFlavor, value, onChange, context }: RangeControlProps) => {
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value)),
            [onChange]
        )

        return (
            <Control
                id={id}
                property={property}
                flavors={flavors}
                currentFlavor={currentFlavor}
                context={context}
            >
                <Row>
                    <TextInput
                        id={id}
                        value={value}
                        unit={property.control.unit}
                        isNumber={true}
                        onChange={handleChange}
                    />
                    <input
                        type="range"
                        value={value}
                        onChange={handleChange}
                        {...pick(property.control, ['min', 'max', 'step'])}
                    />
                </Row>
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
