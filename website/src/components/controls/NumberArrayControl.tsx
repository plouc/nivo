import React, { ChangeEvent, Fragment, ReactNode, useCallback } from 'react'
import styled from 'styled-components'
import { ChartProperty, Flavor } from '../../types'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Label } from './Label'
import { TextInput } from './TextInput'
import { Help } from './Help'

interface NumberArrayControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    options: {
        unit: 'px' | '°'
        items: {
            label: ReactNode
            min: number
            max: number
            step?: number
        }[]
    }
    value: number[]
    onChange: (value: number[]) => void
}

export const NumberArrayControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    options: { unit, items },
    value,
    onChange,
}: NumberArrayControlProps) => {
    const handleChange = useCallback(
        (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
            const updatedArray = [...value]
            updatedArray[index] = Number(event.target.value)
            onChange(updatedArray)
        },
        [onChange, value]
    )

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <Value>
                <span>value</span>
                <code>
                    [
                    {value.map((v, i) => {
                        return (
                            <Fragment key={i}>
                                {i > 0 && <span>, </span>}
                                <code className="code-number">{v}</code>
                            </Fragment>
                        )
                    })}
                    ]
                </code>
            </Value>
            {items.map(({ label, min, max, step }, i) => {
                const itemId = `${id}-${i}`

                return (
                    <Row key={itemId}>
                        <Label htmlFor={itemId}>{label}</Label>
                        <TextInput
                            id={itemId}
                            value={value[i]}
                            isNumber={true}
                            unit={unit}
                            onChange={handleChange(i)}
                        />
                        <Range
                            type="range"
                            value={value[i]}
                            onChange={handleChange(i)}
                            min={min}
                            max={max}
                            step={step || 1}
                        />
                    </Row>
                )
            })}
            <Help>{property.help}</Help>
        </Control>
    )
}

const Range = styled.input`
    max-width: 160px;
`

const Value = styled.div`
    margin-bottom: 5px;
    padding-left: 89px;
    display: grid;
    grid-column-gap: 9px;
    grid-template-columns: 60px auto;

    & > *:first-child {
        text-align: right;
        font-weight: 500;
    }
`

const Row = styled.div`
    display: grid;
    grid-template-columns: 80px 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
    margin-bottom: 5px;
`
