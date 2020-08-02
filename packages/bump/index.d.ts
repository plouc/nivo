/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, MouseEvent } from 'react'
import { Dimensions, Box, Theme, MotionProps, SvgDefsAndFill, CssMixBlendMode } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'

declare module '@nivo/bump' {
    type SerieDerivedProp<Serie, T> = (serie: Serie) => T

    export interface BumpInputDatum {
        x: string | number
        y: string | number
        [key: string]: any
    }

    export interface BumpInputSerie {
        id: string
        data: BumpInputDatum[]
        [key: string]: any
    }

    export type BumpLabelFunction = (serie: BumpInputSerie) => string
    export type BumpLabel = false | string | BumpLabelFunction

    export type BumpMouseHandler = (serie: BumpInputSerie, event: MouseEvent<any>) => void

    export interface BumpProps {
        data: BumpInputSerie[]

        margin?: Box

        align?: AreaBumpAlign
        interpolation?: AreaBumpInterpolation
        xOuterPadding?: number
        yOuterPadding?: number
        xPadding?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction

        startLabel?: BumpLabel
        startLabelPadding?: number
        startLabelTextColor?: InheritedColorProp
        endLabel?: BumpLabel
        endLabelPadding?: number
        endLabelTextColor?: InheritedColorProp

        pointSize?: number
        activePointSize?: number
        inactivePointSize?: number
        pointColor?: InheritedColorProp
        pointBorderWidth?: number
        activePointBorderWidth?: number
        inactivePointBorderWidth?: number
        pointBorderColor?: InheritedColorProp

        enableGridX?: boolean
        enableGridY?: boolean
        axisTop?: any
        axisRight?: any
        axisBottom?: any
        axisLeft?: any

        isInteractive?: boolean
        onMouseEnter?: BumpMouseHandler
        onMouseMove?: BumpMouseHandler
        onMouseLeave?: BumpMouseHandler
        onClick?: BumpMouseHandler
        tooltip?: any
    }

    export type BumpSvgProps = BumpProps & MotionProps
    export class Bump extends Component<BumpSvgProps & Dimensions> {}
    export class ResponsiveBump extends Component<BumpSvgProps> {}

    export interface AreaBumpInputDatum {
        x: string | number
        y: number
        [key: string]: any
    }

    export interface AreaBumpInputSerie {
        id: string
        data: AreaBumpInputDatum[]
        [key: string]: any
    }

    export interface AreaBumpAreaPoint {
        x: number
        y0: number
        y1: number
    }

    export interface AreaBumpPoint {
        x: number
        y: number
        height: number
        data: AreaBumpInputDatum
    }

    export interface AreaBumpComputedSerie extends AreaBumpInputSerie {
        color: string
        style: {
            fillOpacity: number
            borderWidth: number
            borderColor: string
            borderOpacity: number
        }
        points: AreaBumpPoint[]
        areaPoints: AreaBumpAreaPoint[]
    }

    export type AreaBumpAlign = 'start' | 'middle' | 'end'
    export type AreaBumpInterpolation = 'smooth' | 'linear'

    export type AreaBumpLayerType = 'grid' | 'axes' | 'labels' | 'areas'

    export type AreaBumpLabelFunction = (serie: AreaBumpComputedSerie) => string
    export type AreaBumpLabel = false | string | AreaBumpLabelFunction

    export type AreaBumpMouseHandler = (
        serie: AreaBumpComputedSerie,
        event: MouseEvent<any>
    ) => void

    export interface AreaBumpProps {
        data: AreaBumpInputSerie[]

        margin?: Box

        align?: AreaBumpAlign
        interpolation?: AreaBumpInterpolation
        spacing?: number
        xPadding?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction
        blendMode?: CssMixBlendMode
        fillOpacity?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        activeFillOpacity?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        inactiveFillOpacity?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        borderWidth?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        activeBorderWidth?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        inactiveBorderWidth?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        borderColor?: InheritedColorProp
        borderOpacity?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        activeBorderOpacity?: number | SerieDerivedProp<AreaBumpInputSerie, number>
        inactiveBorderOpacity?: number | SerieDerivedProp<AreaBumpInputSerie, number>

        startLabel?: AreaBumpLabel
        startLabelPadding?: number
        startLabelTextColor?: InheritedColorProp
        endLabel?: AreaBumpLabel
        endLabelPadding?: number
        endLabelTextColor?: InheritedColorProp

        enableGridX?: boolean
        axisTop?: any
        axisBottom?: any

        isInteractive?: boolean
        onMouseEnter?: AreaBumpMouseHandler
        onMouseMove?: AreaBumpMouseHandler
        onMouseLeave?: AreaBumpMouseHandler
        onClick?: AreaBumpMouseHandler
        tooltip?: any
    }

    export type AreaBumpSvgProps = AreaBumpProps & MotionProps & SvgDefsAndFill<BumpInputDatum>
    export class AreaBump extends Component<AreaBumpSvgProps & Dimensions> {}
    export class ResponsiveAreaBump extends Component<AreaBumpSvgProps> {}
}
