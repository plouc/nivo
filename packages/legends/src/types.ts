import * as React from 'react'
import { ScaleDiverging, ScaleQuantize, ScaleSequential } from 'd3-scale'
import { ValueFormat } from '@nivo/core'
import { Theme } from '@nivo/theming'
import { SymbolProps } from './svg/symbols/types'

/**
 * This can be used to add effect on legends on interaction.
 */
type EffectProps = {
    on: 'hover'
    style: Partial<{
        itemTextColor: string
        itemBackground: string
        itemOpacity: number
        symbolSize: number
        symbolBorderWidth: number
        symbolBorderColor: string
    }>
}

type SymbolShape = 'circle' | 'diamond' | 'square' | 'triangle'

type BoxLegendSymbolProps = Partial<{
    symbolShape: SymbolShape | React.FC<SymbolProps>
    symbolSize: number
    symbolSpacing: number
    symbolBorderWidth: number
    symbolBorderColor: string
}>

type InteractivityProps = Partial<
    Record<
        'onClick' | 'onMouseEnter' | 'onMouseLeave',
        (datum: Datum, event: React.MouseEvent<SVGRectElement>) => void
    > & {
        toggleSerie: (id: Datum['id']) => void
    }
>

export type LegendAnchor =
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left'
    | 'center'

export type LegendDirection = 'column' | 'row'

export type LegendItemDirection =
    | 'left-to-right'
    | 'right-to-left'
    | 'top-to-bottom'
    | 'bottom-to-top'

export type Datum = {
    id: string | number
    label: string | number
    hidden?: boolean
    color?: string
    fill?: string
}

type CommonLegendProps = {
    data?: Datum[]
    direction: LegendDirection
    padding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
    justify?: boolean

    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemTextColor?: string
    itemBackground?: string
    itemOpacity?: number
    itemsSpacing?: number

    effects?: EffectProps[]
}

export type LegendProps = {
    translateX?: number
    translateY?: number
    anchor: LegendAnchor
    toggleSerie?: boolean
} & CommonLegendProps &
    BoxLegendSymbolProps &
    Omit<InteractivityProps, 'toggleSerie'>

export type BoxLegendSvgProps = {
    containerWidth: number
    containerHeight: number
} & Omit<LegendProps, 'toggleSerie'> &
    Required<Pick<LegendProps, 'data'>> &
    Omit<InteractivityProps, 'toggleSerie'> &
    Partial<{
        toggleSerie: boolean | InteractivityProps['toggleSerie']
    }>

export type LegendSvgProps = {
    x: number
    y: number
} & CommonLegendProps &
    Required<Pick<CommonLegendProps, 'data'>> &
    BoxLegendSymbolProps &
    InteractivityProps

export type LegendSvgItemProps = {
    data: Datum

    x: number
    y: number
    width: number
    height: number

    textColor?: string
    background?: string
    opacity?: number

    direction?: LegendItemDirection
} & Pick<CommonLegendProps, 'justify' | 'effects'> &
    BoxLegendSymbolProps &
    InteractivityProps

export type LegendCanvasProps = {
    containerWidth: number
    containerHeight: number
    translateX?: number
    translateY?: number
    anchor: LegendAnchor

    symbolSize?: number
    symbolSpacing?: number

    theme: Theme
} & Required<Pick<CommonLegendProps, 'data'>> &
    Pick<
        CommonLegendProps,
        | 'direction'
        | 'padding'
        | 'justify'
        | 'itemsSpacing'
        | 'itemWidth'
        | 'itemHeight'
        | 'itemDirection'
        | 'itemTextColor'
    >

export interface ContinuousColorsLegendProps {
    scale: ScaleSequential<string> | ScaleDiverging<string> | ScaleQuantize<string>
    ticks?: number | number[]
    length?: number
    thickness?: number
    direction?: LegendDirection
    borderWidth?: number
    borderColor?: string
    tickPosition?: 'before' | 'after'
    tickSize?: number
    tickSpacing?: number
    tickOverlap?: boolean
    tickFormat?: ValueFormat<number>
    title?: string
    titleAlign?: 'start' | 'middle' | 'end'
    titleOffset?: number
}

export type AnchoredContinuousColorsLegendProps = ContinuousColorsLegendProps & {
    anchor: LegendAnchor
    translateX?: number
    translateY?: number
    containerWidth: number
    containerHeight: number
}
