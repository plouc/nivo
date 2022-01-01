import { createElement, memo, useMemo, MouseEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { ChordCommonProps, ChordSvgProps, RibbonDatum } from './types'

interface ChordRibbonProps {
    ribbon: RibbonDatum
    ribbonGenerator: any
    sourceStartAngle: number
    sourceEndAngle: number
    targetStartAngle: number
    targetEndAngle: number
    color: string
    blendMode: NonNullable<ChordSvgProps['ribbonBlendMode']>
    opacity: number
    borderWidth: number
    getBorderColor: (ribbon: RibbonDatum) => string
    setCurrent: (ribbon: RibbonDatum | null) => void
    isInteractive: ChordCommonProps['isInteractive']
    tooltip: NonNullable<ChordSvgProps['ribbonTooltip']>
    onMouseEnter: ChordSvgProps['onRibbonMouseEnter']
    onMouseMove: ChordSvgProps['onRibbonMouseMove']
    onMouseLeave: ChordSvgProps['onRibbonMouseLeave']
    onClick: ChordSvgProps['onRibbonClick']
}

export const ChordRibbon = memo(
    ({
        ribbon,
        ribbonGenerator,
        sourceStartAngle,
        sourceEndAngle,
        targetStartAngle,
        targetEndAngle,
        color,
        opacity,
        borderWidth,
        getBorderColor,
        blendMode,
        isInteractive,
        setCurrent,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }: ChordRibbonProps) => {
        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        const handleMouseEnter = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                setCurrent(ribbon)
                showTooltipFromEvent(createElement(tooltip, { ribbon }), event)
                onMouseEnter && onMouseEnter(ribbon, event)
            }
        }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseEnter])

        const handleMouseMove = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                showTooltipFromEvent(createElement(tooltip, { ribbon }), event)
                onMouseMove && onMouseMove(ribbon, event)
            }
        }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseMove])

        const handleMouseLeave = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                setCurrent(null)
                hideTooltip()
                onMouseLeave && onMouseLeave(ribbon, event)
            }
        }, [isInteractive, hideTooltip, ribbon, onMouseLeave])

        const handleClick = useMemo(() => {
            if (!isInteractive || !onClick) return undefined

            return (event: MouseEvent) => onClick(ribbon, event)
        }, [isInteractive, ribbon, onClick])

        return (
            <path
                d={ribbonGenerator({
                    source: {
                        startAngle: sourceStartAngle,
                        endAngle: sourceEndAngle,
                    },
                    target: {
                        startAngle: targetStartAngle,
                        endAngle: targetEndAngle,
                    },
                })}
                fill={color}
                fillOpacity={opacity}
                strokeWidth={borderWidth}
                stroke={getBorderColor({ ...ribbon, color })}
                strokeOpacity={opacity}
                style={{ mixBlendMode: blendMode }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)
