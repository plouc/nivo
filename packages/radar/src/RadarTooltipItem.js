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
import sortBy from 'lodash/sortBy'
import { format as d3Format } from 'd3-format'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'
import { positionFromAngle } from '@nivo/core'
import { TableTooltip, Chip } from '@nivo/core'

const RadarTooltipItem = ({ path, tipX, tipY, showTooltip, hideTooltip, isHover }) => (
    <g>
        <line x1={0} y1={0} x2={tipX} y2={tipY} stroke="#000" strokeOpacity={isHover ? 0.35 : 0} />
        <path
            d={path}
            fill="#F00"
            fillOpacity={0}
            onMouseEnter={showTooltip}
            onMouseMove={showTooltip}
            onMouseLeave={hideTooltip}
        />
    </g>
)

RadarTooltipItem.propTypes = {
    datum: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    colorByKey: PropTypes.object.isRequired,

    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    tipX: PropTypes.number.isRequired, // computed
    tipY: PropTypes.number.isRequired, // computed

    arcGenerator: PropTypes.func.isRequired, // computed
    path: PropTypes.string.isRequired, // computed

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired, // re-computed
    hideTooltip: PropTypes.func.isRequired, // re-computed

    isHover: PropTypes.bool.isRequired, // computed
}

const enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(
        ['datum', 'keys', 'index', 'colorByKey', 'theme', 'tooltipFormat'],
        ({ datum, keys, index, colorByKey, theme, tooltipFormat }) => {
            const format =
                !tooltipFormat || isFunction(tooltipFormat)
                    ? tooltipFormat
                    : d3Format(tooltipFormat)

            return {
                tooltip: (
                    <TableTooltip
                        title={<strong>{index}</strong>}
                        rows={sortBy(
                            keys.map(key => [
                                <Chip key={key} color={colorByKey[key]} />,
                                key,
                                format ? format(datum[key]) : datum[key],
                            ]),
                            '2'
                        ).reverse()}
                        theme={theme}
                    />
                ),
            }
        }
    ),
    withPropsOnChange(
        ['startAngle', 'endAngle', 'radius', 'arcGenerator'],
        ({ startAngle, endAngle, radius, arcGenerator }) => {
            const position = positionFromAngle(
                startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2,
                radius
            )

            return {
                path: arcGenerator({ startAngle, endAngle }),
                tipX: position.x,
                tipY: position.y,
            }
        }
    ),
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

export default enhance(RadarTooltipItem)
