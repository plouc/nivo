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
import { settingsMapper, mapInheritedColor } from '../../../lib/settings'

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
        borderColor: mapInheritedColor,
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
