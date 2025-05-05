import { FunctionComponent } from 'react'
import { Interpolation, SpringValue } from '@react-spring/web'
import { PropertyAccessor, BoxAnchor } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { SvgTextLayout, SvgTextAnchor, SvgTextDominantBaseline } from '@nivo/text'
import { DatumWithRect, AnchorWithRect, DatumWithRectAndColor } from '../types'

export interface RectLabelProps<Datum extends DatumWithRectAndColor>
    extends RectComputedLabel<Datum> {
    style: {
        x: SpringValue<number>
        y: SpringValue<number>
        rotation: SpringValue<number>
        progress: SpringValue<number>
        transform: Interpolation<string>
    } & SvgTextLayout
    testId?: string
}

export type RectLabelComponent<Datum extends DatumWithRectAndColor> = FunctionComponent<
    RectLabelProps<Datum>
>

export interface RectLabelsProps<Datum extends DatumWithRectAndColor> {
    uid: PropertyAccessor<Omit<Datum, 'rect'>, string>
    label: PropertyAccessor<Omit<Datum, 'rect'>, string>
    labelBoxAnchor: BoxAnchor
    labelPaddingX: number
    labelPaddingY: number
    labelAnchor: SvgTextAnchor | 'auto'
    labelBaseline: SvgTextDominantBaseline | 'auto'
    labelRotation: number
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: InheritedColorConfig<Omit<Datum, 'rect'>>
    labelComponent?: RectLabelComponent<Datum>
}

export interface RectComputedLabel<Datum extends DatumWithRect> extends AnchorWithRect {
    data: Omit<Datum, 'rect'>
    label: string
    color: string
    rotation: number
}
