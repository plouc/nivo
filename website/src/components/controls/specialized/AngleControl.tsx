import React, { memo, useCallback, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ChartProperty, Flavor } from '../../../types'
import { AngleControlConfig, ControlContext } from '../types'
import { Control, PropertyHeader, Help, TextInput } from '../ui'

const size = 36
const center = size / 2
const markerSize = 6

interface AngleControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number
    config: AngleControlConfig
    onChange: (value: number) => void
    context?: ControlContext
}

export const AngleControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value,
        config,
        onChange,
        context,
    }: AngleControlProps) => {
        const start = config.start || 0
        const min = config.min || 0
        const max = config.max || 360
        const marker = config.marker || 'radius'

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(Number(event.target.value))
            },
            [onChange]
        )

        const y0 = marker === 'radius' ? 0 : size / 2 - markerSize / 2
        const y1 = -size / 2 + markerSize / 2

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
                    <TextInput
                        id={id}
                        value={value}
                        onChange={handleChange}
                        unit="°"
                        isNumber={true}
                    />
                    <svg width={size} height={size}>
                        <Circle cx={center} cy={center} r={center - markerSize / 2} />
                        <g transform={`translate(${center},${center})`}>
                            <g transform={`rotate(${start + value})`}>
                                <Line y1={y0} y2={y1} />
                                {marker === 'radius' && <Marker r={markerSize / 4} />}
                                <Marker cy={y1} r={markerSize / 2} />
                                {marker === 'diameter' && <Marker cy={y0} r={markerSize / 2} />}
                            </g>
                        </g>
                    </svg>
                    <input type="range" value={value} onChange={handleChange} min={min} max={max} />
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
