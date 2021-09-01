import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { TextInput } from './TextInput'
import { Help } from './Help'
import { useTheme } from '../../theming/context'
import { Flavor, OpacityChartProperty } from '../../types'

const size = 24

interface OpacityControlProps {
    id: string
    property: OpacityChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number
    onChange: (value: number) => void
}

export const OpacityControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
}: OpacityControlProps) => {
    const theme = useTheme()
    const handleChange = useCallback(
        event => {
            onChange(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader id={id} {...property} />
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
            <Help>{property.help}</Help>
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
