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
    export interface Position {
        x: number
        y: number
    }

    export interface BoxPosition extends Position {
        x0: number
        x1: number
        y0: number
        y1: number
    }

    export interface FunnelDatum {
        id: string | number
        value: number
        label?: string
    }

    export interface Part extends BoxPosition {
        data: FunnelDatum
        width: number
        height: number
        color: string
        fillOpacity: number
        borderWidth: number
        borderColor: string
        borderOpacity: number
        labelColor: string
        formattedValue: number | string
        isCurrent: boolean
        points: Position[]
        areaPoints: BoxPosition[]
        borderPoints: Position[]
    }

    export type PartEventHandler<E = HTMLElement> = (part: Part, event: React.MouseEvent<E>) => void

    export interface PartWithHandlers extends Part {
        onMouseEnter?: () => void
        onMouseLeave?: () => void
        onMouseMove?: () => void
        onClick?: () => void
    }

    export interface SeparatorProps extends Omit<BoxPosition, 'x' | 'y'> {
        partId: string | number
    }

    export enum FunnelLayerType {
        Separators = 'separators',
        Parts = 'parts',
        Labels = 'labels',
        Annotations = 'annotations',
    }
    export interface FunnelCustomLayerProps {
        width: number
        height: number
        parts: PartWithHandlers[]
        areaGenerator: (points: BoxPosition[]) => void
        borderGenerator: (points: Position[]) => void
        beforeSeparators: SeparatorProps[]
        afterSeparators: SeparatorProps[]
        setCurrentPartId: (id: string | number) => void
    }
    export type FunnelCustomLayer = (props: FunnelCustomLayerProps) => React.ReactNode
    export type Layer = FunnelLayerType | FunnelCustomLayer

    export interface FunnelProps {
        data: FunnelDatum[]

        margin?: Box

        direction?: 'horizontal' | 'vertical'
        interpolation?: 'smooth' | 'linear'
        spacing?: number
        shapeBlending?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction

        borderWidth?: number
        borderColor?: InheritedColorProp<Omit<Part, 'borderColor' | 'labelColor'>>
        borderOpacity?: number

        enableLabel?: boolean
        labelColor?: InheritedColorProp<Omit<Part, 'labelColor'>>

        enableBeforeSeparators?: boolean
        beforeSeparatorLength?: number
        beforeSeparatorOffset?: number
        enableAfterSeparators?: boolean
        afterSeparatorLength?: number
        afterSeparatorOffset?: number

        layers?: Layer[]

        isInteractive?: boolean
        currentPartSizeExtension?: number
        currentBorderWidth?: number
        onMouseEnter?: PartEventHandler
        onMouseLeave?: PartEventHandler
        onMouseMove?: PartEventHandler
        onClick?: PartEventHandler

        animate?: boolean
    }

    export interface FunnelSvgProps extends FunnelProps, MotionProps {}

    export class Funnel extends React.Component<FunnelSvgProps & Dimensions> {}
    export class ResponsiveFunnel extends React.Component<FunnelSvgProps> {}
}
