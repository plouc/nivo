import React, { useMemo } from 'react'
import { BasicTooltip, useTooltip } from '@nivo/tooltip'
import { SunburstArcProps } from './types'

export const SunburstArc = ({
    node,
    arcGenerator,
    borderWidth,
    borderColor,
    tooltip: _tooltip,
    tooltipFormat,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: SunburstArcProps) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const path = useMemo(() => arcGenerator(node), [arcGenerator, node])
    const tooltip = useMemo(
        () => (
            <BasicTooltip
                id={node.data.id}
                value={`${node.data.percentage.toFixed(2)}%`}
                enableChip={true}
                color={node.data.color}
                format={tooltipFormat}
                renderContent={
                    typeof _tooltip === 'function'
                        ? _tooltip.bind(null, { ...node.data })
                        : undefined
                }
            />
        ),
        [_tooltip, node.data, tooltipFormat]
    )

    if (!path) {
        return null
    }

    return (
        <path
            d={path}
            fill={node.data.color}
            stroke={borderColor}
            strokeWidth={borderWidth}
            onMouseEnter={event => {
                onMouseEnter?.(node.data, event)
                showTooltipFromEvent(tooltip, event)
            }}
            onMouseMove={event => showTooltipFromEvent(tooltip, event)}
            onMouseLeave={event => {
                onMouseLeave?.(node.data, event)
                hideTooltip()
            }}
            onClick={event => onClick?.(node.data, event)}
        />
    )
}
