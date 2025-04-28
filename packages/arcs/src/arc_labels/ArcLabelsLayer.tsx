import { createElement, useMemo } from 'react'
import { PropertyAccessor, usePropertyAccessor, radiansToDegrees } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { useInheritedColor } from '@nivo/colors'
import { useArcCentersTransition } from '../centers'
import { ArcTransitionMode } from '../arcTransitionMode'
import { DatumWithArcAndColor } from '../types'
import { ArcLabelsProps } from './props'
import { ArcLabel, ArcLabelProps } from './ArcLabel'

export type ArcLabelComponent<Datum extends DatumWithArcAndColor> = (
    props: ArcLabelProps<Datum>
) => JSX.Element

interface ArcLabelsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    label: PropertyAccessor<Datum, string>
    radiusOffset: ArcLabelsProps<Datum>['arcLabelsRadiusOffset']
    skipAngle: ArcLabelsProps<Datum>['arcLabelsSkipAngle']
    skipRadius: ArcLabelsProps<Datum>['arcLabelsSkipRadius']
    textColor: ArcLabelsProps<Datum>['arcLabelsTextColor']
    transitionMode: ArcTransitionMode
    component?: ArcLabelsProps<Datum>['arcLabelsComponent']
}

export const ArcLabelsLayer = <Datum extends DatumWithArcAndColor>({
    center,
    data,
    transitionMode,
    label: labelAccessor,
    radiusOffset,
    skipAngle,
    skipRadius,
    textColor,
    component = ArcLabel,
}: ArcLabelsLayerProps<Datum>) => {
    const getLabel = usePropertyAccessor<Datum, string>(labelAccessor)
    const theme = useTheme()
    const getTextColor = useInheritedColor<Datum>(textColor, theme)

    const filteredData = useMemo(
        () =>
            data.filter(datum => {
                const angle = Math.abs(radiansToDegrees(datum.arc.endAngle - datum.arc.startAngle))
                const radius = Math.abs(datum.arc.outerRadius - datum.arc.innerRadius)

                return angle >= skipAngle && radius >= skipRadius
            }),
        [data, skipAngle, skipRadius]
    )

    const { transition, interpolate } = useArcCentersTransition<Datum>(
        filteredData,
        radiusOffset,
        transitionMode
    )

    const Label: ArcLabelComponent<Datum> = component

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {transition((transitionProps, datum) => {
                return createElement(Label, {
                    key: datum.id,
                    datum,
                    label: getLabel(datum),
                    style: {
                        ...transitionProps,
                        transform: interpolate(
                            transitionProps.startAngle,
                            transitionProps.endAngle,
                            transitionProps.innerRadius,
                            transitionProps.outerRadius
                        ),
                        textColor: getTextColor(datum),
                    },
                })
            })}
        </g>
    )
}
