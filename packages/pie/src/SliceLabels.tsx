import React, { useMemo, CSSProperties } from 'react'
import { animated } from 'react-spring'
import {
    // @ts-ignore
    getLabelGenerator,
    // @ts-ignore
    radiansToDegrees,
    useTheme,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useArcCentersTransition } from '@nivo/arcs'
import { CompletePieSvgProps, ComputedDatum } from './types'

const sliceStyle: CSSProperties = {
    pointerEvents: 'none',
}

interface SliceLabelsProps<RawDatum> {
    center: [number, number]
    data: ComputedDatum<RawDatum>[]
    label: CompletePieSvgProps<RawDatum>['sliceLabel']
    radiusOffset: CompletePieSvgProps<RawDatum>['sliceLabelsRadiusOffset']
    skipAngle: CompletePieSvgProps<RawDatum>['sliceLabelsSkipAngle']
    textColor: CompletePieSvgProps<RawDatum>['sliceLabelsTextColor']
    transitionMode: CompletePieSvgProps<RawDatum>['transitionMode']
}

export const SliceLabels = <RawDatum,>({
    center,
    data,
    transitionMode,
    label: labelAccessor,
    radiusOffset,
    skipAngle,
    textColor,
}: SliceLabelsProps<RawDatum>) => {
    const getLabel = useMemo(() => getLabelGenerator(labelAccessor), [labelAccessor])
    const theme = useTheme()
    const getTextColor = useInheritedColor<ComputedDatum<RawDatum>>(textColor, theme)

    const filteredData = useMemo(
        () =>
            data.filter(datum => {
                return (
                    Math.abs(radiansToDegrees(datum.arc.endAngle - datum.arc.startAngle)) <
                    skipAngle
                )
            }),
        [data, skipAngle]
    )

    const { transition, interpolate } = useArcCentersTransition<ComputedDatum<RawDatum>>(
        filteredData,
        radiusOffset,
        transitionMode
    )

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                return (
                    <animated.g
                        key={datum.id}
                        transform={interpolate(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius
                        )}
                        opacity={transitionProps.progress}
                        style={sliceStyle}
                    >
                        <animated.text
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{
                                ...theme.labels.text,
                                fill: getTextColor(datum),
                            }}
                        >
                            {getLabel(datum)}
                        </animated.text>
                    </animated.g>
                )
            })}
        </g>
    )
}
