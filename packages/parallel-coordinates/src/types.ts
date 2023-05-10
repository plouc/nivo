import { AriaAttributes, FunctionComponent } from 'react'
import { Line } from 'd3-shape'
import { Box, Dimensions, MotionProps, LineCurveFactoryId, Theme, ValueFormat } from '@nivo/core'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { AxisProps } from '@nivo/axes'
import { ScaleLinear } from '@nivo/scales'
import { LegendProps } from '@nivo/legends'

type FilterKeys<Datum extends BaseDatum, F> = {
    [K in keyof Datum]: Datum[K] extends F ? K : never
}[keyof Datum]

export type DatumValueKeys<Datum extends BaseDatum> = keyof Pick<Datum, FilterKeys<Datum, number>>
export type DatumGroupKeys<Datum extends BaseDatum> = keyof Pick<
    Datum,
    Exclude<FilterKeys<Datum, string>, 'id'>
>

export interface Variable<Datum extends BaseDatum> {
    id: string
    // use `id` if not specified.
    label?: string
    value: DatumValueKeys<Datum>
    valueFormat?: ValueFormat<number>
    min?: 'auto' | number
    max?: 'auto' | number
    ticksPosition?: 'before' | 'after'
    tickValues?: AxisProps['tickValues']
    tickSize?: AxisProps['tickSize']
    tickPadding?: AxisProps['tickPadding']
    tickRotation?: AxisProps['tickRotation']
    tickFormat?: AxisProps['format']
    legendPosition?: 'start'
    legendOffset?: number
}

export interface VariableWithScale<Datum extends BaseDatum> extends Variable<Datum> {
    scale: ScaleLinear<number>
}

export interface BaseDatum {
    id: string
}

export interface BaseGroup {
    id: string
    // use `id` if not specified.
    label?: string
}

export interface Group extends BaseGroup {
    color: string
}

export type IfGrouped<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined,
    GroupedType,
    NonGroupedType
> = GroupBy extends DatumGroupKeys<Datum> ? GroupedType : NonGroupedType

export interface DataProps<Datum extends BaseDatum> {
    data: readonly Datum[]
    variables: readonly Variable<Datum>[]
}

export interface ComputedDatum<Datum extends BaseDatum> {
    id: string
    index: number
    data: Datum
    color: string
    points: [number, number][]
}

export interface ComputedGroupDatum<Datum extends BaseDatum> extends ComputedDatum<Datum> {
    group: Group
}

export interface TooltipProps<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
> {
    datum: IfGrouped<Datum, GroupBy, ComputedGroupDatum<Datum>, ComputedDatum<Datum>>
    variables: readonly Variable<Datum>[]
}
export type TooltipComponent<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
> = FunctionComponent<TooltipProps<Datum, GroupBy>>

export interface DatumLegend<Datum extends BaseDatum> {
    id: string
    label: string
    color: string
    data: ComputedDatum<Datum>
}

export interface GroupLegend {
    id: string
    label: string
    color: string
    data: Group
}

export type LayerId = 'axes' | 'lines' | 'legends'

// Most of those props are optional for the public API,
// but required internally, using defaults.
export interface CommonProps<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined = undefined
> extends MotionProps {
    groupBy: GroupBy
    groups: IfGrouped<Datum, GroupBy, readonly BaseGroup[], never>

    margin: Box
    layout: 'horizontal' | 'vertical'
    curve: LineCurveFactoryId

    theme: Theme
    colors: OrdinalColorScaleConfig<IfGrouped<Datum, GroupBy, BaseGroup, Datum>>
    lineWidth: number
    lineOpacity: number

    axesTicksPosition: 'before' | 'after'

    isInteractive: boolean
    tooltip: TooltipComponent<Datum, GroupBy>

    renderWrapper: boolean

    legends: LegendProps[]
    forwardLegendData: (
        data: IfGrouped<Datum, GroupBy, GroupLegend[], DatumLegend<Datum>[]>
    ) => void

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export interface CustomLayerProps<Datum extends BaseDatum> {
    computedData: readonly ComputedDatum<Datum>[]
    variables: readonly Variable<Datum>[]
    lineGenerator: Line<[number, number]>
}

export type ParallelCoordinatesCustomLayer<Datum extends BaseDatum> = FunctionComponent<
    CustomLayerProps<Datum>
>

type ParallelCoordinatesLayer<Datum extends BaseDatum> =
    | LayerId
    | ParallelCoordinatesCustomLayer<Datum>

export type ParallelCoordinatesProps<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
> = DataProps<Datum> &
    Dimensions &
    Partial<CommonProps<Datum, GroupBy>> & {
        layers?: ParallelCoordinatesLayer<Datum>[]
        testIdPrefix?: string
    }

export type ParallelCoordinatesCanvasCustomLayer<Datum extends BaseDatum> = (
    ctx: CanvasRenderingContext2D,
    props: CustomLayerProps<Datum>
) => void

type ParallelCoordinatesCanvasLayer<Datum extends BaseDatum> =
    | LayerId
    | ParallelCoordinatesCanvasCustomLayer<Datum>

export type ParallelCoordinatesCanvasProps<Datum extends BaseDatum> = DataProps<Datum> &
    Dimensions &
    Partial<CommonProps<Datum>> & {
        layers: ParallelCoordinatesCanvasLayer<Datum>[]
        pixelRatio?: number
    }
