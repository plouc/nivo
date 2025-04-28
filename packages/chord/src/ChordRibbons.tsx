import { memo } from 'react'
import { useTransition } from '@react-spring/web'
import {
    // @ts-ignore
    midAngle,
    useMotionConfig,
} from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { useInheritedColor } from '@nivo/colors'
import { ChordRibbon } from './ChordRibbon'
import {
    ChordCommonProps,
    ChordSvgProps,
    RibbonDatum,
    RibbonAnimatedProps,
    RibbonGenerator,
    ArcDatum,
} from './types'

/**
 * Used to get ribbon angles, instead of using source and target arcs,
 * we sort arcs by value to have smooth transitions, otherwise,
 * if source|target arc value becomes greater than the other,
 * the ribbon will be reversed.
 */
const getRibbonAngles = ({ source, target }: RibbonDatum, useMiddleAngle: boolean) => {
    let firstArc: ArcDatum
    let secondArc: ArcDatum
    if (source.startAngle < target.startAngle) {
        firstArc = source
        secondArc = target
    } else {
        firstArc = target
        secondArc = source
    }

    if (useMiddleAngle) {
        const firstMiddleAngle = midAngle(firstArc)
        const secondMiddleAngle = midAngle(secondArc)

        return {
            sourceStartAngle: firstMiddleAngle,
            sourceEndAngle: firstMiddleAngle,
            targetStartAngle: secondMiddleAngle,
            targetEndAngle: secondMiddleAngle,
        }
    }

    return {
        sourceStartAngle: firstArc.startAngle,
        sourceEndAngle: firstArc.endAngle,
        targetStartAngle: secondArc.startAngle,
        targetEndAngle: secondArc.endAngle,
    }
}

interface ChordRibbonsProps {
    ribbons: RibbonDatum[]
    ribbonGenerator: RibbonGenerator
    borderWidth: ChordCommonProps['ribbonBorderWidth']
    borderColor: ChordCommonProps['ribbonBorderColor']
    getOpacity: (ribbon: RibbonDatum) => number
    blendMode: NonNullable<ChordSvgProps['ribbonBlendMode']>
    isInteractive: ChordCommonProps['isInteractive']
    setCurrent: (ribbon: RibbonDatum | null) => void
    tooltip: NonNullable<ChordSvgProps['ribbonTooltip']>
    onMouseEnter: ChordSvgProps['onRibbonMouseEnter']
    onMouseMove: ChordSvgProps['onRibbonMouseMove']
    onMouseLeave: ChordSvgProps['onRibbonMouseLeave']
    onClick: ChordSvgProps['onRibbonClick']
}

export const ChordRibbons = memo(
    ({
        ribbons,
        ribbonGenerator,
        borderWidth,
        borderColor,
        getOpacity,
        blendMode,
        isInteractive,
        setCurrent,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }: ChordRibbonsProps) => {
        const { animate, config: springConfig } = useMotionConfig()

        const theme = useTheme()
        const getBorderColor = useInheritedColor(borderColor, theme)

        const transition = useTransition<RibbonDatum, RibbonAnimatedProps>(ribbons, {
            keys: ribbon => ribbon.id,
            initial: ribbon => ({
                ...getRibbonAngles(ribbon, false),
                color: ribbon.source.color,
                opacity: getOpacity(ribbon),
                borderColor: getBorderColor(ribbon.source),
            }),
            from: ribbon => ({
                ...getRibbonAngles(ribbon, false),
                color: ribbon.source.color,
                opacity: 0,
                borderColor: getBorderColor(ribbon.source),
            }),
            update: ribbon => ({
                ...getRibbonAngles(ribbon, false),
                color: ribbon.source.color,
                opacity: getOpacity(ribbon),
                borderColor: getBorderColor(ribbon.source),
            }),
            leave: ribbon => ({
                ...getRibbonAngles(ribbon, false),
                color: ribbon.source.color,
                opacity: 0,
                borderColor: getBorderColor(ribbon.source),
            }),
            expires: true,
            config: springConfig,
            immediate: !animate,
        })

        return (
            <>
                {transition((animatedProps, ribbon) => (
                    <ChordRibbon
                        key={ribbon.id}
                        ribbon={ribbon}
                        ribbonGenerator={ribbonGenerator}
                        animatedProps={animatedProps}
                        borderWidth={borderWidth}
                        blendMode={blendMode}
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
