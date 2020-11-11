import React from 'react'
import styled from 'styled-components'

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 16px;
    background: #111;
    font-size: 12px;
    padding: 12px 16px;
    border-radius: 2px;
`
const TooltipKey = styled.span`
    text-decoration: underline;
`
const TooltipValue = styled.span`
    font-weight: 600;
`

const CustomTooltip = ({ cell }) => (
    <TooltipWrapper style={{ color: cell.color }}>
        <TooltipKey>label</TooltipKey>
        <TooltipValue>{cell.data.label}</TooltipValue>
        <TooltipKey>id</TooltipKey>
        <TooltipValue>{cell.data.id}</TooltipValue>
        <TooltipKey>value</TooltipKey>
        <TooltipValue>{cell.data.value}</TooltipValue>
        <TooltipKey>position</TooltipKey>
        <TooltipValue>{cell.position}</TooltipValue>
        <TooltipKey>groupIndex</TooltipKey>
        <TooltipValue>{cell.groupIndex}</TooltipValue>
        <TooltipKey>row</TooltipKey>
        <TooltipValue>{cell.row}</TooltipValue>
        <TooltipKey>column</TooltipKey>
        <TooltipValue>{cell.column}</TooltipValue>
        <TooltipKey>color</TooltipKey>
        <TooltipValue>{cell.color}</TooltipValue>
    </TooltipWrapper>
)

export default CustomTooltip
