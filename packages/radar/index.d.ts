/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from 'react'
import { Box, MotionProps, Dimensions, Theme } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/radar' {
    interface CommonRadarProps<Datum = any> {
        data: object[]
        keys: Array<string | number>
        indexBy: number | string | Function
        maxValue?: 'auto' | Function

        margin?: Box

        curve?: string

        borderWidth?: number
        borderColor?: InheritedColorProp

        gridLevels?: number
        gridShape?: 'circular' | 'linear'
        gridLabel?: Function
        gridLabelOffset?: number

        enableDots?: boolean
        dotSymbol?: Function
        dotSize?: number
        dotColor?: InheritedColorProp
        dotBorderWidth?: number
        dotBorderColor?: InheritedColorProp
        enableDotLabel?: boolean
        dotLabel?: string | Function
        dotLabelFormat?: string | Function
        dotLabelYOffset?: number

        colors?: OrdinalColorsInstruction
        fillOpacity?: number

        isInteractive?: boolean
        tooltipFormat?: string | Function

        legends: LegendProps[]
    }

    export type RadarProps = CommonRadarProps & MotionProps

    export class Radar extends Component<RadarProps & Dimensions> {}
    export class ResponsiveRadar extends Component<RadarProps> {}
}
