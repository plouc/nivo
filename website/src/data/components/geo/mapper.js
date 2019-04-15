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
    font-size: 13px;
    background: ${({ theme }) => theme.colors.cardBackground};
    padding: 10px 20px;
    color: ${({ color }) => color};
    border: 2px solid ${({ color }) => color};
    box-shadow: 9px 16px 0 rgba(0, 0, 0, 0.15);
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = ({ feature }) => {
    return (
        <TooltipWrapper color={feature.color}>
            <TooltipKey>Custom tooltip</TooltipKey>
            <span />
            <TooltipKey>id</TooltipKey>
            <TooltipValue>{feature.id}</TooltipValue>
            <TooltipKey>value</TooltipKey>
            <TooltipValue>{feature.value}</TooltipValue>
            <TooltipKey>color</TooltipKey>
            <TooltipValue>{feature.color}</TooltipValue>
        </TooltipWrapper>
    )
}

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
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
    },
    {
        exclude: ['custom tooltip example'],
    }
)
