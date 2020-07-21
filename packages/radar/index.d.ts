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
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/radar' {
    type IndexByCustomFunctiono<D = any> = (datum: D) => string | number
    type GridLabelCustomFunction = (...args: any[]) => string | JSX.Element
    type CustomDotSymbol = (...args: any[]) => React.ReactNode
    type CustomDotLabel = (...args: any[]) => React.ReactNode
    type CustomFormatter = (...args: any[]) => React.ReactNode

    interface CommonRadarProps<Datum = any> {
        data: object[]
        keys: (string | number)[]
        indexBy: number | string | IndexByCustomFunctiono<Datum>
        maxValue?: 'auto' | number

        margin?: Box

        curve?: string

        borderWidth?: number
        borderColor?: InheritedColorProp

        gridLevels?: number
        gridShape?: 'circular' | 'linear'
        gridLabel?: GridLabelCustomFunction
        gridLabelOffset?: number

        enableDots?: boolean
        dotSymbol?: CustomDotSymbol
        dotSize?: number
        dotColor?: InheritedColorProp
        dotBorderWidth?: number
        dotBorderColor?: InheritedColorProp
        enableDotLabel?: boolean
        dotLabel?: string | CustomDotLabel
        dotLabelFormat?: string | CustomFormatter
        dotLabelYOffset?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction
        fillOpacity?: number
        blendMode?: CssMixBlendMode

        isInteractive?: boolean
        tooltipFormat?: string | CustomFormatter

        legends: LegendProps[]
    }

    export type RadarProps = CommonRadarProps & MotionProps

    export class Radar extends Component<RadarProps & Dimensions> {}
    export class ResponsiveRadar extends Component<RadarProps> {}
}
