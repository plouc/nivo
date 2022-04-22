import { useInheritedColor } from '@nivo/colors'
import { PropertyAccessor, usePropertyAccessor, useTheme } from '@nivo/core'
import { createElement } from 'react'
import { useRectCentersTransition } from '../centers'
import { DatumWithRectAndColor } from '../types'
import { RectLabel, RectLabelProps } from './RectLabel'
import { RectLabelsProps } from './props'

export type RectLabelComponent<TDatum extends DatumWithRectAndColor> = (
    props: RectLabelProps<TDatum>
) => JSX.Element

export interface RectLabelsLayerProps<TDatum extends DatumWithRectAndColor> {
    baseOffsetLeft: number
    baseOffsetTop: number
    component?: RectLabelsProps<TDatum>['rectLabelsComponent']
    data: TDatum[]
    label: PropertyAccessor<TDatum, string>
    offset: RectLabelsProps<TDatum>['rectLabelsOffset']
    textColor: RectLabelsProps<TDatum>['rectLabelsTextColor']
}

export const RectLabelsLayer = <TDatum extends DatumWithRectAndColor>({
    data,
    label: labelAccessor,
    textColor,
    offset,
    baseOffsetLeft,
    baseOffsetTop,
    component = RectLabel,
}: RectLabelsLayerProps<TDatum>) => {
    const getLabel = usePropertyAccessor<TDatum, string>(labelAccessor)
    const theme = useTheme()
    const getTextColor = useInheritedColor<TDatum>(textColor, theme)

    const { transition, interpolate } = useRectCentersTransition<TDatum>(
        data,
        offset,
        baseOffsetLeft,
        baseOffsetTop
    )

    const Label: RectLabelComponent<TDatum> = component

    return (
        <g>
            {transition((transitionProps, datum) => {
                return createElement(Label, {
                    key: datum.id,
                    datum,
                    label: getLabel(datum),
                    style: {
                        ...transitionProps,
                        textColor: getTextColor(datum),
                        transform: interpolate(
                            transitionProps.x0,
                            transitionProps.y0,
                            transitionProps.width,
                            transitionProps.height
                        ),
                    },
                })
            })}
        </g>
    )
}
