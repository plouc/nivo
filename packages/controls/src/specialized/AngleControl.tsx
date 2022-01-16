import styled from 'styled-components'
import { AngleControlProps } from '../types'
import { ControlContainer, Label, TextInput, Slider } from '../ui'

const size = 36
const center = size / 2
const markerSize = 5

export const AngleControl = ({
    id,
    label,
    icon,
    value,
    start = 0,
    min = 0,
    max = 360,
    onChange,
    context = { path: [] },
}: AngleControlProps) => {
    return (
        <ControlContainer id={id}>
            <TopContainer>
                <svg width={size} height={size}>
                    <Circle cx={center} cy={center} r={center - markerSize / 2} />
                    <g transform={`translate(${center},${center})`}>
                        <g transform={`rotate(${start + value})`}>
                            <Line y2={-size / 2 + markerSize / 2} />
                            <Marker r={markerSize / 2} />
                            <Marker cy={-size / 2 + markerSize / 2} r={markerSize / 2} />
                        </g>
                    </g>
                </svg>
                <Label id={id} label={label} inputType="range" icon={icon} context={context} />
                <TextInput<number> id={id} value={value} onChange={onChange} unit="°" isNumber={true} />
            </TopContainer>
            <Slider id={id} min={min} max={max} value={value} onChange={onChange} />
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

const Circle = styled.circle`
    fill: ${({ theme }) => theme.colors.inputBackground};
    stroke-width: 1px;
    stroke: ${({ theme }) => theme.colors.border};
`

const Line = styled.line`
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 1;
`

const Marker = styled.circle`
    fill: ${({ theme }) => theme.colors.accent};
`
