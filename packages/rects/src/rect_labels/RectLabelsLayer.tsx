import { createElement, useMemo } from 'react'
import { usePropertyAccessor } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { DatumWithRectAndColor } from '../types'
import { RectTransitionMode } from '../rectTransitionMode'
import { useRectCentersTransition } from '../centers'
import { RectLabelsProps } from './props'
import { RectLabel, RectLabelProps } from './RectLabel'

export type RectLabelComponent<Datum extends DatumWithRectAndColor> = (
    props: RectLabelProps<Datum>
) => JSX.Element

export interface RectLabelsLayerProps<Datum extends DatumWithRectAndColor> {
    data: Datum[]
    label: RectLabelsProps<Datum>['rectLabel']
    offsetX?: RectLabelsProps<Datum>['rectLabelsOffsetX']
    offsetY?: RectLabelsProps<Datum>['rectLabelsOffsetY']
    skipWidth?: RectLabelsProps<Datum>['rectLabelsSkipWidth']
    skipHeight?: RectLabelsProps<Datum>['rectLabelsSkipHeight']
    textColor: RectLabelsProps<Datum>['rectLabelsTextColor']
    transitionMode?: RectTransitionMode
    component?: RectLabelsProps<Datum>['rectLabelsComponent']
}

export const RectLabelsLayer = <Datum extends DatumWithRectAndColor>({
    data,
    label: labelAccessor,
    offsetX = 0.5,
    offsetY = 0.5,
    skipWidth = 0,
    skipHeight = 0,
    textColor,
    transitionMode = 'flow-down',
    component = RectLabel,
}: RectLabelsLayerProps<Datum>) => {
    const getLabel = usePropertyAccessor<Datum, string>(labelAccessor)
    const theme = useTheme()
    const getTextColor = useInheritedColor<Datum>(textColor, theme)

    const filteredData = useMemo(
        () =>
            data.filter(datum => {
                return datum.rect.width >= skipWidth && datum.rect.height >= skipWidth
            }),
        [data, skipWidth, skipHeight]
    )

    const { transition, interpolate } = useRectCentersTransition<Datum, { opacity: number }>(
        filteredData,
        offsetX,
        offsetY,
        transitionMode
    )

    const Label: RectLabelComponent<Datum> = component

    return (
        <g>
            {transition((transitionProps, datum) => {
                return createElement(Label, {
                    key: datum.id,
                    datum,
                    label: getLabel(datum),
                    style: {
                        ...transitionProps,
                        transform: interpolate(
                            transitionProps.x,
                            transitionProps.width,
                            transitionProps.offsetX,
                            transitionProps.y,
                            transitionProps.height,
                            transitionProps.offsetY
                        ),
                        textColor: getTextColor(datum),
                    },
                })
            })}
        </g>
    )
}
