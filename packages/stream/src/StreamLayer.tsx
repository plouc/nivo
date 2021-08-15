import { useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { InheritedColorConfigCustomFunction } from '@nivo/colors'
import { BasicTooltip, useTooltip } from '@nivo/tooltip'
import { StreamLayerData } from './types'

interface StreamLayerProps {
    layer: StreamLayerData
    fillOpacity: number
    borderWidth: number
    getBorderColor: InheritedColorConfigCustomFunction<StreamLayerData>
    isInteractive: boolean
}

export const StreamLayer = ({
    layer,
    fillOpacity,
    borderWidth,
    getBorderColor,
    isInteractive,
}: StreamLayerProps) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseHover = useCallback(
        event => {
            showTooltipFromEvent(
                <BasicTooltip id={layer.label} enableChip={true} color={layer.color} />,
                event,
                'left'
            )
        },
        [showTooltipFromEvent, layer]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(layer.path)
    const animatedProps = useSpring({
        color: layer.color,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedPath}
            fill={layer.fill ? layer.fill : animatedProps.color}
            fillOpacity={fillOpacity}
            stroke={getBorderColor(layer)}
            strokeWidth={borderWidth}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? hideTooltip : undefined}
        />
    )
}
