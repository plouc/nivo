/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { EnhancedWaffleDatum } from './props'

export interface WaffleCellTooltipProps {
    position: number
    row: number
    column: number
    color: string
    data: EnhancedWaffleDatum
    // tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // tooltip: PropTypes.func,
}

export const WaffleCellTooltip = ({
    // position,
    // row,
    // column,
    color,
    data,
    // tooltipFormat,
    // tooltip,
}: WaffleCellTooltipProps) => (
    <BasicTooltip
        id={data.label}
        value={data.value}
        enableChip={true}
        color={color}
        // format={tooltipFormat}
        /*
        renderContent={
            typeof tooltip === 'function'
                ? tooltip.bind(null, {
                      position,
                      row,
                      column,
                      color,
                      ...data,
                  })
                : null
        }
        */
    />
)

