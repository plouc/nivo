import React, { memo, ReactNode } from 'react'
import { useTheme, ValueFormat, useValueFormatter } from '@nivo/core'
import { Chip } from './Chip'

interface BasicTooltipProps {
    id: ReactNode
    value?: number | string | Date
    format?: ValueFormat<number | string | Date>
    color?: string
    enableChip?: boolean
    /**
     * @deprecated This should be replaced by custom tooltip components.
     */
    renderContent?: () => JSX.Element
}

export const BasicTooltip = memo<BasicTooltipProps>(
    ({ id, value: _value, format, enableChip = false, color, renderContent }) => {
        const theme = useTheme()
        const formatValue = useValueFormatter(format)

        let content: JSX.Element
        if (typeof renderContent === 'function') {
            content = renderContent()
        } else {
            let value = _value
            if (formatValue !== undefined && value !== undefined) {
                value = formatValue(value)
            }
            content = (
                <div style={theme.tooltip.basic}>
                    {enableChip && <Chip color={color!} style={theme.tooltip.chip} />}
                    {value !== undefined ? (
                        <span>
                            {id}: <strong>{`${value}`}</strong>
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
