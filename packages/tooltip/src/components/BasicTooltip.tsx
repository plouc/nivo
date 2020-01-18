/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ReactNode, memo } from 'react'
import { useTheme, useValueFormatter } from '@nivo/core'
import { Chip } from './Chip'

interface BasicTooltipProps {
    id: ReactNode
    value: string | number | Date
    format?: any
    enableChip?: boolean
    color?: string
    renderContent?: any
}

export const BasicTooltip = memo(
    ({
        id,
        value: _value,
        format,
        enableChip = false,
        color,
        renderContent,
    }: BasicTooltipProps) => {
        const theme = useTheme()
        const formatValue = useValueFormatter(format)

        let content
        if (typeof renderContent === 'function') {
            content = renderContent()
        } else {
            let value = _value
            if (formatValue !== undefined && value !== undefined) {
                value = formatValue(value)
            }
            content = (
                <div style={theme.tooltip.basic}>
                    {enableChip && <Chip color={color as string} style={theme.tooltip.chip} />}
                    {value !== undefined ? (
                        <span>
                            {id}: <strong>{isNaN(value as any) ? String(value) : value}</strong>
                        </span>
                    ) : (
                        id
                    )}
                </div>
            )
        }

        return <div style={theme.tooltip.container}>{content}</div>
    }
)
