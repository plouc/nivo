/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from 'react'
import { Box, MotionProps, Dimensions, Theme, CssMixBlendMode } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/radar' {
    export type GridLabelProps = {
        id: string
        anchor: 'start' | 'middle' | 'end'
        angle: number
    }
    export type PointData = {
        index: number
        key: string
        value: number
        color: string
    }
    export type DotSymbolProps = {
        size: number
        color: InheritedColorConfig<PointData>
        borderWidth: number
        borderColor: InheritedColorConfig<PointData>
    }

    type IndexByCustomFunction<D = any> = (datum: D) => string | number
    export type CustomGridLabel = React.FC<GridLabelProps>
    export type CustomDotSymbol = React.FC<DotSymbolProps>
    export type CustomDotLabel = (...args: any[]) => React.ReactNode
    export type CustomFormatter = (...args: any[]) => React.ReactNode

    interface CommonRadarProps<Datum = any> {
        data: Datum[]
        keys: (string | number)[]
        indexBy: number | string | IndexByCustomFunction<Datum>
        maxValue?: 'auto' | number

        margin?: Box

        curve?: string

        borderWidth?: number
        borderColor?: InheritedColorConfig<Record<'color' | 'key', string>>

        gridLevels?: number
        gridShape?: 'circular' | 'linear'
        gridLabel?: CustomGridLabel
        gridLabelOffset?: number

        enableDots?: boolean
        dotSymbol?: CustomDotSymbol
        dotSize?: number
        dotColor?: InheritedColorConfig<PointData>
        dotBorderWidth?: number
        dotBorderColor?: InheritedColorConfig<PointData>
        enableDotLabel?: boolean
        dotLabel?: string | CustomDotLabel
        dotLabelFormat?: string | CustomFormatter
        dotLabelYOffset?: number

        theme?: Theme
        colors?: OrdinalColorScaleConfig
        fillOpacity?: number
        blendMode?: CssMixBlendMode

        isInteractive?: boolean
        tooltipFormat?: string | CustomFormatter

        legends?: LegendProps[]
        role?: string
    }

    export type RadarProps = CommonRadarProps & MotionProps

    export class Radar extends Component<RadarProps & Dimensions> {}
    export class ResponsiveRadar extends Component<RadarProps> {}
}
