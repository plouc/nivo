import { memo } from 'react'
import { TableTooltip, Chip } from '@nivo/core'
import { RibbonTooltipComponentProps } from './types'

export const ChordRibbonTooltip = memo(({ ribbon }: RibbonTooltipComponentProps) => (
    <TableTooltip
        rows={[
            [
                <Chip key="chip" color={ribbon.source.color} />,
                <strong key="id">{ribbon.source.label}</strong>,
                ribbon.source.formattedValue,
            ],
            [
                <Chip key="chip" color={ribbon.target.color} />,
                <strong key="id">{ribbon.target.label}</strong>,
                ribbon.target.formattedValue,
            ],
        ]}
    />
))
