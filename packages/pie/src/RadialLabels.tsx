import React from 'react'
import { animated } from 'react-spring'
import { useArcLinkLabelsTransition } from '@nivo/arcs'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface RadialLabelsProps<RawDatum> {
    center: [number, number]
    data: ComputedDatum<RawDatum>[]
    label: CompletePieSvgProps<RawDatum>['radialLabel']
    skipAngle: CompletePieSvgProps<RawDatum>['radialLabelsSkipAngle']
    offset: CompletePieSvgProps<RawDatum>['radialLabelsLinkOffset']
    diagonalLength: CompletePieSvgProps<RawDatum>['radialLabelsLinkDiagonalLength']
    straightLength: CompletePieSvgProps<RawDatum>['radialLabelsLinkHorizontalLength']
    strokeWidth: CompletePieSvgProps<RawDatum>['radialLabelsLinkStrokeWidth']
    textOffset: CompletePieSvgProps<RawDatum>['radialLabelsTextXOffset']
    textColor: CompletePieSvgProps<RawDatum>['radialLabelsTextColor']
    linkColor: CompletePieSvgProps<RawDatum>['radialLabelsLinkColor']
}

export const RadialLabels = <RawDatum,>({
    center,
    data,
    label,
    skipAngle,
    offset,
    diagonalLength,
    straightLength,
    strokeWidth,
    textOffset,
    textColor,
    linkColor,
}: RadialLabelsProps<RawDatum>) => {
    const { transition, interpolateLink } = useArcLinkLabelsTransition<ComputedDatum<RawDatum>>({
        data,
        label,
        skipAngle,
        offset,
        diagonalLength,
        straightLength,
        textOffset,
        linkColor,
        textColor,
    })

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                return (
                    <animated.path
                        key={datum.id}
                        fill="none"
                        stroke={transitionProps.linkColor}
                        strokeWidth={strokeWidth}
                        opacity={transitionProps.opacity}
                        d={interpolateLink(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius,
                            transitionProps.offset,
                            transitionProps.diagonalLength,
                            transitionProps.straightLength
                        )}
                    />
                )
            })}
        </g>
    )
}
