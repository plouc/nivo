/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'

declare module '@nivo/funnel' {
    export interface FunnelDatum {
        id: string | number
        value: number
        label?: string
    }

    export interface PartProps {
        data: FunnelDatum
        width: number
        height: number
        color: string
        fillOpacity: number
        borderWidth: number
        borderOpacity: number
    }

    export enum FunnelLayerType {
        Parts = 'parts',
    }
    export interface FunnelCustomLayerProps {
        parts: PartProps[]
    }
    export type FunnelCustomLayer = (props: FunnelCustomLayerProps) => React.ReactNode
    export type Layer = FunnelLayerType | FunnelCustomLayer

    export interface FunnelProps {
        data: FunnelDatum[]

        margin?: Box

        groupMode?: 'stacked' | 'grouped'
        direction?: 'horizontal' | 'vertical'
        interpolation?: 'smooth' | 'linear'
        spacing?: number
        shapeContinuity?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction

        borderWidth?: number
        borderColor?: InheritedColorProp<PartProps>
        borderOpacity?: number

        layers?: Layer[]

        isInteractive?: boolean
    }

    export interface FunnelSvgProps extends FunnelProps, MotionProps {}

    export class Funnel extends React.Component<FunnelSvgProps & Dimensions> {}
    export class ResponsiveFunnel extends React.Component<FunnelSvgProps> {}
}
