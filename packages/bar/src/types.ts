import { AriaAttributes, FunctionComponent } from 'react'
import { SpringValues } from '@react-spring/web'
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
    EventMap,
    InteractionHandlers,
} from '@nivo/core'
import { PartialTheme, TextStyle } from '@nivo/theming'
import { InheritedColorConfig, OrdinalColorScale, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { AnyScale, ScaleLinearSpec, ScaleSymlogSpec, ScaleBandSpec } from '@nivo/scales'
import { BarLabelLayout } from './compute/common'

// We can use any type for the index, but we need to pick
// an appropriate scale for the type we choose.
// The default is a string.
// The index scale is converted to a band scale eventually,
// because bars need to be spaced evenly.
export type BarIndex = string | number | Date
// We only support numbers for the value, but we can
// also use null to indicate that the value is missing.
export type BarValue = number | null
// Default datum type for the bar chart.
export type BarDatum = Record<string, unknown>
export type BarIndexBy<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = PropertyAccessor<D, I>
export type BarColors<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = OrdinalColorScaleConfig<ComputedDatum<D, I>>
export type BarBorderColor<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = InheritedColorConfig<ComputedBarDatumWithValue<D, I>>
export type BarLabel<D extends BarDatum = BarDatum, I extends BarIndex = string> = PropertyAccessor<
    ComputedBarDatum<D, I>,
    string
>
export type BarLabelTextColor<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = InheritedColorConfig<ComputedBarDatumWithValue<D, I>>
export type BarAnnotationMatcher<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = AnnotationMatcher<ComputedBarDatum<D, I>>

export interface DataProps<D extends BarDatum> {
    data: readonly D[]
}

export type ComputedDatum<D extends BarDatum = BarDatum, I extends BarIndex = string> = {
    id: string | number
    value: BarValue
    formattedValue: string
    hidden: boolean
    index: number
    indexValue: I
    data: Exclude<D, null | undefined | false | '' | 0>
    fill?: string
}

export type ComputedBarDatumWithValue<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = ComputedBarDatum<D, I> & {
    data: ComputedDatum<D, I> & {
        value: number
    }
}

export type ComputedBarDatum<D extends BarDatum = BarDatum, I extends BarIndex = string> = {
    key: string
    index: number
    data: ComputedDatum<D, I>
    x: number
    y: number
    absX: number
    absY: number
    width: number
    height: number
    color: string
    label: string
}

export type BarsWithHidden<D extends BarDatum = BarDatum, I extends BarIndex = string> = Readonly<
    Array<
        Partial<{
            key: string
            x: number
            y: number
            width: number
            height: number
            color: string
        }> & {
            data: Partial<ComputedDatum<D, I>> & {
                id: string | number
                hidden: boolean
            }
        }
    >
>

export type LegendLabelDatum<D extends BarDatum = BarDatum, I extends BarIndex = string> = Partial<
    ComputedDatum<D, I>
> & {
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

interface BarCustomLayerBaseProps<D extends BarDatum = BarDatum, I extends BarIndex = string>
    extends Pick<
            BarCommonProps<D, I>,
            | 'borderRadius'
            | 'borderWidth'
            | 'enableLabel'
            | 'isInteractive'
            | 'labelSkipHeight'
            | 'labelSkipWidth'
            | 'tooltip'
        >,
        Dimensions {
    bars: readonly ComputedBarDatum<D, I>[]
    legendData: [BarLegendProps, readonly LegendData[]][]
    margin: Margin
    innerWidth: number
    innerHeight: number
    isFocusable: boolean
    getTooltipLabel: (datum: ComputedDatum<D, I>) => string | number
    xScale: AnyScale
    yScale: AnyScale
    getColor: OrdinalColorScale<ComputedDatum<D, I>>
}

export interface BarCustomLayerProps<D extends BarDatum = BarDatum, I extends BarIndex = string>
    extends BarCustomLayerBaseProps<D, I>,
        BarInteractionHandlers<D, I> {}

export interface BarCanvasCustomLayerProps<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> extends BarCustomLayerBaseProps<D, I>,
        BarInteractionHandlers<D, I> {}

export type BarCanvasCustomLayer<D extends BarDatum = BarDatum, I extends BarIndex = string> = (
    context: CanvasRenderingContext2D,
    props: BarCanvasCustomLayerProps<D, I>
) => void
export type BarCustomLayer<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = FunctionComponent<BarCustomLayerProps<D, I>>

export type BarCanvasLayer<D extends BarDatum = BarDatum, I extends BarIndex = string> =
    | BarCanvasLayerId
    | BarCanvasCustomLayer<D, I>
export type BarLayer<D extends BarDatum = BarDatum, I extends BarIndex = string> =
    | BarLayerId
    | BarCustomLayer<D, I>

export interface BarItemProps<D extends BarDatum = BarDatum, I extends BarIndex = string>
    extends Pick<
            BarCommonProps<D, I>,
            'borderRadius' | 'borderWidth' | 'isInteractive' | 'tooltip'
        >,
        BarInteractionHandlers<D, I> {
    bar: ComputedBarDatum<D, I> & {
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
    ariaLabel?: BarSvgProps<D, I>['barAriaLabel']
    ariaLabelledBy?: BarSvgProps<D, I>['barAriaLabelledBy']
    ariaDescribedBy?: BarSvgProps<D, I>['barAriaDescribedBy']
    ariaHidden?: BarSvgProps<D, I>['barAriaHidden']
    ariaDisabled?: BarSvgProps<D, I>['barAriaDisabled']
}
export type BarComponent<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = FunctionComponent<BarItemProps<D, I>>

export type RenderBarProps<D extends BarDatum = BarDatum, I extends BarIndex = string> = Omit<
    BarItemProps<D, I>,
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
export type BarCanvasRenderer<D extends BarDatum = BarDatum, I extends BarIndex = string> = (
    context: CanvasRenderingContext2D,
    props: RenderBarProps<D, I>
) => void

export interface BarTooltipProps<D extends BarDatum = BarDatum, I extends BarIndex = string>
    extends ComputedDatum<D, I> {
    color: string
    label: string
    value: number
}
export type BarTooltipComponent<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = FunctionComponent<BarTooltipProps<D, I>>

type BarEventMap = Pick<
    EventMap,
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'onDoubleClick'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'onWheel'
    | 'onContextMenu'
>
export type BarInteractionHandlers<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = InteractionHandlers<ComputedDatum<D, I>, BarEventMap>

export type BarCommonProps<D extends BarDatum = BarDatum, I extends BarIndex = string> = {
    indexBy: BarIndexBy<D, I>
    keys: readonly string[]
    margin?: Box
    innerPadding: number
    padding: number
    valueScale: ScaleLinearSpec | ScaleSymlogSpec
    indexScale: ScaleBandSpec
    enableGridX: boolean
    gridXValues?: GridValues<string | number>
    enableGridY: boolean
    gridYValues?: GridValues<string | number>
    borderColor: BarBorderColor<D, I>
    borderRadius: number
    borderWidth: number
    enableLabel: boolean
    label: BarLabel<D, I>
    labelPosition: 'start' | 'middle' | 'end'
    labelOffset: number
    labelFormat?: string | LabelFormatter
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: BarLabelTextColor<D, I>
    isInteractive: boolean
    tooltip: BarTooltipComponent<D, I>
    valueFormat?: ValueFormat<number>
    legendLabel?: PropertyAccessor<LegendLabelDatum<D, I>, string>
    tooltipLabel: BarLabel<D, I>
    groupMode: 'grouped' | 'stacked'
    layout: 'horizontal' | 'vertical'
    colorBy: 'id' | 'indexValue'
    colors: BarColors<D, I>
    theme: PartialTheme
    annotations: readonly AnnotationMatcher<ComputedBarDatum<D, I>>[]
    legends: readonly BarLegendProps[]
    renderWrapper?: boolean
    initialHiddenIds: readonly (string | number)[]
    enableTotals: boolean
    totalsOffset: number
    role?: string
}

interface BarSvgExtraProps<D extends BarDatum = BarDatum, I extends BarIndex = string> {
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null
    axisRight: AxisProps | null
    axisTop: AxisProps | null
    barComponent: BarComponent<D, I>
    markers: readonly CartesianMarkerProps[]
    layers: readonly BarLayer<D, I>[]
    animateOnMount: boolean
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
    isFocusable: boolean
    barRole?: string | ((data: ComputedDatum<D, I>) => string)
    barAriaLabel?: (data: ComputedDatum<D, I>) => AriaAttributes['aria-label']
    barAriaLabelledBy?: (data: ComputedDatum<D, I>) => AriaAttributes['aria-labelledby']
    barAriaDescribedBy?: (data: ComputedDatum<D, I>) => AriaAttributes['aria-describedby']
    barAriaHidden?: (data: ComputedDatum<D, I>) => AriaAttributes['aria-hidden']
    barAriaDisabled?: (data: ComputedDatum<D, I>) => AriaAttributes['aria-disabled']
}

export type BarSvgProps<D extends BarDatum = BarDatum, I extends BarIndex = string> = DataProps<D> &
    Partial<BarCommonProps<D, I>> &
    Partial<BarSvgExtraProps<D, I>> &
    BarInteractionHandlers<D, I> &
    SvgDefsAndFill<ComputedBarDatum<D, I>> &
    Dimensions &
    MotionProps

export type ResponsiveBarSvgProps<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = WithChartRef<ResponsiveProps<BarSvgProps<D, I>>, SVGSVGElement>

export type BarSvgPropsWithDefaults<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = DataProps<D> &
    BarCommonProps<D, I> &
    BarSvgExtraProps<D, I> &
    SvgDefsAndFill<ComputedBarDatum<D, I>> &
    Dimensions &
    MotionProps

interface BarCanvasExtraProps<D extends BarDatum = BarDatum, I extends BarIndex = string> {
    axisBottom: CanvasAxisProps<any> | null
    axisLeft: CanvasAxisProps<any> | null
    axisRight: CanvasAxisProps<any> | null
    axisTop: CanvasAxisProps<any> | null
    renderBar: BarCanvasRenderer<D, I>
    layers: BarCanvasLayer<D, I>[]
    pixelRatio: number
}

export type BarCanvasProps<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = DataProps<D> &
    Partial<BarCommonProps<D, I>> &
    Partial<BarCanvasExtraProps<D, I>> &
    BarInteractionHandlers<D, I> &
    Dimensions

export type ResponsiveBarCanvasProps<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = WithChartRef<ResponsiveProps<BarCanvasProps<D, I>>, HTMLCanvasElement>

export type BarCanvasPropsWithDefaults<
    D extends BarDatum = BarDatum,
    I extends BarIndex = string,
> = DataProps<D> &
    BarCommonProps<D, I> &
    BarCanvasExtraProps<D, I> &
    BarInteractionHandlers<D, I> &
    Dimensions

export type BarAnnotationsProps<D extends BarDatum = BarDatum, I extends BarIndex = string> = {
    annotations: readonly BarAnnotationMatcher<D, I>[]
    bars: readonly ComputedBarDatum<D, I>[]
}
