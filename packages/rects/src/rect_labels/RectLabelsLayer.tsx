import { useInheritedColor } from '@nivo/colors'
import { PropertyAccessor, usePropertyAccessor, useTheme } from '@nivo/core'
import { createElement } from 'react'
import { DatumWithRectAndColor } from '../types'
import { useRectsTransition } from '../useRectsTransition'
import { RectLabel, RectLabelProps } from './RectLabel'
import { RectLabelsProps } from './props'

export type RectLabelComponent<TDatum extends DatumWithRectAndColor> = (
    props: RectLabelProps<TDatum>
) => JSX.Element

interface RectLabelsLayerProps<TDatum extends DatumWithRectAndColor> {
    component?: RectLabelsProps<TDatum>['rectLabelsComponent']
    data: TDatum[]
    label: PropertyAccessor<TDatum, string>
    textColor: RectLabelsProps<TDatum>['rectLabelsTextColor']
}

export const RectLabelsLayer = <TDatum extends DatumWithRectAndColor>({
    data,
    label: labelAccessor,
    textColor,
    component = RectLabel,
}: RectLabelsLayerProps<TDatum>) => {
    const getLabel = usePropertyAccessor<TDatum, string>(labelAccessor)
    const theme = useTheme()
    const getTextColor = useInheritedColor<TDatum>(textColor, theme)

    // const filteredData = useMemo(() => {}, [])

    const { transition } = useRectsTransition<TDatum>(data)

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
                    },
                })
            })}
        </g>
    )
}
