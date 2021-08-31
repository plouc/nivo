import { createElement, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { DefaultLink, DefaultNode, SankeyCommonProps, SankeyNodeDatum } from './types'

interface SankeyNodesItemProps<N extends DefaultNode, L extends DefaultLink> {
    node: SankeyNodeDatum<N, L>
    x: number
    y: number
    width: number
    height: number
    color: string
    opacity: number
    borderWidth: SankeyCommonProps<N, L>['nodeBorderWidth']
    borderColor: string
    borderRadius: SankeyCommonProps<N, L>['nodeBorderRadius']
    setCurrent: (node: SankeyNodeDatum<N, L> | null) => void
    isInteractive: SankeyCommonProps<N, L>['isInteractive']
    onClick?: SankeyCommonProps<N, L>['onClick']
    tooltip: SankeyCommonProps<N, L>['nodeTooltip']
}

export const SankeyNodesItem = <N extends DefaultNode, L extends DefaultLink>({
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
}: SankeyNodesItemProps<N, L>) => {
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
