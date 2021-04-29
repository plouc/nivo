import React from 'react'
import { usePropertyAccessor } from '@nivo/core'
import { DatumWithArcAndColor } from '../types'
import { useArcLinkLabelsTransition } from './useArcLinkLabelsTransition'
import { ArcLinkLabelsProps } from './props'
import { ArcLinkLabel, ArcLinkLabelProps } from './ArcLinkLabel'

export type ArcLinkLabelComponent<Datum extends DatumWithArcAndColor> = (
    props: ArcLinkLabelProps<Datum>
) => JSX.Element

interface ArcLinkLabelsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    label: ArcLinkLabelsProps<Datum>['arcLinkLabel']
    skipAngle: ArcLinkLabelsProps<Datum>['arcLinkLabelsSkipAngle']
    offset: ArcLinkLabelsProps<Datum>['arcLinkLabelsOffset']
    diagonalLength: ArcLinkLabelsProps<Datum>['arcLinkLabelsDiagonalLength']
    straightLength: ArcLinkLabelsProps<Datum>['arcLinkLabelsStraightLength']
    strokeWidth: ArcLinkLabelsProps<Datum>['arcLinkLabelsThickness']
    textOffset: ArcLinkLabelsProps<Datum>['arcLinkLabelsTextOffset']
    textColor: ArcLinkLabelsProps<Datum>['arcLinkLabelsTextColor']
    linkColor: ArcLinkLabelsProps<Datum>['arcLinkLabelsColor']
    component?: ArcLinkLabelComponent<Datum>
}

export const ArcLinkLabelsLayer = <Datum extends DatumWithArcAndColor>({
    center,
    data,
    label: labelAccessor,
    skipAngle,
    offset,
    diagonalLength,
    straightLength,
    strokeWidth,
    textOffset,
    textColor,
    linkColor,
    component = ArcLinkLabel,
}: ArcLinkLabelsLayerProps<Datum>) => {
    const getLabel = usePropertyAccessor<Datum, string>(labelAccessor)

    const {
        transition,
        interpolateLink,
        interpolateTextAnchor,
        interpolateTextPosition,
    } = useArcLinkLabelsTransition<Datum>({
        data,
        skipAngle,
        offset,
        diagonalLength,
        straightLength,
        textOffset,
        linkColor,
        textColor,
    })

    const Label: ArcLinkLabelComponent<Datum> = component

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                return React.createElement(Label, {
                    key: datum.id,
                    datum,
                    label: getLabel(datum),
                    style: {
                        ...transitionProps,
                        thickness: strokeWidth,
                        path: interpolateLink(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius,
                            transitionProps.offset,
                            transitionProps.diagonalLength,
                            transitionProps.straightLength
                        ),
                        textAnchor: interpolateTextAnchor(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius
                        ),
                        textPosition: interpolateTextPosition(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius,
                            transitionProps.offset,
                            transitionProps.diagonalLength,
                            transitionProps.straightLength,
                            transitionProps.textOffset
                        ),
                    },
                })
            })}
        </g>
    )
}
