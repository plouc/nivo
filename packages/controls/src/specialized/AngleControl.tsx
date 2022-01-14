import { useCallback } from 'react'
import styled from 'styled-components'
import { AngleControlProps } from '../types'
import { ControlContainer, Header, Help, TextInput, Slider } from '../ui'

const size = 36
const center = size / 2
const markerSize = 6

export const AngleControl = ({
    name,
    help,
    value,
    start = 0,
    min = 0,
    max = 360,
    onChange,
    context = { path: [] },
}: AngleControlProps) => {
    const handleChange = useCallback(
        event => {
            onChange?.(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <ControlContainer name={name}>
            <TopContainer>
                <svg width={size} height={size}>
                    <Circle cx={center} cy={center} r={center - markerSize / 2} />
                    <g transform={`translate(${center},${center})`}>
                        <g transform={`rotate(${start + value})`}>
                            <Line y2={-size / 2 + markerSize / 2} />
                            <Marker r={markerSize / 4} />
                            <Marker cy={-size / 2 + markerSize / 2} r={markerSize / 2} />
                        </g>
                    </g>
                </svg>
                <Header name={name} context={context} />
                <TextInput
                    name={name}
                    value={value}
                    onChange={handleChange}
                    unit="°"
                    isNumber={true}
                />
            </TopContainer>
            <Slider type="range" value={value} onChange={handleChange} min={min} max={max} />
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

const BottomContainer = styled.div`
    display: flex;
    align-items: center;

    & svg {
        margin-right: 9px;
    }

    & input {
        flex: 1;
    }
`

const Circle = styled.circle`
    fill: ${({ theme }) => theme.colors.background};
    stroke-width: 1px;
    stroke: ${({ theme }) => theme.colors.border};
`

const Line = styled.line`
    stroke: ${({ theme }) => theme.colors.accent};
`

const Marker = styled.circle`
    fill: ${({ theme }) => theme.colors.accent};
`
