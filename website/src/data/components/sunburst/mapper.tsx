import React from 'react'
import styled from 'styled-components'
import { patternLinesDef } from '@nivo/core'
import { SunburstSvgProps, ComputedDatum } from '@nivo/sunburst'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapFormat } from '../../../lib/property-mappers'

export type MappedSunburstProps = Omit<
    SunburstSvgProps<any>,
    'data' | 'width' | 'height' | 'tooltip'
> & {
    tooltip?: (node: ComputedDatum<any>) => React.ReactNode
}
export type UnmappedSunburstProps = UnmappedSettings<
    MappedSunburstProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
        arcLabel: string
        'custom tooltip example': boolean
        'showcase pattern usage': boolean
    },
    'tooltip'
>

const TooltipWrapper = styled.div`
    display: grid;
    padding: 12px;
    background: #fff;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    font-size: 12px;
    border-radius: 2px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = (node: ComputedDatum<any>) => {
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

export default settingsMapper<UnmappedSunburstProps, MappedSunburstProps>(
    {
        valueFormat: mapFormat,
        arcLabel: value => {
            if (value === `d => \`\${d.id} (\${d.value})\``) {
                return (d: ComputedDatum<any>) => `${d.id} (${d.value})`
            }

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
            ]
        },
    },
    {
        exclude: ['custom tooltip example', 'showcase pattern usage'],
    }
)
