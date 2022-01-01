import { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { interpolateColor } from '@nivo/colors'
import { useMotionConfig } from '@nivo/core'
import { ChordArc } from './ChordArc'
import { ArcDatum, ArcGenerator, ChordCommonProps } from './types'

interface ChordArcsProps {
    arcs: ArcDatum[]
    arcGenerator: ArcGenerator
    borderWidth: ChordCommonProps['arcBorderWidth']
    getBorderColor: (arc: ArcDatum) => string
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
        getBorderColor,
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
        const { animate, springConfig: _springConfig } = useMotionConfig()

        if (!animate) {
            return (
                <>
                    {arcs.map(arc => {
                        return (
                            <ChordArc
                                key={arc.id}
                                arc={arc}
                                arcGenerator={arcGenerator}
                                startAngle={arc.startAngle}
                                endAngle={arc.endAngle}
                                opacity={getOpacity(arc)}
                                borderWidth={borderWidth}
                                getBorderColor={getBorderColor}
                                isInteractive={isInteractive}
                                setCurrent={setCurrent}
                                onMouseEnter={onMouseEnter}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                                onClick={onClick}
                                tooltip={tooltip}
                            />
                        )
                    })}
                </>
            )
        }

        const springConfig = {
            ..._springConfig,
            precision: 0.001,
        }

        return (
            <TransitionMotion
                styles={arcs.map(arc => {
                    return {
                        key: arc.id,
                        data: arc,
                        style: {
                            startAngle: spring(arc.startAngle, springConfig),
                            endAngle: spring(arc.endAngle, springConfig),
                            opacity: spring(getOpacity(arc), springConfig),
                            ...interpolateColor(arc.color, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data: arc }) => {
                            return (
                                <ChordArc
                                    key={key}
                                    arc={arc}
                                    arcGenerator={arcGenerator}
                                    startAngle={style.startAngle}
                                    endAngle={style.endAngle}
                                    opacity={style.opacity}
                                    borderWidth={borderWidth}
                                    getBorderColor={getBorderColor}
                                    isInteractive={isInteractive}
                                    setCurrent={setCurrent}
                                    onMouseEnter={onMouseEnter}
                                    onMouseMove={onMouseMove}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                    tooltip={tooltip}
                                />
                            )
                        })}
                    </>
                )}
            </TransitionMotion>
        )
    }
)
