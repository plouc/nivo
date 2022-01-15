import { useCallback } from 'react'
import styled from 'styled-components'
import { LineWidthControlProps } from '../types'
import { ControlContainer, Label, TextInput, Slider } from '../ui'

const size = 24

export const LineWidthControl = ({
    id,
    label,
    icon,
    value,
    onChange,
    min = 0,
    max = 20,
    step = 1,
    context = { path: [] },
}: LineWidthControlProps) => {
    const handleChange = useCallback(
        event => {
            onChange?.(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <ControlContainer id={id}>
            <TopContainer>
                <svg width={size} height={size}>
                    <Line y1={size / 2} x2={size} y2={size / 2} />
                    <Marker
                        x1={size * 0.2}
                        y1={size / 2}
                        x2={size * 0.8}
                        y2={size / 2}
                        strokeWidth={value}
                    />
                </svg>
                <Label id={id} label={label} icon={icon} context={context} />
                <TextInput
                    id={id}
                    value={value}
                    onChange={handleChange}
                    unit="px"
                    isNumber={true}
                />
            </TopContainer>
            <Slider
                type="range"
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
            />
        </ControlContainer>
    )
}

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;

    & > *:nth-child(1) {
        margin-right: 9px;
    }

    & > *:nth-child(2) {
        flex: 1;
    }

    & > *:nth-child(3) {
        margin-left: 9px;
    }
`

const Line = styled.line`
    stroke: ${({ theme }) => theme.colors.border};
    stroke-width: 1px;
    fill: none;
`

const Marker = styled.line`
    stroke: ${({ theme }) => theme.colors.accent};
    fill: none;
`
