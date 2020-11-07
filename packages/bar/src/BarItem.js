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
import { BasicTooltip } from '@nivo/tooltip'

const BarItem = ({
    data,

    x,
    y,
    width,
    height,
    borderRadius,
    color,
    borderWidth,
    borderColor,

    label,
    shouldRenderLabel,
    labelColor,

    showTooltip,
    hideTooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    tooltip,

    theme,
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
        <g transform={`translate(${x}, ${y})`}>
            <rect
                width={width}
                height={height}
                rx={borderRadius}
                ry={borderRadius}
                fill={data.fill ? data.fill : color}
                strokeWidth={borderWidth}
                stroke={borderColor}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleTooltip}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            />
            {shouldRenderLabel && (
                <text
                    x={width / 2}
                    y={height / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        pointerEvents: 'none',
                        fill: labelColor,
                    }}
                >
                    {label}
                </text>
            )}
        </g>
    )
}

BarItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        indexValue: PropTypes.string.isRequired,
        fill: PropTypes.string,
    }).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderRadius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    label: PropTypes.node.isRequired,
    shouldRenderLabel: PropTypes.bool.isRequired,
    labelColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    tooltip: PropTypes.element.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
        labels: PropTypes.shape({
            text: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
}

const enhance = compose(
    withPropsOnChange(['data', 'color', 'onClick'], ({ data, color, onClick }) => ({
        onClick: event => onClick({ color, ...data }, event),
    })),
    withPropsOnChange(
        ['data', 'color', 'theme', 'tooltip', 'getTooltipLabel', 'tooltipFormat'],
        ({ data, color, theme, tooltip, getTooltipLabel, tooltipFormat }) => ({
            tooltip: (
                <BasicTooltip
                    id={getTooltipLabel(data)}
                    value={data.value}
                    enableChip={true}
                    color={color}
                    theme={theme}
                    format={tooltipFormat}
                    renderContent={
                        typeof tooltip === 'function'
                            ? tooltip.bind(null, { color, theme, ...data })
                            : null
                    }
                />
            ),
        })
    ),
    pure
)

export default enhance(BarItem)
