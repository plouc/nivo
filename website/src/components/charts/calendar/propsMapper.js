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
import { settingsMapper } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`

const CustomTooltip = node => (
    <TooltipWrapper style={{ color: node.color }}>
        <TooltipKey>day</TooltipKey>
        <span>{node.day}</span>
        <TooltipKey>value</TooltipKey>
        <span>{node.value}</span>
        <TooltipKey>x</TooltipKey>
        <span>{node.x}</span>
        <TooltipKey>y</TooltipKey>
        <span>{node.y}</span>
        <TooltipKey>size</TooltipKey>
        <span>{node.size}</span>
    </TooltipWrapper>
)

export default settingsMapper(
    {
        theme: (value, values) => {
            if (!values['custom tooltip example']) return value

            return {
                ...values.theme,
                tooltip: {
                    container: {
                        ...values.theme.tooltip.container,
                        background: '#333',
                    },
                },
            }
        },
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return null

            return CustomTooltip
        },
    },
    {
        exclude: ['custom tooltip example'],
    }
)
