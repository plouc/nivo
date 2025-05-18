import { useCallback, ChangeEvent } from 'react'
import styled, { useTheme } from 'styled-components'
import { Control, ControlHeader, ControlHelp, ControlTextInput } from '../chrome'
import { ControlContext, ChartProperty } from '../types'
import { OpacityControlConfig } from './types'

const size = 24

interface OpacityControlProps {
    property: ChartProperty<OpacityControlConfig>
    context?: ControlContext
    value: number
    onChange: (v: number) => void
}

export const OpacityControl = ({ property, value, onChange, context }: OpacityControlProps) => {
    const theme = useTheme()

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <Control property={property} context={context}>
            <ControlHeader property={property} context={context} />
            <Row>
                <ControlTextInput value={value} onChange={handleChange} isNumber={true} />
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
                <input
                    type="range"
                    value={value}
                    onChange={handleChange}
                    min={0}
                    max={1}
                    step={0.05}
                />
            </Row>
            <ControlHelp>{property.help}</ControlHelp>
        </Control>
    )
}

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px ${size}px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
`
