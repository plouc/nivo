/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import styled from 'styled-components'

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = node => (
    <TooltipWrapper style={{ color: node.color }}>
        <TooltipKey>label</TooltipKey>
        <TooltipValue>{node.label}</TooltipValue>
        <TooltipKey>id</TooltipKey>
        <TooltipValue>{node.id}</TooltipValue>
        <TooltipKey>value</TooltipKey>
        <TooltipValue>{node.value}</TooltipValue>
        <TooltipKey>position</TooltipKey>
        <TooltipValue>{node.position}</TooltipValue>
        <TooltipKey>groupIndex</TooltipKey>
        <TooltipValue>{node.groupIndex}</TooltipValue>
        <TooltipKey>row</TooltipKey>
        <TooltipValue>{node.row}</TooltipValue>
        <TooltipKey>column</TooltipKey>
        <TooltipValue>{node.column}</TooltipValue>
        <TooltipKey>color</TooltipKey>
        <TooltipValue>{node.color}</TooltipValue>
    </TooltipWrapper>
)

export default CustomTooltip
