import { memo } from 'react'
import styled from 'styled-components'
import { AngleControlProps } from '../types'
import {
    ControlContainer,
    LabelWithPreview,
    TextInput,
    Slider,
    XGapSpacer,
    YGapSpacer,
} from '../ui'
import { defaultContext } from '../defaults'

const size = 36
const center = size / 2
const markerSize = 5

const NoMemoAngleControl = ({
    id,
    label,
    icon,
    value,
    start = 0,
    min = 0,
    max = 360,
    setValue,
    context = defaultContext,
}: AngleControlProps) => {
    return (
        <ControlContainer id={id} isSingleRow={false}>
            <TopContainer>
                <LabelWithPreview
                    id={id}
                    label={label}
                    inputType="range"
                    icon={icon}
                    context={context}
                >
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
                </LabelWithPreview>
                <XGapSpacer />
                <TextInput<number>
                    id={id}
                    value={value}
                    onChange={setValue}
                    unit="°"
                    isNumber={true}
                />
            </TopContainer>
            <YGapSpacer />
            <Slider id={id} min={min} max={max} value={value} onChange={setValue} />
        </ControlContainer>
    )
}

export const AngleControl = memo(NoMemoAngleControl) as typeof NoMemoAngleControl

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
