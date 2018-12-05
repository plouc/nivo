/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { TooltipTheme } from '../../theming'

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
}

export interface TableTooltipProps {
    title?: React.ReactNode
    rows: React.ReactNode[][]
    theme: {
        tooltip?: Pick<TooltipTheme, 'container' | 'table' | 'tableCell'>
    }
    renderContent?: () => React.ReactNode
}

const TableTooltip: React.SFC<TableTooltipProps> = React.memo(
    ({ title, rows, theme, renderContent }) => {
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
    }
)

export default TableTooltip

TableTooltip.propTypes = {
    title: PropTypes.node,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
    theme: PropTypes.shape({
        tooltip: PropTypes.shape({
            container: PropTypes.object.isRequired,
            table: PropTypes.object.isRequired,
            tableCell: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
    renderContent: PropTypes.func,
}
