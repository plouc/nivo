/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { CSSProperties, memo, ReactNode } from 'react'
import { useTheme } from '@nivo/core'

const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
}

interface TableTooltipProps {
    title?: ReactNode
    rows: ReactNode[][]
    renderContent: any
}

export const TableTooltip = memo(({ title, rows, renderContent }: TableTooltipProps) => {
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
