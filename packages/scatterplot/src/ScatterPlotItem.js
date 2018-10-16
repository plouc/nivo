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
import { BasicTooltip } from '@nivo/core'

const ScatterPlotItem = ({
    data, // eslint-disable-line

    x,
    y,
    size,
    color,

    showTooltip,
    hideTooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    tooltip,
}) => {
    const handleTooltip = e => showTooltip(tooltip, e)
    const handleMouseEnter = e => {
        onMouseEnter(data, e)
        showTooltip(tooltip, e)
    }
    const handleMouseLeave = e => {
        onMouseLeave(data, e)
        hideTooltip(e)
    }

    return (
        <circle
            cx={x}
            cy={y}
            r={size / 2}
            fill={color}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleTooltip}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        />
    )
}

ScatterPlotItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        serie: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    tooltip: PropTypes.element.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

const enhance = compose(
    withPropsOnChange(['data', 'onClick'], ({ data, onClick }) => ({
        onClick: event => onClick(data, event),
    })),
    withPropsOnChange(
        ['data', 'color', 'theme', 'tooltip', 'tooltipFormat'],
        ({ data, color, theme, tooltip, tooltipFormat }) => ({
            tooltip: (
                <BasicTooltip
                    id={data.serie}
                    value={`x: ${data.x}, y: ${data.y}`}
                    enableChip={true}
                    color={color}
                    theme={theme}
                    format={tooltipFormat}
                    renderContent={
                        typeof tooltip === 'function'
                            ? tooltip.bind(null, { color, ...data })
                            : null
                    }
                />
            ),
        })
    ),
    pure
)

export default enhance(ScatterPlotItem)
