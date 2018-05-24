/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import TreeMapNodeTooltip from './TreeMapNodeTooltip'

export const getNodeHandlers = (
    node,
    { isInteractive, onClick, showTooltip, hideTooltip, theme, tooltip }
) => {
    if (!isInteractive) return {}

    const handleTooltip = e => {
        showTooltip(<TreeMapNodeTooltip node={node} theme={theme} tooltip={tooltip} />, e)
    }

    return {
        onMouseEnter: handleTooltip,
        onMouseMove: handleTooltip,
        onMouseLeave: hideTooltip,
        onClick: event => onClick(node, event),
    }
}
