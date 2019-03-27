/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import { format as d3Format } from 'd3-format'
import Chip from './Chip'
import { useTheme } from '../theming'

const chipStyle = { marginRight: 7 }

const BasicTooltip = memo(({ id, value: _value, format, enableChip, color, renderContent }) => {
    const theme = useTheme()
    const formatValue = useMemo(() => {
        if (!format || isFunction(format)) return format
        return d3Format(format)
    }, [format])

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
                {enableChip && <Chip color={color} style={chipStyle} />}
                {value !== undefined ? (
                    <span>
                        {id}: <strong>{isNaN(value) ? String(value) : value}</strong>
                    </span>
                ) : (
                    id
                )}
            </div>
        )
    }

    return <div style={theme.tooltip.container}>{content}</div>
})

BasicTooltip.propTypes = {
    id: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enableChip: PropTypes.bool.isRequired,
    color: PropTypes.string,
    format: PropTypes.func,
    renderContent: PropTypes.func,
}

BasicTooltip.defaultProps = {
    enableChip: false,
}

BasicTooltip.displayName = 'BasicTooltip'

export default BasicTooltip
