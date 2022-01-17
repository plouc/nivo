import styled from 'styled-components'
import { LineWidthControlProps } from '../types'
import {
    ControlContainer,
    ControlHeader,
    LabelWithPreview,
    TextInput,
    Slider,
    XGapSpacer,
    YGapSpacer,
} from '../ui'

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
    return (
        <ControlContainer id={id} isSingleRow={false}>
            <ControlHeader>
                <LabelWithPreview
                    id={id}
                    label={label}
                    inputType="range"
                    icon={icon}
                    context={context}
                >
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
                </LabelWithPreview>
                <XGapSpacer />
                <TextInput<number>
                    id={id}
                    value={value}
                    onChange={onChange}
                    unit="px"
                    isNumber={true}
                />
            </ControlHeader>
            <YGapSpacer />
            <Slider id={id} value={value} onChange={onChange} min={min} max={max} step={step} />
        </ControlContainer>
    )
}

const Line = styled.line`
    stroke: ${({ theme }) => theme.colors.border};
    stroke-width: 1px;
    fill: none;
`

const Marker = styled.line`
    stroke: ${({ theme }) => theme.colors.accent};
    fill: none;
`
