import React, { useCallback, ChangeEvent } from 'react'
import styled, { useTheme } from 'styled-components'
import { Flavor, ChartPropertyWithControl } from '../../../types'
import { ControlContext, OpacityControlConfig } from '../types'
import { Control, TextInput } from '../ui'

const size = 24

interface OpacityControlProps {
    id: string
    property: ChartPropertyWithControl<OpacityControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number
    onChange: (value: number) => void
    context?: ControlContext
}

export const OpacityControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: OpacityControlProps) => {
    const theme = useTheme()
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <Control
            id={id}
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
            <Row>
                <TextInput value={value} onChange={handleChange} isNumber={true} />
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
