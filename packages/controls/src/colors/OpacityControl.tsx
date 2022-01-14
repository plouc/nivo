import { useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import { OpacityControlProps } from '../types'
import { ControlContainer, Header, TextInput, Slider } from '../ui'

const size = 24

export const OpacityControl = ({
    name,
    value,
    onChange,
    context = { path: [] },
}: OpacityControlProps) => {
    const theme = useTheme()
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
                    <defs>
                        <pattern
                            id="opacityControlChecker"
                            width={8}
                            height={8}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect fill="black" width={4} height={4} />
                            <rect fill="black" x={4} y={4} width={4} height={4} />
                        </pattern>
                    </defs>
                    <rect fill="url(#opacityControlChecker)" width={size} height={size} />
                    <rect
                        fill={theme.colors.accent}
                        width={size}
                        height={size}
                        fillOpacity={value}
                    />
                </svg>
                <Header name={name} context={context} />
                <TextInput value={value} onChange={handleChange} isNumber={true} />
            </TopContainer>
            <Slider
                type="range"
                value={value}
                onChange={handleChange}
                min={0}
                max={1}
                step={0.05}
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
