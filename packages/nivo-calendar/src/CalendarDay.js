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
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { noop } from '@nivo/core'
import { BasicTooltip } from '@nivo/core'

const CalendarDay = ({
    x,
    y,
    size,
    color,
    borderWidth,
    borderColor,
    onClick,
    showTooltip,
    hideTooltip,
}) => (
    <rect
        x={x}
        y={y}
        width={size}
        height={size}
        style={{
            fill: color,
            strokeWidth: borderWidth,
            stroke: borderColor,
        }}
        onClick={onClick}
        onMouseEnter={showTooltip}
        onMouseMove={showTooltip}
        onMouseLeave={hideTooltip}
    />
)

CalendarDay.propTypes = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

const enhance = compose(
    withPropsOnChange(['data', 'onClick'], ({ data, onClick }) => ({
        onClick: event => onClick(data, event),
    })),
    withPropsOnChange(
        ['data', 'color', 'showTooltip', 'theme', 'tooltipFormat'],
        ({ data, color, showTooltip, theme, tooltipFormat }) => {
            if (data.value === undefined) return { showTooltip: noop }

            return {
                showTooltip: event =>
                    showTooltip(
                        <BasicTooltip
                            id={`${data.day}`}
                            value={data.value}
                            enableChip={true}
                            color={color}
                            theme={theme}
                            format={tooltipFormat}
                        />,
                        event
                    ),
            }
        }
    ),
    pure
)

export default enhance(CalendarDay)
