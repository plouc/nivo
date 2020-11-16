import React from 'react'
import styled from 'styled-components'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { mapFormat, settingsMapper } from '../../../lib/settings'

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
        radialLabel: value => {
            if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
            return value
        },
        sliceLabel: value => {
            if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
            return value
        },
        tooltip: (value, values) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
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
        defs: (value, values) => {
            if (!values['showcase pattern usage']) return

            /*
            [
                patternDotsDef('dots', {
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                }),
                patternLinesDef('lines', {
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                }),
            ]
            */

            return
        },
        fill: (value, values) => {
            if (!values['showcase pattern usage']) return

            /*
            [
                { match: { id: 'ruby' }, id: 'dots' },
                { match: { id: 'c' }, id: 'dots' },
                { match: { id: 'go' }, id: 'dots' },
                { match: { id: 'python' }, id: 'dots' },
                { match: { id: 'scala' }, id: 'lines' },
                { match: { id: 'lisp' }, id: 'lines' },
                { match: { id: 'elixir' }, id: 'lines' },
                { match: { id: 'javascript' }, id: 'lines' },
            ]
            */

            return
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
