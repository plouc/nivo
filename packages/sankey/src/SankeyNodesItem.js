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
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'
import { BasicTooltip } from '@nivo/core'

const SankeyNodesItem = ({
    x,
    y,
    width,
    height,

    color,
    opacity,
    borderWidth,
    borderColor,

    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    onClick,
}) => {
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={color}
            fillOpacity={opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            strokeOpacity={opacity}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        />
    )
}

SankeyNodesItem.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        color: PropTypes.string.isRequired,
    }),

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,

    tooltip: PropTypes.element.isRequired,
    theme: PropTypes.object.isRequired,
}

const enhance = compose(
    withPropsOnChange(['node', 'theme', 'tooltip'], ({ node, theme, tooltip }) => {
        if (tooltip) {
            return {
                tooltip: <BasicTooltip id={tooltip(node)} enableChip={false} theme={theme} />,
            }
        }
        return {
            tooltip: (
                <BasicTooltip id={node.label} enableChip={true} color={node.color} theme={theme} />
            ),
        }
    }),
    withPropsOnChange(['onClick', 'node'], ({ onClick, node }) => ({
        onClick: event => onClick(node, event),
    })),
    withHandlers({
        handleMouseEnter: ({ showTooltip, setCurrent, node, tooltip }) => e => {
            setCurrent(node)
            showTooltip(tooltip, e)
        },
        handleMouseMove: ({ showTooltip, tooltip }) => e => {
            showTooltip(tooltip, e)
        },
        handleMouseLeave: ({ hideTooltip, setCurrent }) => () => {
            setCurrent(null)
            hideTooltip()
        },
    }),
    pure
)

export default enhance(SankeyNodesItem)
