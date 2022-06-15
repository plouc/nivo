import { useCallback, createElement, MouseEvent } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig, useTooltip } from '@nivo/core'
import { InheritedColorConfigCustomFunction } from '@nivo/colors'
import { StreamCommonProps, StreamDatum, StreamLayerData } from './types'

interface StreamLayerProps<RawDatum extends StreamDatum> {
    layer: StreamLayerData
    fillOpacity: number
    borderWidth: number
    getBorderColor: InheritedColorConfigCustomFunction<StreamLayerData>
    isInteractive: boolean
    tooltip: StreamCommonProps<RawDatum>['tooltip']
}

export const StreamLayer = <RawDatum extends StreamDatum>({
    layer,
    fillOpacity,
    borderWidth,
    getBorderColor,
    isInteractive,
    tooltip,
}: StreamLayerProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseHover = useCallback(
        (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { layer }), event, 'left')
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
