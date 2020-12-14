import React from 'react'
import { animated } from 'react-spring'
import { useArcLinkLabelsTransition } from './useArcLinkLabelsTransition'
import { DatumWithArcAndColor } from '../types'
import { ArcLinkLabelsProps } from './props'

interface ArcLinkLabelsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    label: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabel']
    skipAngle: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsSkipAngle']
    offset: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsOffset']
    diagonalLength: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsDiagonalLength']
    straightLength: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsStraightLength']
    strokeWidth: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsThickness']
    textOffset: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsTextOffset']
    textColor: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsTextColor']
    linkColor: ArcLinkLabelsProps<Datum, Datum>['arcLinkLabelsColor']
}

export const ArcLinkLabelsLayer = <Datum extends DatumWithArcAndColor>({
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
}: ArcLinkLabelsLayerProps<Datum>) => {
    const { transition, interpolateLink } = useArcLinkLabelsTransition<Datum>({
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
