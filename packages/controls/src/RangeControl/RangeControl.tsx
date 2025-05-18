import { memo, useCallback, ChangeEvent } from 'react'
import styled from 'styled-components'
import pick from 'lodash/pick.js'
import { ControlContext, ChartProperty } from '../types'
import { Control, ControlHeader, ControlHelp, ControlTextInput } from '../chrome'
import { RangeControlConfig } from './types'

interface RangeControlProps {
    property: ChartProperty<RangeControlConfig>
    value: number
    onChange: (v: number) => void
    context?: ControlContext
}

export const RangeControl = memo(({ property, value, onChange, context }: RangeControlProps) => {
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value)),
        [onChange]
    )

    return (
        <Control property={property} context={context}>
            <ControlHeader property={property} context={context} />
            <Row>
                <ControlTextInput
                    id={property.name}
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
            <ControlHelp>{property.help}</ControlHelp>
        </Control>
    )
})

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
    margin-bottom: 5px;
`
