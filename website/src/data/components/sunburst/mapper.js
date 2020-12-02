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
import { patternLinesDef } from '@nivo/core'
import { settingsMapper } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    background: #fff;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    font-size: 12px;
    border-radius: 2px;
    box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.15);
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
            <TooltipKey>percentage</TooltipKey>
            <TooltipValue>{Math.round(node.percentage * 100) / 100}%</TooltipValue>
            <TooltipKey>color</TooltipKey>
            <TooltipValue>{node.color}</TooltipValue>
        </TooltipWrapper>
    )
}

export default settingsMapper(
    {
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
        defs: (value, values) => {
            if (!values['showcase pattern usage']) return

            return [
                patternLinesDef('lines', {
                    background: 'rgba(0, 0, 0, 0)',
                    color: 'inherit',
                    rotation: -45,
                    lineWidth: 4,
                    spacing: 8,
                }),
            ]
        },
        fill: (value, values) => {
            if (!values['showcase pattern usage']) return

            return [
                { match: { id: 'set' }, id: 'lines' },
                { match: { id: 'misc' }, id: 'lines' },
            ]
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
