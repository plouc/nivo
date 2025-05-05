import React from 'react'
import styled from 'styled-components'
import { IcicleSvgProps } from '@nivo/icicle'
import { patternLinesDef } from '@nivo/core'
import { mapFormat, settingsMapper, UnmappedSettings } from '../../../lib/settings'

export type MappedIcicleSvgProps = Omit<IcicleSvgProps<any>, 'data' | 'width' | 'height'>
export type UnmappedIcicleSvgProps = UnmappedSettings<
    MappedIcicleSvgProps,
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

export default settingsMapper<UnmappedIcicleSvgProps, MappedIcicleSvgProps>(
    {
        valueFormat: mapFormat,
        rectLabel: value => {
            if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
            return value
        },
        tooltip: (_value, values) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
        defs: (_value, values) => {
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
        fill: (_value, values) => {
            if (!values['showcase pattern usage']) return

            return [
                { match: { id: 'set' }, id: 'lines' },
                { match: { id: 'misc' }, id: 'lines' },
                { match: { id: 'colors' }, id: 'lines' },
            ]
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
