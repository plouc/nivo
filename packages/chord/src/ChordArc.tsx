import { createElement, memo, useMemo, MouseEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { ArcDatum, ArcGenerator, ChordCommonProps } from './types'

interface ChordArcProps {
    arc: ArcDatum
    startAngle: number
    endAngle: number
    arcGenerator: ArcGenerator
    borderWidth: number
    getBorderColor: (arc: ArcDatum) => string
    opacity: number
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
        startAngle,
        endAngle,
        borderWidth,
        getBorderColor,
        opacity,
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
            <path
                d={arcGenerator({ startAngle, endAngle }) || ''}
                fill={arc.color}
                fillOpacity={opacity}
                strokeWidth={borderWidth}
                stroke={getBorderColor(arc)}
                strokeOpacity={opacity}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)
