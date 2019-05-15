/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, MouseEvent } from 'react'
import { Dimensions, Box, Theme, MotionProps, CssMixBlendMode } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'

declare module '@nivo/bump' {
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

    export type AreaBumpProps = {
        data: AreaBumpInputSerie[]

        margin?: Box

        align?: AreaBumpAlign
        interpolation?: AreaBumpInterpolation
        spacing?: number
        xPadding?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction
        blendMode?: CssMixBlendMode
        fillOpacity?: number
        activeFillOpacity?: number
        inactiveFillOpacity?: number
        borderWidth?: number
        activeBorderWidth?: number
        inactiveBorderWidth?: number
        borderColor?: InheritedColorProp
        borderOpacity?: number
        activeBorderOpacity?: number
        inactiveBorderOpacity?: number

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

    export type AreaBumpSvgProps = AreaBumpProps & MotionProps

    export class AreaBump extends Component<AreaBumpSvgProps & Dimensions> {}
    export class ResponsiveAreaBump extends Component<AreaBumpSvgProps> {}
}
