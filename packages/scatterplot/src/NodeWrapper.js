/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { blendModePropType } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { NodePropType } from './props'

const NodeWrapper = ({
    node,
    renderNode: NodeComponent,
    x,
    y,
    size,
    color,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    blendMode,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(React.createElement(tooltip, { node }), event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [node, tooltip, showTooltipFromEvent, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(React.createElement(tooltip, { node }), event)
            onMouseMove && onMouseMove(node, event)
        },
        [node, tooltip, showTooltipFromEvent, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [node, hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(node, event)
        },
        [node, onClick]
    )

    return React.createElement(NodeComponent, {
        node,
        x,
        y,
        size,
        color,
        blendMode,
        onMouseEnter: isInteractive ? handleMouseEnter : undefined,
        onMouseMove: isInteractive ? handleMouseMove : undefined,
        onMouseLeave: isInteractive ? handleMouseLeave : undefined,
        onClick: isInteractive && onClick ? handleClick : undefined,
    })
}

NodeWrapper.propTypes = {
    node: NodePropType.isRequired,
    renderNode: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    blendMode: blendModePropType.isRequired,
}

export default memo(NodeWrapper)
