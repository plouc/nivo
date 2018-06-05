import { LegendDatum, LegendStyle } from "@nivo/legends";

declare module '@nivo/legends' {
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

    export type LegendDirection = 'row' | 'column'

    export type LegendItemDirection =
        | 'left-to-right'
        | 'right-to-left'
        | 'top-to-bottom'
        | 'bottom-to-top'

    export type Box = Partial<{
        bottom: number;
        left: number;
        right: number;
        top: number;
    }>

    export type LegendSymbolShape =
        | 'circle'
        | 'diamond'
        | 'square'
        | 'triangle'

    export type LegendDatum = {
        id: string | number
        label: string | number
        color: string
        fill?: string
    }

    export type LegendStyle = Partial<{
        background: string
        opacity: number
        textColor: string
        symbolBorderWidth: number
        symbolBorderColor: string
    }>

    export type LegendEffect = {
        match: 'hover' | string[]
        style: LegendStyle
    }

    export type LegendProps = LegendStyle & {
        data?: LegendDatum[]

        // position & layout
        anchor: LegendAnchor
        direction: LegendDirection
        justify?: boolean
        padding?: number | Box
        translateX?: number
        translateY?: number

        // items
        itemWidth: number
        itemHeight: number
        itemDirection?: LegendItemDirection
        itemsSpacing?: number
        symbolSize?: number
        symbolSpacing?: number
        symbolShape?: LegendSymbolShape | Function

        effects?: LegendEffect[]

        // interactivity
        onClick?: (datum: LegendDatum) => void
        onMouseEnter?: (datum: LegendDatum) => void
        onMouseLeave?: (datum: LegendDatum) => void
    }
}
