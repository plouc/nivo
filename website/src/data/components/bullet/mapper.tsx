import React from 'react'
import styled from 'styled-components'
import { settingsMapper } from '../../../lib/settings'
import { mapAxis, mapFormat } from '../../../lib/property-mappers'

// export type MappedBarSvgProps = Omit<BarSvgProps<any>, 'data' | 'width' | 'height'>
// export type UnmappedBarSvgProps = UnmappedSettings<
//     MappedBarSvgProps,
//     {
//         valueFormat: UnmappedValueFormat
//         axisTop: AxisWithToggle<MappedBarSvgProps['axisTop']>
//         axisRight: AxisWithToggle<MappedBarSvgProps['axisRight']>
//         axisBottom: AxisWithToggle<MappedBarSvgProps['axisBottom']>
//         axisLeft: AxisWithToggle<MappedBarSvgProps['axisLeft']>
//         'custom tooltip example': boolean
//     }
// >

const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    background: #333;
    padding: 12px 16px;
    font-size: 12px;
    border-radius: 2px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = ({ color, ...bar }: any) => {
    return (
        <TooltipWrapper style={{ color: color }}>
            <TooltipKey>id</TooltipKey>
            <TooltipValue>{bar.id}</TooltipValue>
            <TooltipKey>value</TooltipKey>
            <TooltipValue>{bar.value}</TooltipValue>
            <TooltipKey>formattedValue</TooltipKey>
            <TooltipValue>{bar.formattedValue}</TooltipValue>
            <TooltipKey>index</TooltipKey>
            <TooltipValue>{bar.index}</TooltipValue>
            <TooltipKey>indexValue</TooltipKey>
            <TooltipValue>{bar.indexValue}</TooltipValue>
            <TooltipKey>color</TooltipKey>
            <TooltipValue>{color}</TooltipValue>
        </TooltipWrapper>
    )
}

export const bulletSvgMapper = settingsMapper(
    {
        valueFormat: mapFormat,
        axisBefore: mapAxis,
        axisAfter: mapAxis,
        tooltip: (_value: any, values: any) => {
            if (!values['custom tooltip example']) return undefined

            return CustomTooltip
        },
    },
    {
        exclude: ['custom tooltip example'],
    }
)
