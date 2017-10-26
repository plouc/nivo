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
import { isFunction } from 'lodash'
import { format as d3Format } from 'd3-format'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import withPropsOnChange from 'recompose/withPropsOnChange'
import TableTooltip from '../../tooltip/TableTooltip'

const Chip = ({ color }) => (
    <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />
)

const LineSlicesItem = ({ slice, height, showTooltip, hideTooltip, isHover }) => (
    <g transform={`translate(${slice.x}, 0)`}>
        {isHover && (
            <line
                x1={0}
                x2={0}
                y1={0}
                y2={height}
                stroke="#000"
                strokeOpacity={0.35}
                strokeWidth={1}
            />
        )}
        <rect
            x={-20}
            width={40}
            height={height}
            fill="#000"
            fillOpacity={0}
            onMouseEnter={showTooltip}
            onMouseMove={showTooltip}
            onMouseLeave={hideTooltip}
        />
    </g>
)

LineSlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
}

const enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['slice', 'theme', 'tooltipFormat'], ({ slice, theme, tooltipFormat }) => {
        const format =
            !tooltipFormat || isFunction(tooltipFormat) ? tooltipFormat : d3Format(tooltipFormat)

        return {
            tooltip: (
                <TableTooltip
                    theme={theme}
                    rows={slice.points.map(p => [
                        <Chip color={p.color} />,
                        p.id,
                        format ? format(p.value) : p.value,
                    ])}
                />
            ),
        }
    }),
    withHandlers({
        showTooltip: ({ showTooltip, setIsHover, tooltip }) => e => {
            setIsHover(true)
            showTooltip(tooltip, e)
        },
        hideTooltip: ({ hideTooltip, setIsHover }) => () => {
            setIsHover(false)
            hideTooltip()
        },
    }),
    pure
)

export default enhance(LineSlicesItem)
