import * as React from 'react'
import { CompleteTheme, ValueFormat } from '@nivo/core'
import { AnyContinuousColorScale, InheritedColorConfig } from '@nivo/colors'

export type LegendContainerProps = {
    containerWidth: number
    containerHeight: number
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

export type LegendPositionProps = {
    anchor: LegendAnchor
    translateX?: number
    translateY?: number
}

export type LegendDirection = 'column' | 'row'

export type ThemeProps = {
    theme: CompleteTheme
}

/** Box Legends **/

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
    symbolBorderColor: InheritedColorConfig<LegendDatum>
}>

type InteractivityProps = Partial<
    Record<
        'onClick' | 'onMouseEnter' | 'onMouseLeave',
        (datum: LegendDatum, event: React.MouseEvent<SVGRectElement>) => void
    > & {
        toggleSerie: (id: LegendDatum['id']) => void
    }
>

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
    size?: number
}
export type LegendData = LegendDatum[]

type CommonLegendProps = {
    data?: LegendData
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
        data: LegendData
        toggleSerie?: boolean | InteractivityProps['toggleSerie']
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

/** Continuous Colors **/
// legends with continuous color shading, ticks, and tick labels

export type ContinuousColorsLegendInnerSpec = {
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
export type ContinuousColorsLegendSpec = LegendPositionProps & ContinuousColorsLegendInnerSpec

// intended for props passed to the legend-rendering function
export type ContinuousColorsLegendProps = LegendContainerProps & ContinuousColorsLegendSpec

/** Size legends (like a box legend, but with symbols of varying sizes) **/

export type SizeLegendInnerSpec = Omit<CommonLegendProps, 'effects'> &
    LegendSymbolProps & {
        scale: AnyContinuousColorScale
        ticks?: number | number[]
        tickFormat?: ValueFormat<number>
    }

// intended for user-facing APIs across nivo packages
export type SizeLegendSpec = LegendPositionProps & SizeLegendInnerSpec

// intended for props passed to the legend-rendering function
export type SizeLegendProps = LegendContainerProps &
    SizeLegendSpec & {
        data: LegendData
    }
