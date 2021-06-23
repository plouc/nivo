import * as React from 'react'
import { AnnotationMatcher } from '@nivo/annotations'
import { AxisProps, GridValues } from '@nivo/axes'
import {
    Box,
    CartesianMarkerProps,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    SvgDefsAndFill,
    Theme,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Scale, ScaleSpec, ScaleBandSpec } from '@nivo/scales'
import { SpringValues } from '@react-spring/web'

export interface BarDatum {
    [key: string]: string | number
}

export interface DataProps<RawDatum extends BarDatum> {
    data: RawDatum[]
}

export type BarDatumWithColor = BarDatum & {
    color: string
}

export type ComputedDatum<RawDatum> = {
    id: string | number
    value: number | null
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
    data: ComputedDatum<RawDatum>
    x: number
    y: number
    width: number
    height: number
    color: string
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

export type BarLayerId = 'grid' | 'axes' | 'bars' | 'markers' | 'legends' | 'annotations'

export interface BarCustomLayerProps<RawDatum>
    extends Pick<
            BarCommonProps<RawDatum>,
            | 'borderRadius'
            | 'borderWidth'
            | 'enableLabel'
            | 'labelSkipHeight'
            | 'labelSkipWidth'
            | 'tooltip'
            | 'tooltipFormat'
        >,
        TooltipHandlers,
        BarHandlers<RawDatum, SVGRectElement> {
    bars: ComputedBarDatum<RawDatum>[]
    legendData: BarsWithHidden<RawDatum>

    getTooltipLabel: (datum: ComputedDatum<RawDatum>) => string | number

    xScale: Scale<any, any>
    yScale: Scale<any, any>
}

export type BarCustomLayer<RawDatum> = React.FC<BarCustomLayerProps<RawDatum>>

export type BarLayer<RawDatum> = BarLayerId | BarCustomLayer<RawDatum>

export interface BarItemProps<RawDatum>
    extends Pick<
            BarCommonProps<RawDatum>,
            'borderRadius' | 'borderWidth' | 'tooltip' | 'tooltipFormat'
        >,
        ComputedBarDatum<RawDatum>,
        TooltipHandlers,
        BarHandlers<RawDatum, SVGRectElement> {
    borderColor: string

    style: SpringValues<{
        color: string
        height: number
        transform: string
        width: number
        x: number
        y: number
    }>

    label: string
    labelColor: string
    shouldRenderLabel: boolean

    getTooltipLabel: (datum: ComputedDatum<RawDatum>) => string | number

    data: ComputedBarDatum<RawDatum>['data'] & { value: number }
}

export interface BarTooltipProps<RawDatum> extends ComputedDatum<RawDatum> {
    color: string
    getTooltipLabel: (datum: ComputedDatum<RawDatum>) => string | number
    tooltipFormat: BarCommonProps<RawDatum>['tooltipFormat']
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
    keys: string[]

    maxValue: 'auto' | number
    minValue: 'auto' | number

    margin?: Box
    innerPadding: number
    padding: number

    barComponent: React.FC<BarItemProps<RawDatum>>

    valueScale: ScaleSpec
    indexScale: ScaleBandSpec

    axisBottom?: AxisProps
    axisLeft?: AxisProps
    axisRight?: AxisProps
    axisTop?: AxisProps

    enableGridX: boolean
    gridXValues?: GridValues<string | number>
    enableGridY: boolean
    gridYValues?: GridValues<string | number>

    borderColor: InheritedColorConfig<ComputedBarDatum<RawDatum>>
    borderRadius: number
    borderWidth: number

    enableLabel: boolean
    label: PropertyAccessor<ComputedDatum<RawDatum>, string>
    labelFormat: string | LabelFormatter
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: InheritedColorConfig<ComputedBarDatum<RawDatum>>

    isInteractive: boolean

    tooltip: React.FC<BarTooltipProps<RawDatum>>
    tooltipLabel: PropertyAccessor<ComputedDatum<RawDatum>, string>
    tooltipFormat?: ValueFormat<string | number | Date>

    groupMode: 'grouped' | 'stacked'
    layout: 'horizontal' | 'vertical'
    reverse: boolean

    colorBy: 'id' | 'indexValue'
    colors: OrdinalColorScaleConfig<ComputedDatum<RawDatum>>
    theme: Theme

    annotations: AnnotationMatcher<ComputedBarDatum<RawDatum>>[]
    legends: BarLegendProps[]
    markers?: CartesianMarkerProps[]

    renderWrapper?: boolean
}

export type BarSvgProps<RawDatum extends BarDatum> = Partial<BarCommonProps<RawDatum>> &
    DataProps<RawDatum> &
    BarHandlers<RawDatum, SVGRectElement> &
    SvgDefsAndFill<ComputedBarDatum<RawDatum>> &
    Dimensions &
    ModernMotionProps &
    Partial<{
        initialHiddenIds: string[]
        layers: BarLayer<RawDatum>[]
        role: string
    }>

export type BarCanvasProps<RawDatum extends BarDatum> = Partial<BarCommonProps<RawDatum>> &
    DataProps<RawDatum> &
    BarHandlers<RawDatum, HTMLCanvasElement> &
    Dimensions & {
        pixelRatio?: number
    }

export type BarAnnotationsProps<RawDatum> = {
    annotations: AnnotationMatcher<ComputedBarDatum<RawDatum>>[]
    bars: ComputedBarDatum<RawDatum>[]
}

export type TooltipHandlers = {
    hideTooltip: () => void
    showTooltip: (content: JSX.Element, event: React.MouseEvent<SVGRectElement>) => void
}
