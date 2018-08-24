/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
}

const TableTooltip = ({ title, rows, theme, renderContent }) => {
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

TableTooltip.defaultProps = {}

export default pure(TableTooltip)
