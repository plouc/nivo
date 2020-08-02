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
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { NodePropType } from './props'

const Mesh = ({
    nodes,
    width,
    height,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    debug,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node, event) => {
            showTooltipFromEvent(React.createElement(tooltip, { node }), event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node, event) => {
            showTooltipFromEvent(React.createElement(tooltip, { node }), event)
            onMouseMove && onMouseMove(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node, event) => {
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        (node, event) => {
            onClick && onClick(node, event)
        },
        [onClick]
    )

    return (
        <BaseMesh
            nodes={nodes}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            debug={debug}
        />
    )
}

Mesh.propTypes = {
    nodes: PropTypes.arrayOf(NodePropType).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    debug: PropTypes.bool.isRequired,
}

export default memo(Mesh)
