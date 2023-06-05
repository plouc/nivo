import React from 'react'
import styled from 'styled-components'
import { settingsMapper } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    background: #333;
    padding: 10px;
    border-radius: 4px;
    grid-template-columns: 40px 1fr;
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
            <TooltipKey>x</TooltipKey>
            <span>{day.x}</span>
            <TooltipKey>y</TooltipKey>
            <span>{day.y}</span>
            <TooltipKey>size</TooltipKey>
            <span>{day.size}</span>
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
