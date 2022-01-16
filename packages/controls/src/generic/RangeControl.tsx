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
    return (
        <ControlContainer id={id} description={description}>
            <TopContainer>
                <Label id={id} label={label} inputType="range" context={context} />
                <TextInput<number> id={id} value={value} unit={unit} isNumber={true} onChange={onChange} />
            </TopContainer>
            <Slider id={id} min={min} max={max} step={step} value={value} onChange={onChange} />
        </ControlContainer>
    )
}

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
`
