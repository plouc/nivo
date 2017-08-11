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
    fontSize: '14px',
    width: '100%',
    borderCollapse: 'collapse',
}

const cellStyle = {
    padding: '3px 5px',
}

const TableTooltip = ({ rows }) => {
    if (!rows.length) return null

    return (
        <table style={tableStyle}>
            <tbody>
                {rows.map((row, i) =>
                    <tr key={i}>
                        {row.map((column, j) =>
                            <td key={j} style={cellStyle}>
                                {column}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

TableTooltip.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
}

TableTooltip.defaultProps = {}

export default pure(TableTooltip)
