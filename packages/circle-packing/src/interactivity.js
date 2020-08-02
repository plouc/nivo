/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'

export const getNodeHandlers = (
    node,
    {
        isInteractive,
        onClick,
        showTooltip,
        hideTooltip,
        isZoomable,
        zoomToNode,
        theme,
        tooltipFormat,
        tooltip,
    }
) => {
    if (!isInteractive) return {}

    const handleTooltip = e => {
        showTooltip(
            <BasicTooltip
                id={node.id}
                value={node.value}
                enableChip={true}
                color={node.color}
                theme={theme}
                format={tooltipFormat}
                renderContent={
                    typeof tooltip === 'function' ? tooltip.bind(null, { node, ...node }) : null
                }
            />,
            e
        )
    }

    let clickHandler = onClick
    if (isZoomable) {
        clickHandler = event => {
            onClick(node, event)
            zoomToNode(node.path)
        }
    } else {
        clickHandler = event => {
            onClick(node, event)
        }
    }

    return {
        onMouseEnter: handleTooltip,
        onMouseMove: handleTooltip,
        onMouseLeave: hideTooltip,
        onClick: clickHandler,
    }
}
