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
    StackOrder,
    StackOffset,
    AreaCurve,
    SvgDefsAndFill,
} from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Scale } from '@nivo/scales'
import { AxisProps } from '@nivo/axes'

declare module '@nivo/stream' {
    export type TooltipFormatter<T> = (value: T) => React.ReactNode
    export type TooltipLabel<T> = (value: T) => string

    export type StackFunc<T> = (
        data: T[]
    ) => {
        0: number
        1: number
        data: T
    }[][]

    export interface Datum {
        color: string
        index: number
        key: string
        value: number
        x: number
        y1: number
        y2: number
    }

    export type DatumToNumber = (datum: Datum) => number

    interface OptionalStreamProps<T> extends SvgDefsAndFill<T>, MotionProps {
        stack: StackFunc<T>
        xScale: Scale
        yScale: Scale

        order: StackOrder
        offsetType: StackOffset
        curve: AreaCurve

        margin: Box

        axisTop: AxisProps | null
        axisRight: AxisProps | null
        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        enableGridX: boolean
        enableGridY: boolean

        colors: OrdinalColorsInstruction
        fillOpacity: number

        borderWidth: number
        borderColor: InheritedColorProp

        enableDots: boolean
        renderDot: StreamDotsItem
        dotPosition: 'start' | 'center' | 'end'
        dotSize: DatumToNumber | number
        dotColor: InheritedColorProp
        dotBorderWidth: DatumToNumber | number
        dotBorderColor: InheritedColorProp

        isInteractive: boolean
        tooltipLabel: TooltipLabel<T>
        tooltipFormat: TooltipFormatter<T> | string
        enableStackTooltip: boolean

        theme: Theme

        legends: LegendProps[]
    }

    export interface StreamProps<T> extends Partial<OptionalStreamProps<T>> {
        data: T[]
        keys: string[]
    }

    export interface StreamDotsItemProps {
        x: number
        y: number
        size: number
        color: string
        borderWidth: number
        borderColor: string
    }

    export class StreamDotsItem extends React.Component<StreamDotsItemProps> {}

    export interface StreamSvgProps<T> extends StreamProps<T>, MotionProps {}

    export class Stream<T> extends React.Component<StreamProps<T> & Dimensions> {}
    export class ResponsiveStream<T> extends React.Component<StreamProps<T>> {}
}
