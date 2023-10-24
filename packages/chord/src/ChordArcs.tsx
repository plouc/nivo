import { memo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { useInheritedColor } from '@nivo/colors'
import { ChordArc } from './ChordArc'
import { ArcDatum, ArcGenerator, ChordCommonProps, ArcAnimatedProps } from './types'

interface ChordArcsProps {
    arcs: ArcDatum[]
    arcGenerator: ArcGenerator
    borderWidth: ChordCommonProps['arcBorderWidth']
    borderColor: ChordCommonProps['arcBorderColor']
    getOpacity: (arc: ArcDatum) => number
    setCurrent: (arc: ArcDatum | null) => void
    isInteractive: ChordCommonProps['isInteractive']
    onMouseEnter?: ChordCommonProps['onArcMouseEnter']
    onMouseMove?: ChordCommonProps['onArcMouseMove']
    onMouseLeave?: ChordCommonProps['onArcMouseLeave']
    onClick?: ChordCommonProps['onArcClick']
    tooltip: ChordCommonProps['arcTooltip']
}

export const ChordArcs = memo(
    ({
        arcs,
        borderWidth,
        borderColor,
        getOpacity,
        arcGenerator,
        setCurrent,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }: ChordArcsProps) => {
        const { animate, config: springConfig } = useMotionConfig()

        const theme = useTheme()
        const getBorderColor = useInheritedColor(borderColor, theme)

        const transition = useTransition<ArcDatum, ArcAnimatedProps>(arcs, {
            keys: arc => arc.id,
            initial: arc => ({
                startAngle: arc.startAngle,
                endAngle: arc.endAngle,
                color: arc.color,
                opacity: getOpacity(arc),
                borderColor: getBorderColor(arc),
            }),
            from: arc => ({
                startAngle: arc.startAngle,
                endAngle: arc.endAngle,
                color: arc.color,
                opacity: 0,
                borderColor: getBorderColor(arc),
            }),
            update: arc => ({
                startAngle: arc.startAngle,
                endAngle: arc.endAngle,
                color: arc.color,
                opacity: getOpacity(arc),
                borderColor: getBorderColor(arc),
            }),
            leave: arc => ({
                startAngle: arc.startAngle,
                endAngle: arc.endAngle,
                color: arc.color,
                opacity: 0,
                borderColor: getBorderColor(arc),
            }),
            expires: true,
            config: springConfig,
            immediate: !animate,
        })

        return (
            <>
                {transition((animatedProps, arc) => (
                    <ChordArc
                        key={arc.id}
                        arc={arc}
                        arcGenerator={arcGenerator}
                        animatedProps={animatedProps}
                        borderWidth={borderWidth}
                        setCurrent={setCurrent}
                        isInteractive={isInteractive}
                        tooltip={tooltip}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                    />
                ))}
            </>
        )
    }
)
