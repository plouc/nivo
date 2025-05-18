import { MouseEvent, AriaAttributes, FunctionComponent } from 'react'
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
    ValueFormat,
    WithChartRef,
    ResponsiveProps,
} from '@nivo/core'
import { PartialTheme, TextStyle } from '@nivo/theming'
import { InheritedColorConfig, OrdinalColorScale, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { AnyScale, ScaleSpec, ScaleBandSpec } from '@nivo/scales'
import { SpringValues } from '@react-spring/web'
import { BarLabelLayout } from './compute/common'

export type BarDatum = Record<string, string | number>

export interface DataProps<D extends BarDatum> {
    data: readonly D[]
}

export type ComputedDatum<D extends BarDatum> = {
    id: string | number
    value: number | null
    formattedValue: string
    hidden: boolean
    index: number
    indexValue: string | number
    data: Exclude<D, null | undefined | false | '' | 0>
    fill?: string
}

export type ComputedBarDatumWithValue<D extends BarDatum> = ComputedBarDatum<D> & {
    data: ComputedDatum<D> & {
        value: number
    }
}

export type ComputedBarDatum<D extends BarDatum> = {
    key: string
    index: number
    data: ComputedDatum<D>
    x: number
    y: number
    absX: number
    absY: number
    width: number
    height: number
    color: string
    label: string
}

export type BarsWithHidden<D extends BarDatum> = Array<
    Partial<{
        key: string
        x: number
        y: number
        width: number
        height: number
        color: string
    }> & {
        data: Partial<ComputedDatum<D>> & {
            id: string | number
            hidden: boolean
        }
    }
>

export type LegendLabelDatum<D extends BarDatum> = Partial<ComputedDatum<D>> & {
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

export type BarLayerId = 'grid' | 'axes' | 'bars' | 'markers' | 'legends' | 'annotations' | 'totals'
export type BarCanvasLayerId = Exclude<BarLayerId, 'markers'>

interface BarCustomLayerBaseProps<D extends BarDatum>
    extends Pick<
            BarCommonProps<D>,
            | 'borderRadius'
            | 'borderWidth'
            | 'enableLabel'
            | 'isInteractive'
            | 'labelSkipHeight'
            | 'labelSkipWidth'
            | 'tooltip'
        >,
        Dimensions {
    bars: readonly ComputedBarDatum<D>[]
    legendData: [BarLegendProps, readonly LegendData[]][]
    margin: Margin
    innerWidth: number
    innerHeight: number
    isFocusable: boolean
    getTooltipLabel: (datum: ComputedDatum<D>) => string | number
    xScale: AnyScale
    yScale: AnyScale
    getColor: OrdinalColorScale<ComputedDatum<D>>
}

export interface BarCustomLayerProps<D extends BarDatum>
    extends BarCustomLayerBaseProps<D>,
        BarHandlers<D, SVGRectElement> {}

export interface BarCanvasCustomLayerProps<D extends BarDatum>
    extends BarCustomLayerBaseProps<D>,
        BarHandlers<D, HTMLCanvasElement> {}

export type BarCanvasCustomLayer<D extends BarDatum> = (
    context: CanvasRenderingContext2D,
    props: BarCanvasCustomLayerProps<D>
) => void
export type BarCustomLayer<D extends BarDatum> = FunctionComponent<BarCustomLayerProps<D>>

export type BarCanvasLayer<D extends BarDatum> = BarCanvasLayerId | BarCanvasCustomLayer<D>
export type BarLayer<D extends BarDatum> = BarLayerId | BarCustomLayer<D>

export interface BarItemProps<D extends BarDatum>
    extends Pick<BarCommonProps<D>, 'borderRadius' | 'borderWidth' | 'isInteractive' | 'tooltip'>,
        BarHandlers<D, SVGRectElement> {
    bar: ComputedBarDatum<D> & {
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
    ariaLabel?: BarSvgProps<D>['barAriaLabel']
    ariaLabelledBy?: BarSvgProps<D>['barAriaLabelledBy']
    ariaDescribedBy?: BarSvgProps<D>['barAriaDescribedBy']
    ariaHidden?: BarSvgProps<D>['barAriaHidden']
    ariaDisabled?: BarSvgProps<D>['barAriaDisabled']
}
export type BarComponent<D extends BarDatum> = FunctionComponent<BarItemProps<D>>

export type RenderBarProps<D extends BarDatum> = Omit<
    BarItemProps<D>,
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
        labelStyle: TextStyle
    }
export type BarCanvasRenderer<D extends BarDatum> = (
    context: CanvasRenderingContext2D,
    props: RenderBarProps<D>
) => void

export interface BarTooltipProps<D extends BarDatum> extends ComputedDatum<D> {
    color: string
    label: string
    value: number
}
export type BarTooltipComponent<D extends BarDatum> = FunctionComponent<BarTooltipProps<D>>

export type BarHandlers<D extends BarDatum, E extends Element> = {
    onClick?: (datum: ComputedDatum<D> & { color: string }, event: MouseEvent<E>) => void
    onMouseEnter?: (datum: ComputedDatum<D>, event: MouseEvent<E>) => void
    onMouseLeave?: (datum: ComputedDatum<D>, event: MouseEvent<E>) => void
}

export type BarCommonProps<D extends BarDatum> = {
    indexBy: PropertyAccessor<D, string>
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
    borderColor: InheritedColorConfig<ComputedBarDatumWithValue<D>>
    borderRadius: number
    borderWidth: number
    enableLabel: boolean
    label: PropertyAccessor<ComputedDatum<D>, string>
    labelPosition: 'start' | 'middle' | 'end'
    labelOffset: number
    labelFormat?: string | LabelFormatter
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: InheritedColorConfig<ComputedBarDatumWithValue<D>>
    isInteractive: boolean
    tooltip: BarTooltipComponent<D>
    valueFormat?: ValueFormat<number>
    legendLabel?: PropertyAccessor<LegendLabelDatum<D>, string>
    tooltipLabel: PropertyAccessor<ComputedDatum<D>, string>
    groupMode: 'grouped' | 'stacked'
    layout: 'horizontal' | 'vertical'
    reverse: boolean
    colorBy: 'id' | 'indexValue'
    colors: OrdinalColorScaleConfig<ComputedDatum<D>>
    theme: PartialTheme
    annotations: readonly AnnotationMatcher<ComputedBarDatum<D>>[]
    legends: readonly BarLegendProps[]
    renderWrapper?: boolean
    initialHiddenIds: readonly (string | number)[]
    enableTotals: boolean
    totalsOffset: number
    role?: string
}

interface BarSvgExtraProps<D extends BarDatum> {
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null
    axisRight: AxisProps | null
    axisTop: AxisProps | null
    barComponent: BarComponent<D>
    markers: readonly CartesianMarkerProps[]
    layers: readonly BarLayer<D>[]
    animateOnMount: boolean
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
    isFocusable: boolean
    barRole?: string | ((data: ComputedDatum<D>) => string)
    barAriaLabel?: (data: ComputedDatum<D>) => AriaAttributes['aria-label']
    barAriaLabelledBy?: (data: ComputedDatum<D>) => AriaAttributes['aria-labelledby']
    barAriaDescribedBy?: (data: ComputedDatum<D>) => AriaAttributes['aria-describedby']
    barAriaHidden?: (data: ComputedDatum<D>) => AriaAttributes['aria-hidden']
    barAriaDisabled?: (data: ComputedDatum<D>) => AriaAttributes['aria-disabled']
}

export type BarSvgProps<D extends BarDatum> = DataProps<D> &
    Partial<BarCommonProps<D>> &
    Partial<BarSvgExtraProps<D>> &
    BarHandlers<D, SVGRectElement> &
    SvgDefsAndFill<ComputedBarDatum<D>> &
    Dimensions &
    MotionProps
export type ResponsiveBarSvgProps<D extends BarDatum> = WithChartRef<
    ResponsiveProps<BarSvgProps<D>>,
    SVGSVGElement
>
export type BarSvgPropsWithDefaults<D extends BarDatum> = DataProps<D> &
    BarCommonProps<D> &
    BarSvgExtraProps<D> &
    SvgDefsAndFill<ComputedBarDatum<D>> &
    Dimensions &
    MotionProps

interface BarCanvasExtraProps<D extends BarDatum> {
    axisBottom: CanvasAxisProps<any> | null
    axisLeft: CanvasAxisProps<any> | null
    axisRight: CanvasAxisProps<any> | null
    axisTop: CanvasAxisProps<any> | null
    renderBar: BarCanvasRenderer<D>
    layers: BarCanvasLayer<D>[]
    pixelRatio: number
}

export type BarCanvasProps<D extends BarDatum> = DataProps<D> &
    Partial<BarCommonProps<D>> &
    Partial<BarCanvasExtraProps<D>> &
    BarHandlers<D, HTMLCanvasElement> &
    Dimensions
export type ResponsiveBarCanvasProps<D extends BarDatum> = WithChartRef<
    ResponsiveProps<BarCanvasProps<D>>,
    HTMLCanvasElement
>
export type BarCanvasPropsWithDefaults<D extends BarDatum> = DataProps<D> &
    BarCommonProps<D> &
    BarCanvasExtraProps<D> &
    BarHandlers<D, HTMLCanvasElement> &
    Dimensions

export type BarAnnotationsProps<D extends BarDatum> = {
    annotations: readonly AnnotationMatcher<ComputedBarDatum<D>>[]
    bars: readonly ComputedBarDatum<D>[]
}
