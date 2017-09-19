/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import BasicTooltip from '../../tooltip/BasicTooltip'

export const getNodeHandlers = (
    node,
    { isInteractive, onClick, showTooltip, hideTooltip, theme }
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
            />,
            e
        )
    }

    return {
        onMouseEnter: handleTooltip,
        onMouseMove: handleTooltip,
        onMouseLeave: hideTooltip,
        onClick: event => onClick(node, event),
    }
}
