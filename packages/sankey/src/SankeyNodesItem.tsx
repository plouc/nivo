import { createElement, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { SankeyCommonProps, SankeyId, SankeyNodeDatum } from './types'

interface SankeyNodesItemProps<Id extends SankeyId> {
    node: SankeyNodeDatum<Id>
    x: number
    y: number
    width: number
    height: number
    color: string
    opacity: number
    borderWidth: SankeyCommonProps<Id>['nodeBorderWidth']
    borderColor: string
    borderRadius: SankeyCommonProps<Id>['nodeBorderRadius']
    setCurrent: (node: SankeyNodeDatum<Id> | null) => void
    isInteractive: SankeyCommonProps<Id>['isInteractive']
    onClick?: SankeyCommonProps<Id>['onClick']
    tooltip: SankeyCommonProps<Id>['nodeTooltip']
}

export const SankeyNodesItem = <Id extends SankeyId>({
    node,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    borderRadius,
    setCurrent,
    isInteractive,
    onClick,
    tooltip,
}: SankeyNodesItemProps<Id>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        x,
        y,
        width,
        height,
        opacity,
        color,
        config: springConfig,
        immediate: !animate,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            setCurrent(node)
            showTooltipFromEvent(createElement(tooltip, { node }), event, 'left')
        },
        [setCurrent, node, showTooltipFromEvent, tooltip]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { node }), event, 'left')
        },
        [showTooltipFromEvent, node, tooltip]
    )

    const handleMouseLeave = useCallback(() => {
        setCurrent(null)
        hideTooltip()
    }, [setCurrent, hideTooltip])

    const handleClick = useCallback(
        event => {
            onClick?.(node, event)
        },
        [onClick, node]
    )

    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            rx={borderRadius}
            ry={borderRadius}
            width={animatedProps.width.to(v => Math.max(v, 0))}
            height={animatedProps.height.to(v => Math.max(v, 0))}
            fill={animatedProps.color}
            fillOpacity={animatedProps.opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            strokeOpacity={opacity}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}
