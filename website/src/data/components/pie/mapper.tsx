import React from 'react'
import styled from 'styled-components'
import { PieSvgProps, PieTooltipProps } from '@nivo/pie'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapFormat, mapLegends } from '../../../lib/property-mappers'

export type MappedPieProps = Omit<PieSvgProps<any>, 'data' | 'width' | 'height'>
export type UnmappedPieProps = UnmappedSettings<
    MappedPieProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
        'custom tooltip example': boolean
        'showcase pattern usage': boolean
    }
>

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

const CustomTooltip = ({ datum }: PieTooltipProps<any>) => (
    <TooltipWrapper style={{ color: datum.color }}>
        <TooltipKey>id</TooltipKey>
        <TooltipValue>{datum.id}</TooltipValue>
        <TooltipKey>value</TooltipKey>
        <TooltipValue>{datum.value}</TooltipValue>
        <TooltipKey>formattedValue</TooltipKey>
        <TooltipValue>{datum.formattedValue}</TooltipValue>
        <TooltipKey>color</TooltipKey>
        <TooltipValue>{datum.color}</TooltipValue>
    </TooltipWrapper>
)

export default settingsMapper<UnmappedPieProps, MappedPieProps>(
    {
        valueFormat: mapFormat,
        arcLinkLabel: value => {
            if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
            return value
        },
        arcLabel: value => {
            if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
            return value
        },
        legends: mapLegends,
        tooltip: (_value, values) => {
            if (!values['custom tooltip example']) return undefined
            return CustomTooltip
        },
        theme: (value, values) => {
            if (!values['custom tooltip example']) return value

            return {
                ...values.theme,
                tooltip: {
                    container: {
                        ...(values.theme?.tooltip?.container || {}),
                        background: '#333',
                    },
                },
            }
        },
        defs: (_value, values) => {
            if (!values['showcase pattern usage']) return

            return [
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
        },
        fill: (_value, values) => {
            if (!values['showcase pattern usage']) return

            return [
                { match: { id: 'ruby' }, id: 'dots' },
                { match: { id: 'c' }, id: 'dots' },
                { match: { id: 'go' }, id: 'dots' },
                { match: { id: 'python' }, id: 'dots' },
                { match: { id: 'scala' }, id: 'lines' },
                { match: { id: 'lisp' }, id: 'lines' },
                { match: { id: 'elixir' }, id: 'lines' },
                { match: { id: 'javascript' }, id: 'lines' },
            ]
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
