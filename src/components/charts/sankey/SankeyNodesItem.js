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
    hoverOpacity,
    borderWidth,
    borderColor,

    showTooltip,
    hideTooltip,

    isHover,
}) =>
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={isHover ? hoverOpacity : opacity}
        strokeWidth={borderWidth}
        stroke={borderColor}
        onMouseEnter={showTooltip}
        onMouseMove={showTooltip}
        onMouseLeave={hideTooltip}
    />

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
    hoverOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.object.isRequired,
}

const enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['node', 'theme'], ({ node, theme }) => ({
        tooltip: <BasicTooltip id={node.id} enableChip={true} color={node.color} theme={theme} />,
    })),
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

export default enhance(SankeyNodesItem)
