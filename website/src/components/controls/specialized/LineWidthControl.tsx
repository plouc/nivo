import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, LineWidthControlConfig } from '../types'
import { Control, PropertyHeader, Help, TextInput } from '../ui'

const size = 24

interface LineWidthControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: LineWidthControlConfig
    value: number
    onChange: (value: number) => void
    context?: ControlContext
}

export const LineWidthControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value,
        context,
        onChange,
        config,
    }: LineWidthControlProps) => {
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
                <PropertyHeader id={id} {...property} context={context} />
                <Row>
                    <TextInput value={value} onChange={handleChange} unit="px" isNumber={true} />
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
                    <input
                        type="range"
                        value={value}
                        onChange={handleChange}
                        min={0}
                        max={20}
                        step={config.step}
                    />
                </Row>
                <Help>{property.help}</Help>
            </Control>
        )
    }
)

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px ${size}px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
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
