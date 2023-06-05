import React from 'react'
import styled from 'styled-components'
import { settingsMapper, mapAxis, mapFormat } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    background: #333;
    padding: 12px 16px;
    font-size: 12px;
    border-radius: 2px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = ({ color, ...bar }: any) => {
    return (
        <TooltipWrapper style={{ color: color }}>
            <TooltipKey>id</TooltipKey>
            <TooltipValue>{bar.id}</TooltipValue>
            <TooltipKey>value</TooltipKey>
            <TooltipValue>{bar.value}</TooltipValue>
            <TooltipKey>formattedValue</TooltipKey>
            <TooltipValue>{bar.formattedValue}</TooltipValue>
            <TooltipKey>index</TooltipKey>
            <TooltipValue>{bar.index}</TooltipValue>
            <TooltipKey>indexValue</TooltipKey>
            <TooltipValue>{bar.indexValue}</TooltipValue>
            <TooltipKey>color</TooltipKey>
            <TooltipValue>{color}</TooltipValue>
        </TooltipWrapper>
    )
}

export default settingsMapper(
    {
        valueFormat: mapFormat,
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
        tooltip: (_value: any, values: any) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
    },
    {
        exclude: [
            'enable axisTop',
            'enable axisRight',
            'enable axisBottom',
            'enable axisLeft',
            'custom tooltip example',
        ],
    }
)
