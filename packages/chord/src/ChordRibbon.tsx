import { createElement, memo, useMemo, MouseEvent } from 'react'
import { SpringValues, animated } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import {
    ChordCommonProps,
    ChordSvgProps,
    RibbonAnimatedProps,
    RibbonDatum,
    RibbonGenerator,
} from './types'
import { computeRibbonPath } from './compute'

interface ChordRibbonProps {
    ribbon: RibbonDatum
    ribbonGenerator: RibbonGenerator
    animatedProps: SpringValues<RibbonAnimatedProps>
    borderWidth: ChordCommonProps['ribbonBorderWidth']
    blendMode: NonNullable<ChordSvgProps['ribbonBlendMode']>
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
        animatedProps,
        borderWidth,
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
                onMouseEnter?.(ribbon, event)
            }
        }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseEnter, setCurrent])

        const handleMouseMove = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                showTooltipFromEvent(createElement(tooltip, { ribbon }), event)
                onMouseMove?.(ribbon, event)
            }
        }, [isInteractive, showTooltipFromEvent, tooltip, ribbon, onMouseMove])

        const handleMouseLeave = useMemo(() => {
            if (!isInteractive) return undefined

            return (event: MouseEvent) => {
                setCurrent(null)
                hideTooltip()
                onMouseLeave?.(ribbon, event)
            }
        }, [isInteractive, hideTooltip, ribbon, onMouseLeave, setCurrent])

        const handleClick = useMemo(() => {
            if (!isInteractive || !onClick) return undefined

            return (event: MouseEvent) => onClick?.(ribbon, event)
        }, [isInteractive, ribbon, onClick])

        return (
            <animated.path
                data-testid={`ribbon.${ribbon.source.id}.${ribbon.target.id}`}
                d={computeRibbonPath({
                    sourceStartAngle: animatedProps.sourceStartAngle,
                    sourceEndAngle: animatedProps.sourceEndAngle,
                    targetStartAngle: animatedProps.targetStartAngle,
                    targetEndAngle: animatedProps.targetEndAngle,
                    ribbonGenerator,
                })}
                fill={animatedProps.color}
                opacity={animatedProps.opacity}
                strokeWidth={borderWidth}
                stroke={animatedProps.borderColor}
                style={{ mixBlendMode: blendMode }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)
