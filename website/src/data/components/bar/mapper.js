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
import { settingsMapper, mapAxis } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = node => {
    return (
        <TooltipWrapper style={{ color: node.color }}>
            <TooltipKey>id</TooltipKey>
            <TooltipValue>{node.id}</TooltipValue>
            <TooltipKey>value</TooltipKey>
            <TooltipValue>{node.value}</TooltipValue>
            <TooltipKey>index</TooltipKey>
            <TooltipValue>{node.index}</TooltipValue>
            <TooltipKey>indexValue</TooltipKey>
            <TooltipValue>{node.indexValue}</TooltipValue>
            <TooltipKey>color</TooltipKey>
            <TooltipValue>{node.color}</TooltipValue>
        </TooltipWrapper>
    )
}

export default settingsMapper(
    {
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return null

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
