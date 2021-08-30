import { createElement, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { SankeyLinkGradient } from './SankeyLinkGradient'
import { SankeyCommonProps, SankeyId, SankeyLinkDatum } from './types'

interface SankeyLinksItemProps<Id extends SankeyId> {
    link: SankeyLinkDatum<Id>
    layout: SankeyCommonProps<Id>['layout']
    path: string
    color: string
    opacity: number
    blendMode: SankeyCommonProps<Id>['linkBlendMode']
    enableGradient: SankeyCommonProps<Id>['enableLinkGradient']
    setCurrent: (link: SankeyLinkDatum<Id> | null) => void
    isInteractive: SankeyCommonProps<Id>['isInteractive']
    onClick?: SankeyCommonProps<Id>['onClick']
    tooltip: SankeyCommonProps<Id>['linkTooltip']
}

export const SankeyLinksItem = <Id extends SankeyId>({
    link,
    layout,
    path,
    color,
    opacity,
    blendMode,
    enableGradient,
    setCurrent,
    tooltip,
    isInteractive,
    onClick,
}: SankeyLinksItemProps<Id>) => {
    const linkId = `${link.source.id}.${link.target.id}`

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(path)
    const animatedProps = useSpring({
        color,
        opacity,
        config: springConfig,
        immediate: !animate,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            setCurrent(link)
            showTooltipFromEvent(createElement(tooltip, { link }), event, 'left')
        },
        [setCurrent, link, showTooltipFromEvent, tooltip]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { link }), event, 'left')
        },
        [showTooltipFromEvent, link, tooltip]
    )

    const handleMouseLeave = useCallback(() => {
        setCurrent(null)
        hideTooltip()
    }, [setCurrent, hideTooltip])

    const handleClick = useCallback(
        event => {
            onClick?.(link, event)
        },
        [onClick, link]
    )

    return (
        <>
            {enableGradient && (
                <SankeyLinkGradient
                    id={linkId}
                    layout={layout}
                    startColor={link.startColor || link.source.color}
                    endColor={link.endColor || link.target.color}
                />
            )}
            <animated.path
                fill={enableGradient ? `url("#${encodeURI(linkId)}")` : animatedProps.color}
                d={animatedPath}
                fillOpacity={animatedProps.opacity}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleMouseMove : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
                style={{ mixBlendMode: blendMode }}
            />
        </>
    )
}
