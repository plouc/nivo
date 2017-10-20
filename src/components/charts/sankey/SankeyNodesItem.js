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
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'

const SankeyNodesItem = ({
    node,

    x,
    y,
    width,
    height,

    color,
    opacity,
    borderWidth,
    borderColor,

    // interactivity
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    onClick,
}) => (
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

SankeyNodesItem.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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

    // interactivity
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,

    theme: PropTypes.object.isRequired,
}

const enhance = compose(
    withPropsOnChange(['node', 'theme'], ({ node, theme }) => ({
        tooltip: <BasicTooltip id={node.id} enableChip={true} color={node.color} theme={theme} />,
    })),
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
