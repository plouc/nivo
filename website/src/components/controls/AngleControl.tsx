import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { AngleControlAttrs, Flavor } from '../../types'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { TextInput } from './TextInput'
import { Help } from './Help'

const size = 36
const center = size / 2
const markerSize = 6

interface AngleControlProps {
    id: string
    property: {
        name: string
        required?: boolean
        help?: string
        description?: string
        flavors: Flavor[]
    }
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number
    options: AngleControlAttrs['controlOptions']
    onChange: (v: number) => void
}

export const AngleControl = memo(
    ({ id, property, flavors, currentFlavor, value, options, onChange }: AngleControlProps) => {
        const start = options.start || 0
        const min = options.min || 0
        const max = options.max || 360

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
                                <Line y2={-size / 2 + markerSize / 2} />
                                <Marker r={markerSize / 4} />
                                <Marker cy={-size / 2 + markerSize / 2} r={markerSize / 2} />
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
