import React from 'react'
import styled from 'styled-components'
import { patternLinesDef } from '@nivo/core'
import { MarimekkoSvgProps, TooltipProps } from '@nivo/marimekko'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapAxis, mapFormat, mapLegends } from '../../../lib/property-mappers'

export type MappedMarimekkoProps = Omit<MarimekkoSvgProps<any>, 'data' | 'width' | 'height'>
export type UnmappedMarimekkoProps = UnmappedSettings<
    MappedMarimekkoProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
        axisTop: { enable: boolean } & MappedMarimekkoProps['axisTop']
        axisRight: { enable: boolean } & MappedMarimekkoProps['axisRight']
        axisBottom: { enable: boolean } & MappedMarimekkoProps['axisBottom']
        axisLeft: { enable: boolean } & MappedMarimekkoProps['axisLeft']
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

const CustomTooltip = ({ bar }: TooltipProps<any>) => (
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
        <TooltipValue>{(bar.datum as any).thickness}</TooltipValue>
    </TooltipWrapper>
)

export default settingsMapper<UnmappedMarimekkoProps, MappedMarimekkoProps>(
    {
        valueFormat: mapFormat,
        axisTop: mapAxis,
        axisRight: mapAxis,
        axisBottom: mapAxis,
        axisLeft: mapAxis,
        legends: mapLegends,
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
                { match: { id: 'agree strongly' }, id: 'lines' },
                { match: { id: 'disagree strongly' }, id: 'lines' },
            ]
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
