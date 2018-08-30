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
import isFunction from 'lodash/isFunction'
import { format as d3Format } from 'd3-format'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { TableTooltip } from '@nivo/core'

const Chip = ({ color }) => (
    <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />
)

Chip.propTypes = {
    color: PropTypes.string.isRequired,
}

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
            fill="#F00"
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
    tooltip: PropTypes.func,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

const enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(
        ['slice', 'theme', 'tooltip', 'tooltipFormat'],
        ({ slice, theme, tooltip, tooltipFormat }) => {
            const format =
                !tooltipFormat || isFunction(tooltipFormat)
                    ? tooltipFormat
                    : d3Format(tooltipFormat)
            const hasValues = slice.data.some(d => d.position.x !== null && d.position.y !== null)

            return {
                tooltipElement: hasValues ? (
                    <TableTooltip
                        theme={theme}
                        rows={slice.data
                            .filter(d => d.position.x !== null && d.position.y !== null)
                            .map(d => [
                                <Chip key={d.id} color={d.serie.color} />,
                                d.serie.id,
                                format ? format(d.data.y) : d.data.y,
                            ])}
                        format={format}
                        renderContent={
                            typeof tooltip === 'function' ? tooltip.bind(null, { ...slice }) : null
                        }
                    />
                ) : null,
            }
        }
    ),
    withHandlers({
        showTooltip: ({ showTooltip, setIsHover, tooltipElement }) => e => {
            setIsHover(true)
            showTooltip(tooltipElement, e)
        },
        hideTooltip: ({ hideTooltip, setIsHover }) => () => {
            setIsHover(false)
            hideTooltip()
        },
    }),
    pure
)

export default enhance(LineSlicesItem)
