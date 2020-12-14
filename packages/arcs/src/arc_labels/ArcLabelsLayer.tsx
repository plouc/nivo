import React, { useMemo, CSSProperties } from 'react'
import { animated } from 'react-spring'
import {
    // @ts-ignore
    getLabelGenerator,
    radiansToDegrees,
    useTheme,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useArcCentersTransition } from '../centers'
import { ArcTransitionMode } from '../arcTransitionMode'
import { DatumWithArcAndColor } from '../types'
import { ArcLabelsProps } from './props'

const sliceStyle: CSSProperties = {
    pointerEvents: 'none',
}

interface ArcLabelsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    // CompletePieSvgProps<RawDatum>['arcLabel']
    label: any
    radiusOffset: ArcLabelsProps<Datum, Datum>['arcLabelsRadiusOffset']
    skipAngle: ArcLabelsProps<Datum, Datum>['arcLabelsSkipAngle']
    textColor: ArcLabelsProps<Datum, Datum>['arcLabelsTextColor']
    transitionMode: ArcTransitionMode
}

export const ArcLabelsLayer = <Datum extends DatumWithArcAndColor>({
    center,
    data,
    transitionMode,
    label: labelAccessor,
    radiusOffset,
    skipAngle,
    textColor,
}: ArcLabelsLayerProps<Datum>) => {
    const getLabel = useMemo(() => getLabelGenerator(labelAccessor), [labelAccessor])
    const theme = useTheme()
    const getTextColor = useInheritedColor<Datum>(textColor, theme)

    const filteredData = useMemo(
        () =>
            data.filter(datum => {
                return (
                    Math.abs(radiansToDegrees(datum.arc.endAngle - datum.arc.startAngle)) >=
                    skipAngle
                )
            }),
        [data, skipAngle]
    )

    const { transition, interpolate } = useArcCentersTransition<Datum>(
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
