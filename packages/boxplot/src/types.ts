import * as React from 'react'
import { AnnotationMatcher } from '@nivo/annotations'
import { AxisProps, GridValues } from '@nivo/axes'
import {
    Box,
    CartesianMarkerProps,
    Dimensions,
    Margin,
    ModernMotionProps,
    PropertyAccessor,
    SvgDefsAndFill,
    Theme,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { ScaleSpec, ScaleBandSpec, Scale } from '@nivo/scales'
import { SpringValues } from '@react-spring/web'

export interface BoxPlotDatum {
    [key: string]: number | string
}

export interface BoxPlotSummary {
    group: string
    subGroup: string
    groupIndex: number
    subGroupIndex: number
    n: number
    extrema: [number, number]
    quantiles: [number, number, number, number, number]
    values: [number, number, number, number, number]
    mean: number
}

export interface BoxPlotSummaryFormatted {
    n: string
    extrema: [string, string]
    quantiles: [string, string, string, string, string]
    values: [string, string, string, string, string]
    mean: string
}

export type ComputedBoxPlotSummary = {
    key: string
    group: string
    subGroup: string
    data: BoxPlotSummary
    coordinates: Pick<BoxPlotSummary, 'mean' | 'extrema' | 'values'>
    formatted: BoxPlotSummaryFormatted
    x: number
    y: number
    width: number
    height: number
    color: string
    fill?: string
    label: string
}

// determines the format for the input data accepted by the <BoxPlot> component
export interface DataProps<RawDatum> {
    data: RawDatum[]
}

export type LegendData = {
    id: string | number
    label: string | number
    color: string
}

export type LabelFormatter = (label: string | number) => string | number
export type ValueFormatter = (value: number) => string | number

export type BoxPlotLayerId = 'grid' | 'axes' | 'boxPlots' | 'markers' | 'legends' | 'annotations'

export interface BoxPlotCustomLayerProps<RawDatum>
    extends Pick<
            BoxPlotCommonProps<RawDatum>,
            | 'borderRadius'
            | 'borderWidth'
            | 'isInteractive'
            | 'tooltip'
            | 'padding'
            | 'innerPadding'
        >,
        Dimensions,
        BoxPlotHandlers<SVGRectElement> {
    boxPlot: ComputedBoxPlotSummary[]
    legendData: BoxPlotSummary

    margin: Margin
    innerWidth: number
    innerHeight: number

    getTooltipLabel: (datum: ComputedBoxPlotSummary) => string | number

    xScale: Scale<any, any>
    yScale: Scale<any, any>
}

export type BoxPlotCustomLayer<RawDatum> = React.FC<BoxPlotCustomLayerProps<RawDatum>>

export type BoxPlotLayer<RawDatum> = BoxPlotLayerId | BoxPlotCustomLayer<RawDatum>

export interface BoxPlotItemProps<RawDatum extends BoxPlotDatum>
    extends Pick<
            BoxPlotCommonProps<RawDatum>,
            | 'layout'
            | 'borderRadius'
            | 'borderWidth'
            | 'medianWidth'
            | 'whiskerWidth'
            | 'whiskerEndWidth'
            | 'isInteractive'
            | 'tooltip'
        >,
        BoxPlotHandlers<SVGRectElement> {
    boxPlot: ComputedBoxPlotSummary
    style: SpringValues<{
        color: string
        borderColor: string
        medianColor: string
        whiskerColor: string
        height: number
        opacity: number
        transform: string
        width: number
    }>

    isFocusable: boolean
    ariaLabel?: BoxPlotSvgProps<RawDatum>['boxPlotAriaLabel']
    ariaLabelledBy?: BoxPlotSvgProps<RawDatum>['boxPlotAriaLabelledBy']
    ariaDescribedBy?: BoxPlotSvgProps<RawDatum>['boxPlotAriaDescribedBy']
}

export type RenderBoxPlotProps<RawDatum extends BoxPlotDatum> = Omit<
    BoxPlotItemProps<RawDatum>,
    | 'isInteractive'
    | 'style'
    | 'tooltip'
    | 'isFocusable'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> & {
    borderColor: string
    labelColor: string
}

export type BoxPlotTooltipProps = Pick<ComputedBoxPlotSummary, 'formatted' | 'color' | 'label'>

export type BoxPlotHandlers<Element> = {
    onClick?: (datum: ComputedBoxPlotSummary, event: React.MouseEvent<Element>) => void
    onMouseEnter?: (datum: ComputedBoxPlotSummary, event: React.MouseEvent<Element>) => void
    onMouseLeave?: (datum: ComputedBoxPlotSummary, event: React.MouseEvent<Element>) => void
}

export type BoxPlotCommonProps<RawDatum> = {
    groupBy: PropertyAccessor<RawDatum, string>
    subGroupBy?: PropertyAccessor<RawDatum, string> | null
    groups: string[] | null
    subGroups?: string[] | null
    value: string

    quantiles: number[]

    layout: 'horizontal' | 'vertical'

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

    borderColor: InheritedColorConfig<ComputedBoxPlotSummary>
    borderRadius: number
    borderWidth: number

    medianColor: InheritedColorConfig<ComputedBoxPlotSummary>
    medianWidth: number
    whiskerColor: InheritedColorConfig<ComputedBoxPlotSummary>
    whiskerWidth: number
    whiskerEndWidth: number

    isInteractive: boolean

    tooltip: React.FC<BoxPlotTooltipProps>

    valueFormat?: ValueFormat<number>

    legendLabel?: PropertyAccessor<BoxPlotSummary, string>
    tooltipLabel: PropertyAccessor<BoxPlotSummary, string>

    colorBy: 'group' | 'subGroup'
    colors: OrdinalColorScaleConfig<BoxPlotSummary>
    theme: Theme

    annotations: AnnotationMatcher<ComputedBoxPlotSummary>[]
    legends: LegendProps[]

    renderWrapper?: boolean
}

export type BoxPlotSvgProps<RawDatum extends BoxPlotDatum> = Partial<BoxPlotCommonProps<RawDatum>> &
    DataProps<RawDatum> &
    BoxPlotHandlers<SVGRectElement> &
    SvgDefsAndFill<ComputedBoxPlotSummary> &
    Dimensions &
    ModernMotionProps &
    Partial<{
        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        axisRight: AxisProps | null
        axisTop: AxisProps | null

        boxPlotComponent: React.FC<BoxPlotItemProps<RawDatum>>

        markers: CartesianMarkerProps[]

        layers: BoxPlotLayer<RawDatum>[]

        role: string
        ariaLabel?: React.AriaAttributes['aria-label']
        ariaLabelledBy?: React.AriaAttributes['aria-labelledby']
        ariaDescribedBy?: React.AriaAttributes['aria-describedby']
        isFocusable?: boolean
        boxPlotAriaLabel?: (data: ComputedBoxPlotSummary) => React.AriaAttributes['aria-label']
        boxPlotAriaLabelledBy?: (
            data: ComputedBoxPlotSummary
        ) => React.AriaAttributes['aria-labelledby']
        boxPlotAriaDescribedBy?: (
            data: ComputedBoxPlotSummary
        ) => React.AriaAttributes['aria-describedby']
    }>

export type BoxPlotAnnotationsProps = {
    annotations: AnnotationMatcher<ComputedBoxPlotSummary>[]
    boxPlots: ComputedBoxPlotSummary[]
}
