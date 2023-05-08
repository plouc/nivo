import { AriaAttributes } from 'react'
import { Box, Dimensions, MotionProps, LineCurveFactoryId, Theme, ValueFormat } from '@nivo/core'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { AxisProps } from '@nivo/axes'

type KeysForValues<D extends BaseDatum> = {
    [K in keyof D]: D[K] extends number ? K : never
}[keyof D]

type DatumValues<D extends BaseDatum> = Pick<D, KeysForValues<D>>

export interface VariableSpec<D extends BaseDatum> {
    id: string
    // Use `id` if not specified.
    label?: string
    value: keyof DatumValues<D>
    valueFormat?: ValueFormat<number>
    min: 'auto' | number
    max: 'auto' | number
    ticksPosition: 'before' | 'after'
    tickValues: AxisProps['tickValues']
    tickSize: AxisProps['tickSize']
    tickPadding: AxisProps['tickPadding']
    tickRotation: AxisProps['tickRotation']
    tickFormat: AxisProps['format']
    legendPosition: 'start'
    legendOffset: number
}

export interface BaseDatum {
    id: string
}

interface DataProps<D extends BaseDatum> {
    data: readonly D[]
    variables: readonly VariableSpec<D>[]
}

export interface ComputedDatum<D extends BaseDatum> {
    id: D['id']
    data: D
    color: string
    points: [number, number][]
}

export type LayerId = 'axes' | 'lines'

// Most of those props are optional for the public API,
// but required internally, using defaults.
export interface CommonProps<D extends BaseDatum> extends MotionProps {
    margin: Box
    layout: 'horizontal' | 'vertical'
    curve: LineCurveFactoryId
    groupBy?: string

    theme: Theme
    colors: OrdinalColorScaleConfig<D>
    lineWidth: number
    lineOpacity: number

    axesTicksPosition: 'before' | 'after'

    layers: LayerId[]

    isInteractive: boolean
    // tooltip: TooltipComponent<D>

    renderWrapper: boolean

    // forwardLegendData: (data: LegendDatum<D>[]) => void

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type ParallelCoordinatesProps<D extends BaseDatum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> & {
        // layers?: WaffleHtmlLayer<D>[]
        // cellComponent?: CellComponent<D>
        motionStagger?: number
        testIdPrefix?: string
    }

export type ParallelCoordinatesCanvasProps<D extends BaseDatum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> & {
        // legends?: LegendProps[]
        pixelRatio?: number
    }
