/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import {
    Dimensions,
    Box,
    Theme,
    MotionProps,
    SvgDefsAndFill,
    CartesianMarkerProps,
} from '@nivo/core'
import { AxisProps, GridValues } from '@nivo/axes'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Scale, BandScale } from '@nivo/scales'

declare module '@nivo/bar' {
    export type Value = string | number

    export interface Data {
        data: object[]
    }

    export interface BarDatum {
        [key: string]: Value
    }

    export type BarDatumWithColor = BarDatum & {
        color: string
    }

    export interface BarExtendedDatum {
        id: Value
        value: number
        index: number
        indexValue: Value
        data: BarDatum
    }

    export type AccessorFunc = (datum: BarDatum) => string

    export type IndexByFunc = (datum: BarDatum) => string | number

    export type LabelFormatter = (label: string | number) => string | number

    export type ValueFormatter = (value: number) => string | number

    type GraphicsContainer = HTMLCanvasElement | SVGElement

    export type BarMouseEventHandler<T = GraphicsContainer> = (
        datum: BarExtendedDatum,
        event: React.MouseEvent<T>
    ) => void

    export type BarTooltipDatum = BarExtendedDatum & { color: string }
    export type TooltipProp = React.FC<BarTooltipDatum>

    export interface BarItemProps {
        data: BarExtendedDatum
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
        onClick: BarMouseEventHandler
        onMouseEnter: BarMouseEventHandler
        onMouseLeave: BarMouseEventHandler
        tooltipFormat: string | ValueFormatter
        tooltip: TooltipProp
        showTooltip: (tooltip: React.ReactNode, event: React.MouseEvent<GraphicsContainer>) => void
        hideTooltip: () => void
        theme: Theme
    }

    export type BarProps = Partial<{
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

        valueScale: Scale
        indexScale: BandScale

        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        axisRight: AxisProps | null
        axisTop: AxisProps | null

        enableGridX: boolean
        gridXValues: GridValues<Value>
        enableGridY: boolean
        gridYValues: GridValues<Value>

        barComponent: React.FC<BarItemProps>

        enableLabel: boolean
        label: string | AccessorFunc
        labelFormat: string | LabelFormatter
        labelLinkColor: InheritedColorConfig<BarDatumWithColor>
        labelSkipWidth: number
        labelSkipHeight: number
        labelTextColor: InheritedColorConfig<BarDatumWithColor>

        colors: OrdinalColorScaleConfig
        borderColor: InheritedColorConfig<BarDatumWithColor>
        borderRadius: number
        borderWidth: number
        theme: Theme

        isInteractive: boolean
        tooltipFormat: string | ValueFormatter
        tooltip: TooltipProp

        legends: ({ dataFrom: 'indexes' | 'keys' } & LegendProps)[]

        markers: CartesianMarkerProps[]
    }>

    export type BarLayerType = 'grid' | 'axes' | 'bars' | 'markers' | 'legends'
    export type BarCustomLayer = (props: any) => React.ReactNode
    export type Layer = BarLayerType | BarCustomLayer

    export type BarSvgProps = Data &
        BarProps &
        MotionProps &
        SvgDefsAndFill<BarDatum> &
        Partial<{
            layers: Layer[]
            onClick: BarMouseEventHandler<SVGElement>
            onMouseEnter: BarMouseEventHandler<SVGElement>
            onMouseLeave: BarMouseEventHandler<SVGElement>
            role: string
        }>

    export class Bar extends React.Component<BarSvgProps & Dimensions> {}
    export class ResponsiveBar extends React.Component<BarSvgProps> {}

    export type BarCanvasProps = Data &
        BarProps &
        Partial<{
            onClick: BarMouseEventHandler
            onMouseEnter: BarMouseEventHandler
            onMouseLeave: BarMouseEventHandler
            pixelRatio: number
        }>

    export class BarCanvas extends React.Component<BarCanvasProps & Dimensions> {}
    export class ResponsiveBarCanvas extends React.Component<BarCanvasProps> {}
}
