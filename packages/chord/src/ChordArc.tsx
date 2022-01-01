import { createElement, memo, useMemo, MouseEvent } from 'react'
import { SpringValues, animated } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import { ArcAnimatedProps, ArcDatum, ArcGenerator, ChordCommonProps } from './types'
import { computeArcPath } from './compute'

interface ChordArcProps {
    arc: ArcDatum
    animatedProps: SpringValues<ArcAnimatedProps>
    arcGenerator: ArcGenerator
    borderWidth: number
    setCurrent: (arc: ArcDatum | null) => void
    isInteractive: ChordCommonProps['isInteractive']
    onMouseEnter?: ChordCommonProps['onArcMouseEnter']
    onMouseMove?: ChordCommonProps['onArcMouseMove']
    onMouseLeave?: ChordCommonProps['onArcMouseLeave']
    onClick?: ChordCommonProps['onArcClick']
    tooltip: ChordCommonProps['arcTooltip']
}

export const ChordArc = memo(
    ({
        arc,
        animatedProps,
        borderWidth,
        arcGenerator,
        setCurrent,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }: ChordArcProps) => {
        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        const handleMouseEnter = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                setCurrent(arc)
                showTooltipFromEvent(createElement(tooltip, { arc }), event)
                onMouseEnter && onMouseEnter(arc, event)
            }
        }, [isInteractive, showTooltipFromEvent, tooltip, arc, onMouseEnter])

        const handleMouseMove = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                showTooltipFromEvent(createElement(tooltip, { arc }), event)
                onMouseMove && onMouseMove(arc, event)
            }
        }, [isInteractive, showTooltipFromEvent, tooltip, arc, onMouseMove])

        const handleMouseLeave = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                setCurrent(null)
                hideTooltip()
                onMouseLeave && onMouseLeave(arc, event)
            }
        }, [isInteractive, hideTooltip, arc, onMouseLeave])

        const handleClick = useMemo(() => {
            if (!isInteractive || !onClick) return undefined

            return (event: MouseEvent) => onClick(arc, event)
        }, [isInteractive, arc, onClick])

        return (
            <animated.path
                d={computeArcPath({
                    startAngle: animatedProps.startAngle,
                    endAngle: animatedProps.endAngle,
                    arcGenerator,
                })}
                fill={animatedProps.color}
                opacity={animatedProps.opacity}
                strokeWidth={borderWidth}
                stroke={animatedProps.borderColor}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)
