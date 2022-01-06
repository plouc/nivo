import React, { ChangeEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Box as BoxType } from '@nivo/core'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, MarginControlConfig } from '../types'
import { Control, PropertyHeader, Help, TextInput } from '../ui'

type Side = keyof BoxType

interface MarginControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    value: BoxType
    config: MarginControlConfig
    onChange: (value: BoxType) => void
    context?: ControlContext
}

export const MarginControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: MarginControlProps) => {
    const [side, setSide] = useState<null | Side>(null)

    const handleChange = (side: Side) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...value,
            [side]: Number(e.target.value),
        })
    }

    const handleFocus = (side: Side) => () => {
        setSide(side)
    }

    const handleBlur = useCallback(() => {
        setSide(null)
    }, [setSide])

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} context={context} />
            <Grid>
                <Label htmlFor={`${id}-top`}>top</Label>
                <TextInput
                    id={`${id}-top`}
                    value={value.top}
                    unit="px"
                    isNumber={true}
                    onChange={handleChange('top')}
                    onFocus={handleFocus('top')}
                    onBlur={handleBlur}
                />
                <Label htmlFor={`${id}-right`}>right</Label>
                <TextInput
                    id={`${id}-right`}
                    value={value.right}
                    unit="px"
                    isNumber={true}
                    onChange={handleChange('right')}
                    onFocus={handleFocus('right')}
                    onBlur={handleBlur}
                />
                <BoxCell>
                    <Box side={side} />
                </BoxCell>
                <Label htmlFor={`${id}-bottom`}>bottom</Label>
                <TextInput
                    id={`${id}-bottom`}
                    value={value.bottom}
                    unit="px"
                    isNumber={true}
                    onChange={handleChange('bottom')}
                    onFocus={handleFocus('bottom')}
                    onBlur={handleBlur}
                />
                <Label htmlFor={`${id}-left`}>left</Label>
                <TextInput
                    id={`${id}-left`}
                    value={value.left}
                    unit="px"
                    isNumber={true}
                    onChange={handleChange('left')}
                    onFocus={handleFocus('left')}
                    onBlur={handleBlur}
                />
            </Grid>
            <Help>{property.help}</Help>
        </Control>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: 50px 60px 50px 60px auto;
    grid-column-gap: 9px;
    grid-row-gap: 5px;
    margin-bottom: 5px;
`

const Label = styled.label`
    text-align: right;
`

const BoxCell = styled.div`
    grid-column-start: 5;
    grid-row-start: 1;
    grid-row-end: 3;
    padding: 5px 0;
`

const Box = styled.div<{
    side: Side | null
}>`
    width: 100%;
    height: 100%;
    max-width: 80px;
    margin-left: 12px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    ${({ side, theme }) => {
        if (side === null) return ''

        return `
            border-${side}-color: ${theme.colors.accent};
            border-${side}-width: 3px;
        `
    }}
`
