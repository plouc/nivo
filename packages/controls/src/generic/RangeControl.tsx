import { useCallback } from 'react'
import styled from 'styled-components'
import { RangeControlProps } from '../types'
import { ControlContainer, Header, TextInput, Slider } from '../ui'

export const RangeControl = ({
    name,
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
        <ControlContainer name={name} description={description}>
            <TopContainer>
                <Header name={name} context={context} />
                <TextInput
                    name={name}
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
