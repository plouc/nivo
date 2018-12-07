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
import { isFunction } from 'lodash'
import { format as d3Format } from 'd3-format'
import { compose, withPropsOnChange, pure } from 'recompose'
import Chip from './Chip'
import { TooltipTheme } from '../../theming'

const chipStyle = { marginRight: 7 }

export interface BasicTooltipProps {
    id: React.ReactNode
    value?: string | number
    enableChip?: boolean
    color?: string
    format?: (val: number | string) => number | string
    renderContent?: () => React.ReactNode
    theme: {
        tooltip?: Pick<TooltipTheme, 'basic' | 'container'>
    }
}

const BasicTooltip: React.SFC<BasicTooltipProps> = ({
    id,
    value: _value,
    format,
    enableChip = true,
    color,
    theme,
    renderContent,
}) => {
    let content
    if (typeof renderContent === 'function') {
        content = renderContent()
    } else {
        let value = _value
        if (format !== undefined && value !== undefined) {
            value = format(value)
        }
        content = (
            <div style={theme.tooltip.basic}>
                {enableChip && <Chip color={color} style={chipStyle} />}
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

BasicTooltip.propTypes = {
    id: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enableChip: PropTypes.bool,
    color: PropTypes.string,
    format: PropTypes.func,
    renderContent: PropTypes.func,
    theme: PropTypes.shape({
        tooltip: PropTypes.shape({
            basic: PropTypes.object.isRequired,
            container: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
}

const enhance = compose<BasicTooltipProps, BasicTooltipProps>(
    withPropsOnChange(['format'], ({ format }) => {
        if (!format || isFunction(format)) return { format }
        return { format: d3Format(format) }
    }),
    pure
)

export default enhance(BasicTooltip)
