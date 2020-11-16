import React, { CSSProperties, memo, ReactNode } from 'react'
// @ts-ignore
import { useTheme } from '@nivo/core'

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as CSSProperties['borderCollapse'],
}

interface TableTooltipProps {
    title?: ReactNode
    renderContent?: () => JSX.Element
    rows?: ReactNode[][]
}

export const TableTooltip = memo(({ title, rows = [], renderContent }: TableTooltipProps) => {
    const theme = useTheme()

    if (!rows.length) return null

    let content
    if (typeof renderContent === 'function') {
        content = renderContent()
    } else {
        content = (
            <div>
                {title && title}
                <table style={{ ...tableStyle, ...theme.tooltip.table }}>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={i}>
                                {row.map((column, j) => (
                                    <td key={j} style={theme.tooltip.tableCell}>
                                        {column}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return <div style={theme.tooltip.container}>{content}</div>
})

TableTooltip.displayName = 'TableTooltip'
