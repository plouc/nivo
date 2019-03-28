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

const CustomTooltip = data => (
    <TooltipWrapper style={{ color: data.color }}>
        <TooltipKey>id</TooltipKey>
        <TooltipValue>{data.id}</TooltipValue>
        <TooltipKey>serie</TooltipKey>
        <TooltipValue>{data.serie.id}</TooltipValue>
        <TooltipKey>color</TooltipKey>
        <TooltipValue>{data.color}</TooltipValue>
        <TooltipKey>x</TooltipKey>
        <TooltipValue>{data.x}</TooltipValue>
        <TooltipKey>y</TooltipKey>
        <TooltipValue>{data.y}</TooltipValue>
    </TooltipWrapper>
)

export default settingsMapper(
    {
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
        theme: (value, values) => {
            if (!values['custom tooltip example']) {
                return {
                    ...value,
                    grid: {
                        stroke: '#ccc',
                        strokeWidth: 1,
                        strokeDasharray: '6 6',
                    },
                }
            }

            return {
                ...values.theme,
                grid: {
                    stroke: '#ccc',
                    strokeWidth: 1,
                    strokeDasharray: '6 6',
                },
                tooltip: {
                    container: {
                        ...values.theme.tooltip.container,
                        background: '#333',
                    },
                },
            }
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
