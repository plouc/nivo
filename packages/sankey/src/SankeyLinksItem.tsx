import { createElement, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { SankeyLinkGradient } from './SankeyLinkGradient'
import { DefaultLink, DefaultNode, SankeyCommonProps, SankeyLinkDatum } from './types'

interface SankeyLinksItemProps<N extends DefaultNode, L extends DefaultLink> {
    link: SankeyLinkDatum<N, L>
    layout: SankeyCommonProps<N, L>['layout']
    path: string
    color: string
    opacity: number
    blendMode: SankeyCommonProps<N, L>['linkBlendMode']
    enableGradient: SankeyCommonProps<N, L>['enableLinkGradient']
    setCurrent: (link: SankeyLinkDatum<N, L> | null) => void
    isInteractive: SankeyCommonProps<N, L>['isInteractive']
    onClick?: SankeyCommonProps<N, L>['onClick']
    tooltip: SankeyCommonProps<N, L>['linkTooltip']
}

export const SankeyLinksItem = <N extends DefaultNode, L extends DefaultLink>({
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
}: SankeyLinksItemProps<N, L>) => {
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
