/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { compose, withPropsOnChange, pure } from 'recompose'
import { BasicTooltip, noop } from '@nivo/core'

const CalendarDay = memo(
    ({
        x,
        y,
        size,
        spacing,
        color,
        borderWidth,
        borderColor,
        onClick,
        showTooltip,
        hideTooltip,
    }) => {
        return (
            <>
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
                />
                <rect
                    fill="rgba(0, 0, 0, 0)"
                    x={x - spacing / 2}
                    y={y - spacing / 2}
                    width={size + spacing}
                    height={size + spacing}
                    onClick={onClick}
                    onMouseEnter={showTooltip}
                    onMouseMove={showTooltip}
                    onMouseLeave={hideTooltip}
                />
            </>
        )
    }
)

CalendarDay.propTypes = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

CalendarDay.displayName = 'CalendarDay'

const enhance = compose(
    withPropsOnChange(['data', 'onClick'], ({ data, onClick }) => ({
        onClick: event => onClick(data, event),
    })),
    withPropsOnChange(
        ['data', 'color', 'showTooltip', 'tooltipFormat', 'tooltip', 'theme'],
        ({ data, color, showTooltip, tooltipFormat, tooltip, theme }) => {
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
                            renderContent={
                                typeof tooltip === 'function'
                                    ? tooltip.bind(null, { color, ...data })
                                    : null
                            }
                        />,
                        event
                    ),
            }
        }
    ),
    pure
)

export default enhance(CalendarDay)
