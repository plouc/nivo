import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps, ColorProps, GetColor, SvgDefsAndFill } from '@nivo/core'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/bar' {
    export interface Data {
        data: object[]
    }

    export interface BarDatum {
        [key: string]: string | number
    }

    export type BarDatumWithColor = BarDatum & {
        color: string
    }

    export interface BarExtendedDatum {
        id: string | number
        value: number
        index: number
        indexValue: string | number
        color: string
        data: BarDatum
    }

    export type AccessorFunc = (datum: BarDatum) => string

    export type IndexByFunc = (datum: BarDatum) => string | number

    export type LabelFormatter = (label: string | number) => string | number

    export type ValueFormatter = (value: number) => string | number

    export type BarClickHandler = (datum: BarExtendedDatum, event: React.MouseEvent<HTMLCanvasElement>) => void

    export type TooltipProp = React.StatelessComponent<BarExtendedDatum>

    export interface BarItemProps {
        data: {
            id: string | number
            value: number
            indexValue: string | number
        }
        x: number
        y: number
        width: number
        height: number
        color: string
        borderRadius: number
        borderWidth: number
        borderColor: string
        label: string
        shouldRenderLabel: boolean
        labelColor: string
        onClick: BarClickHandler
        tooltipFormat: string | ValueFormatter
        tooltip: TooltipProp
        showTooltip: (tooltip: React.ReactNode, event: React.MouseEvent<HTMLCanvasElement>) => void
        hideTooltip: () => void
        theme: Theme
    }

    export type BarProps = ColorProps<BarDatum> & Partial<{
        indexBy: string | IndexByFunc
        keys: string[]

        groupMode: 'stacked' | 'grouped'
        layout: 'horizontal' | 'vertical'
        reverse: boolean

        innerPadding: number
        minValue: number | 'auto'
        margin: Box
        maxValue: number | 'auto'
        padding: number

        // axes & grid
        axisBottom: Axis
        axisLeft: Axis
        axisRight: Axis
        axisTop: Axis
        enableGridX: boolean
        enableGridY: boolean

        // customization
        barComponent: React.StatelessComponent<BarItemProps>

        // labels
        enableLabel: boolean
        label: string | AccessorFunc
        labelFormat: string | LabelFormatter
        labelLinkColor: string | GetColor<BarDatumWithColor>
        labelSkipWidth: number
        labelSkipHeight: number
        labelTextColor: string | GetColor<BarDatumWithColor>

        // theming
        borderRadius: number
        borderWidth: number
        theme: Theme

        // interactivity
        isInteractive: boolean
        tooltipFormat: string | ValueFormatter
        tooltip: TooltipProp

        legends: Array<{ dataFrom: 'indexes' | 'keys' } & LegendProps>
    }>

    export type Axis = Partial<{
        format: string | LabelFormatter
        legend: string
        legendOffset: number
        legendPosition: 'start' | 'center' | 'end'
        orient: 'top' | 'right' | 'bottom' | 'left'
        tickPadding: number
        tickRotation: number
        tickSize: number
        tickValues: number | string[] | number[]
    }>

    export type BarSvgProps = Data
        & BarProps
        & MotionProps
        & SvgDefsAndFill<BarDatum>
        & Partial<{
            onClick: (datum: BarExtendedDatum, event: React.MouseEvent<SVGRectElement>) => void
        }>

    export class Bar extends React.Component<BarSvgProps & Dimensions> {}
    export class ResponsiveBar extends React.Component<BarSvgProps> {}

    export type BarCanvasProps = Data & BarProps & Partial<{
        onClick: BarClickHandler
        pixelRatio: number
    }>

    export class BarCanvas extends React.Component<BarCanvasProps & Dimensions> {}
    export class ResponsiveBarCanvas extends React.Component<BarCanvasProps> {}
}
