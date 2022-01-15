import { useCallback } from 'react'
import styled from 'styled-components'
import { RangeControlProps } from '../types'
import { ControlContainer, Label, TextInput, Slider } from '../ui'

export const RangeControl = ({
    id,
    label,
    description,
    min,
    max,
    step = 1,
    unit,
    value,
    onChange,
    context = { path: [] },
}: RangeControlProps) => {
    const handleChange = useCallback(event => onChange?.(Number(event.target.value)), [onChange])

    return (
        <ControlContainer id={id} description={description}>
            <TopContainer>
                <Label id={id} label={label} context={context} />
                <TextInput
                    id={id}
                    value={value}
                    unit={unit}
                    isNumber={true}
                    onChange={handleChange}
                />
            </TopContainer>
            <Slider
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
            />
        </ControlContainer>
    )
}

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
`
