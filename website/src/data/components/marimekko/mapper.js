import React from 'react'
import styled from 'styled-components'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { mapAxis, mapFormat, settingsMapper } from '../../../lib/settings'

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    background: #333;
    padding: 12px 16px;
    font-size: 12px;
    border-radius: 2px;
`
const TooltipKey = styled.span``
const TooltipValue = styled.span`
    font-weight: 600;
`

const CustomTooltip = ({ bar }) => (
    <TooltipWrapper style={{ color: bar.color }}>
        <TooltipKey>datum.id</TooltipKey>
        <TooltipValue>{bar.datum.id}</TooltipValue>
        <TooltipKey>id</TooltipKey>
        <TooltipValue>{bar.id}</TooltipValue>
        <TooltipKey>value</TooltipKey>
        <TooltipValue>{bar.value}</TooltipValue>
        <TooltipKey>color</TooltipKey>
        <TooltipValue>{bar.color}</TooltipValue>
        <TooltipKey>thickness</TooltipKey>
        <TooltipValue>{bar.datum.thickness}</TooltipValue>
    </TooltipWrapper>
)

export default settingsMapper(
    {
        valueFormat: mapFormat,
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
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
                { match: { id: 'agree strongly' }, id: 'lines' },
                { match: { id: 'disagree strongly' }, id: 'lines' },
            ]
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
