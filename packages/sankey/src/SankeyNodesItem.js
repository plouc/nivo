/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { BasicTooltip, useTooltip } from '@nivo/tooltip'

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
    setCurrent,
    isInteractive,
    onClick,
    tooltip,
}) => {
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

    const tooltipContent = useMemo(() => {
        if (tooltip) {
            return <BasicTooltip id={tooltip(node)} enableChip={false} />
        }

        return <BasicTooltip id={node.label} enableChip={true} color={node.color} />
    }, [tooltip, node])

    const handleMouseEnter = useCallback(
        event => {
            setCurrent(node)
            showTooltipFromEvent(tooltipContent, event, 'left')
        },
        [setCurrent, node, showTooltipFromEvent, tooltipContent]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(tooltipContent, event, 'left')
        },
        [showTooltipFromEvent, tooltipContent]
    )

    const handleMouseLeave = useCallback(() => {
        setCurrent(null)
        hideTooltip()
    }, [setCurrent, hideTooltip])

    const handleClick = useCallback(
        event => {
            onClick(node, event)
        },
        [onClick, node]
    )

    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            width={animatedProps.width.interpolate(v => Math.max(v, 0))}
            height={animatedProps.height.interpolate(v => Math.max(v, 0))}
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

SankeyNodesItem.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    setCurrent: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.func,
}

export default memo(SankeyNodesItem)
