import * as React from 'react'
import { AnnotationMatcher } from '@nivo/annotations'
import { AxisProps, CanvasAxisProps, GridValues } from '@nivo/axes'
import {
    Box,
    CartesianMarkerProps,
    Dimensions,
    Margin,
    MotionProps,
    PropertyAccessor,
    SvgDefsAndFill,
    Theme,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { AnyScale, ScaleSpec, ScaleBandSpec } from '@nivo/scales'
import { SpringValues } from '@react-spring/web'
import { BarLabelLayout } from './compute/common'

export interface BarDatum {
    [key: string]: string | number
}

export interface DataProps<RawDatum extends BarDatum> {
    data: readonly RawDatum[]
}

export type BarDatumWithColor = BarDatum & {
    color: string
}

export type ComputedDatum<RawDatum> = {
    id: string | number
    value: number | null
    formattedValue: string
    hidden: boolean
    index: number
    indexValue: string | number
    data: Exclude<RawDatum, null | undefined | false | '' | 0>
    fill?: string
}

export type ComputedBarDatumWithValue<RawDatum> = ComputedBarDatum<RawDatum> & {
    data: ComputedDatum<RawDatum> & {
        value: number
    }
}

export type ComputedBarDatum<RawDatum> = {
    key: string
    index: number
    data: ComputedDatum<RawDatum>
    x: number
    y: number
    absX: number
    absY: number
    width: number
    height: number
    color: string
    label: string
}

export type BarsWithHidden<RawDatum> = Array<
    Partial<{
        key: string
        x: number
        y: number
        width: number
        height: number
        color: string
    }> & {
        data: Partial<ComputedDatum<RawDatum>> & {
            id: string | number
            hidden: boolean
        }
    }
>

export type LegendLabelDatum<RawDatum> = Partial<ComputedDatum<RawDatum>> & {
    id: string | number
    hidden: boolean
}

export type LegendData = {
    id: string | number
    label: string | number
    hidden: boolean
    color: string
}

export interface BarLegendProps extends LegendProps {
    dataFrom: 'indexes' | 'keys'
}

export type LabelFormatter = (label: string | number) => string | number
export type ValueFormatter = (value: number) => string | number

export type BarLayerId = 'grid' | 'axes' | 'bars' | 'markers' | 'legends' | 'annotations' | 'totals'
export type BarCanvasLayerId = Exclude<BarLayerId, 'markers'>

interface BarCustomLayerBaseProps<RawDatum>
    extends Pick<
            BarCommonProps<RawDatum>,
            | 'borderRadius'
            | 'borderWidth'
            | 'enableLabel'
            | 'isInteractive'
            | 'labelSkipHeight'
            | 'labelSkipWidth'
            | 'tooltip'
        >,
        Dimensions {
    bars: readonly ComputedBarDatum<RawDatum>[]
    legendData: [BarLegendProps, readonly LegendData[]][]

    margin: Margin
    innerWidth: number
    innerHeight: number

    isFocusable: boolean

    getTooltipLabel: (datum: ComputedDatum<RawDatum>) => string | number

    xScale: AnyScale
    yScale: AnyScale
}

export interface BarCustomLayerProps<RawDatum>
    extends BarCustomLayerBaseProps<RawDatum>,
        BarHandlers<RawDatum, SVGRectElement> {}

export interface BarCanvasCustomLayerProps<RawDatum>
    extends BarCustomLayerBaseProps<RawDatum>,
        BarHandlers<RawDatum, HTMLCanvasElement> {}

export type BarCanvasCustomLayer<RawDatum> = (
    context: CanvasRenderingContext2D,
    props: BarCanvasCustomLayerProps<RawDatum>
) => void
export type BarCustomLayer<RawDatum> = React.FC<BarCustomLayerProps<RawDatum>>

export type BarCanvasLayer<RawDatum> = BarCanvasLayerId | BarCanvasCustomLayer<RawDatum>
export type BarLayer<RawDatum> = BarLayerId | BarCustomLayer<RawDatum>

export interface BarItemProps<RawDatum extends BarDatum>
    extends Pick<
            BarCommonProps<RawDatum>,
            'borderRadius' | 'borderWidth' | 'isInteractive' | 'tooltip'
        >,
        BarHandlers<RawDatum, SVGRectElement> {
    bar: ComputedBarDatum<RawDatum> & {
        data: {
            value: number
        }
    }

    style: SpringValues<{
        borderColor: string
        color: string
        height: number
        labelColor: string
        labelOpacity: number
        labelX: number
        labelY: number
        opacity: number
        transform: string
        width: number
        textAnchor: 'start' | 'middle'
    }>

    label: string
    shouldRenderLabel: boolean

    isFocusable: boolean
    ariaLabel?: BarSvgProps<RawDatum>['barAriaLabel']
    ariaLabelledBy?: BarSvgProps<RawDatum>['barAriaLabelledBy']
    ariaDescribedBy?: BarSvgProps<RawDatum>['barAriaDescribedBy']
    ariaHidden?: BarSvgProps<RawDatum>['barAriaHidden']
    ariaDisabled?: BarSvgProps<RawDatum>['barAriaDisabled']
}

export type RenderBarProps<RawDatum extends BarDatum> = Omit<
    BarItemProps<RawDatum>,
    | 'isInteractive'
    | 'style'
    | 'tooltip'
    | 'isFocusable'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
    | 'ariaHidden'
    | 'ariaDisabled'
> &
    BarLabelLayout & {
        borderColor: string
        labelColor: string
    }

export interface BarTooltipProps<RawDatum> extends ComputedDatum<RawDatum> {
    color: string
    label: string
    value: number
}

export type BarHandlers<RawDatum, Element> = {
    onClick?: (
        datum: ComputedDatum<RawDatum> & { color: string },
        event: React.MouseEvent<Element>
    ) => void
    onMouseEnter?: (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<Element>) => void
    onMouseLeave?: (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<Element>) => void
}

export type BarCommonProps<RawDatum> = {
    indexBy: PropertyAccessor<RawDatum, string>
    keys: readonly string[]

    maxValue: 'auto' | number
    minValue: 'auto' | number

    margin?: Box
    innerPadding: number
    padding: number

    valueScale: ScaleSpec
    indexScale: ScaleBandSpec

    enableGridX: boolean
    gridXValues?: GridValues<string | number>
    enableGridY: boolean
    gridYValues?: GridValues<string | number>

    borderColor: InheritedColorConfig<ComputedBarDatumWithValue<RawDatum>>
    borderRadius: number
    borderWidth: number

    enableLabel: boolean
    label: PropertyAccessor<ComputedDatum<RawDatum>, string>
    labelPosition: 'start' | 'middle' | 'end'
    labelOffset: number
    labelFormat: string | LabelFormatter
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: InheritedColorConfig<ComputedBarDatumWithValue<RawDatum>>

    isInteractive: boolean

    tooltip: React.FC<BarTooltipProps<RawDatum>>

    valueFormat?: ValueFormat<number>

    legendLabel?: PropertyAccessor<LegendLabelDatum<RawDatum>, string>
    tooltipLabel: PropertyAccessor<ComputedDatum<RawDatum>, string>

    groupMode: 'grouped' | 'stacked'
    layout: 'horizontal' | 'vertical'
    reverse: boolean

    colorBy: 'id' | 'indexValue'
    colors: OrdinalColorScaleConfig<ComputedDatum<RawDatum>>
    theme: Theme

    annotations: readonly AnnotationMatcher<ComputedBarDatum<RawDatum>>[]
    legends: readonly BarLegendProps[]

    renderWrapper?: boolean

    initialHiddenIds: readonly (string | number)[]

    enableTotals: boolean
    totalsOffset: number
}

export type BarSvgProps<RawDatum extends BarDatum> = Partial<BarCommonProps<RawDatum>> &
    DataProps<RawDatum> &
    BarHandlers<RawDatum, SVGRectElement> &
    SvgDefsAndFill<ComputedBarDatum<RawDatum>> &
    Dimensions &
    MotionProps &
    Partial<{
        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        axisRight: AxisProps | null
        axisTop: AxisProps | null

        barComponent: React.FC<BarItemProps<RawDatum>>

        markers: readonly CartesianMarkerProps[]

        layers: readonly BarLayer<RawDatum>[]

        role: string
        ariaLabel?: React.AriaAttributes['aria-label']
        ariaLabelledBy?: React.AriaAttributes['aria-labelledby']
        ariaDescribedBy?: React.AriaAttributes['aria-describedby']
        isFocusable?: boolean
        barAriaLabel?: (data: ComputedDatum<RawDatum>) => React.AriaAttributes['aria-label']
        barAriaLabelledBy?: (
            data: ComputedDatum<RawDatum>
        ) => React.AriaAttributes['aria-labelledby']
        barAriaDescribedBy?: (
            data: ComputedDatum<RawDatum>
        ) => React.AriaAttributes['aria-describedby']
        barAriaHidden?: (data: ComputedDatum<RawDatum>) => React.AriaAttributes['aria-hidden']
        barAriaDisabled?: (data: ComputedDatum<RawDatum>) => React.AriaAttributes['aria-disabled']
    }>

export type BarCanvasProps<RawDatum extends BarDatum> = Partial<BarCommonProps<RawDatum>> &
    DataProps<RawDatum> &
    BarHandlers<RawDatum, HTMLCanvasElement> &
    Dimensions &
    Partial<{
        axisBottom: CanvasAxisProps<any> | null
        axisLeft: CanvasAxisProps<any> | null
        axisRight: CanvasAxisProps<any> | null
        axisTop: CanvasAxisProps<any> | null

        renderBar: (context: CanvasRenderingContext2D, props: RenderBarProps<RawDatum>) => void

        layers: BarCanvasLayer<RawDatum>[]
        pixelRatio: number
    }>

export type BarAnnotationsProps<RawDatum> = {
    annotations: readonly AnnotationMatcher<ComputedBarDatum<RawDatum>>[]
    bars: readonly ComputedBarDatum<RawDatum>[]
}
