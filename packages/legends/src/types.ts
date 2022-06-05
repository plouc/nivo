import * as React from 'react'
import { CompleteTheme, ValueFormat } from '@nivo/core'
import { AnyContinuousColorScale } from '@nivo/colors'

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

export type SymbolShape = 'circle' | 'diamond' | 'square' | 'triangle' | 'invertedTriangle'

export type SymbolProps = {
    id: string | number
    x: number
    y: number
    size: number
    fill: string
    opacity?: number
    borderWidth?: number
    borderColor?: string
}

export type SymbolShapeSvg = SymbolShape | React.FC<SymbolProps>
export type SymbolShapeCanvas =
    | SymbolShape
    | ((ctx: CanvasRenderingContext2D, props: SymbolProps) => void)

export type LegendSymbolProps = Partial<{
    symbolShape: SymbolShapeSvg | SymbolShapeCanvas
    symbolSize: number
    symbolSpacing: number
    symbolBorderWidth: number
    symbolBorderColor: string
}>

type InteractivityProps = Partial<
    Record<
        'onClick' | 'onMouseEnter' | 'onMouseLeave',
        (datum: LegendDatum, event: React.MouseEvent<SVGRectElement>) => void
    > & {
        toggleSerie: (id: LegendDatum['id']) => void
    }
>

export type LegendContainerProps = {
    containerWidth: number
    containerHeight: number
}

export type LegendPositionProps = {
    anchor: LegendAnchor
    translateX?: number
    translateY?: number
}

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

export type ThemeProps = {
    theme: CompleteTheme
}

export type LegendDirection = 'column' | 'row'

export type LegendItemDirection =
    | 'left-to-right'
    | 'right-to-left'
    | 'top-to-bottom'
    | 'bottom-to-top'

export type LegendDatum = {
    id: string | number
    label: string | number
    symbol?: null | SymbolShape
    hidden?: boolean
    color?: string
    fill?: string
}

type CommonLegendProps = {
    data?: LegendDatum[]
    direction: LegendDirection
    padding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
    justify?: boolean

    title?: string

    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemTextColor?: string
    itemBackground?: string
    itemOpacity?: number
    itemsSpacing?: number

    effects?: EffectProps[]
}

// intended for user-facing APIs across nivo packages
export type BoxLegendSpec = LegendPositionProps &
    CommonLegendProps &
    LegendSymbolProps &
    Omit<InteractivityProps, 'toggleSerie'> & {
        toggleSerie?: boolean
    }

// intended for props passed to the legend-rendering function
export type BoxLegendProps = Omit<BoxLegendSpec, 'toggleSerie'> &
    LegendContainerProps & {
        data: LegendDatum[]
        toggleSerie?: (id: LegendDatum['id']) => void
    }

export type BoxLegendItemProps = {
    data: LegendDatum

    x: number
    y: number
    width: number
    height: number

    textColor?: string
    background?: string
    opacity?: number

    direction?: LegendItemDirection
} & Pick<CommonLegendProps, 'justify' | 'effects'> &
    LegendSymbolProps &
    InteractivityProps

export type ContinuousColorsLegendSpec = {
    scale: AnyContinuousColorScale
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

// intended for user-facing APIs across nivo packages
export type ContinuousColorsLegendProps = LegendPositionProps & ContinuousColorsLegendSpec
