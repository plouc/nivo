import React from 'react'
import styled from 'styled-components'
import { settingsMapper } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    background: #333;
    padding: 10px;
    border-radius: 4px;
    grid-template-columns: 100px 1fr;
    grid-column-gap: 12px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`

const CustomTooltip = day => {
    return (
        <TooltipWrapper style={{ color: day.color }}>
            <TooltipKey>day</TooltipKey>
            <span>{day.day}</span>
            <TooltipKey>value</TooltipKey>
            <span>{day.value}</span>
            <TooltipKey>coordinates.x</TooltipKey>
            <span>{day.coordinates.x}</span>
            <TooltipKey>coordinates.y</TooltipKey>
            <span>{day.coordinates.y}</span>
            <TooltipKey>height</TooltipKey>
            <span>{day.height}</span>
            <TooltipKey>width</TooltipKey>
            <span>{day.width}</span>
        </TooltipWrapper>
    )
}

export default settingsMapper(
    {
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
    },
    {
        exclude: ['custom tooltip example'],
    }
)
