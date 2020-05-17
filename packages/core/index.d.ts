import * as React from 'react'
import { number } from 'prop-types'

declare module '@nivo/core' {
    export type DatumValue = string | number | Date

    export interface Dimensions {
        height: number
        width: number
    }

    export type Box = Partial<{
        bottom: number
        left: number
        right: number
        top: number
    }>
    export type BoxAlign =
        | 'center'
        | 'top-left'
        | 'top'
        | 'top-right'
        | 'right'
        | 'bottom-right'
        | 'bottom'
        | 'bottom-left'
        | 'left'
    export const boxAlignments: BoxAlign[]
    export function alignBox(box: Box, container: Box, alignment: BoxAlign): [number, number]

    export type GetColor<T> = (datum: T) => string
    export type Colors = string[] | string
    export interface ColorProps<T> {
        colors?: Colors
        colorBy?: string | GetColor<T>
    }

    export type Theme = Partial<{
        crosshair: Partial<{
            line: Partial<{
                stroke: string
                strokeWidth: number
                strokeOpacity: number
                strokeDasharray: string
            }>
        }>
        background: string
        axis: Partial<{
            domain: Partial<{
                line: Partial<React.CSSProperties>
            }>
            ticks: Partial<{
                line: Partial<React.CSSProperties>
                text: Partial<React.CSSProperties>
            }>
            legend: Partial<{
                text: Partial<React.CSSProperties>
            }>
        }>
        grid: Partial<{
            line: Partial<React.CSSProperties>
        }>
        legends: Partial<{
            text: Partial<React.CSSProperties>
        }>
        labels: Partial<{
            text: Partial<React.CSSProperties>
        }>
        markers: Partial<{
            lineColor: string
            lineStrokeWidth: number
            textColor: string
            fontSize: string | 0
        }>
        dots: Partial<{
            text: Partial<React.CSSProperties>
        }>
        tooltip: Partial<{
            container: Partial<React.CSSProperties>
            basic: Partial<React.CSSProperties>
            chip: Partial<React.CSSProperties>
            table: Partial<React.CSSProperties>
            tableCell: Partial<React.CSSProperties>
        }>
    }>

    export type MotionProps = Partial<{
        animate: boolean
        motionDamping: number
        motionStiffness: number
    }>

    export type SvgFillMatcher<T> = (datum: T) => boolean
    export interface SvgDefsAndFill<T> {
        defs?: Array<{
            id: string
            [key: string]: any
        }>
        fill?: Array<{ id: string; match: object | SvgFillMatcher<T> | '*' }>
    }

    export interface CartesianMarkerProps {
        axis: 'x' | 'y'
        value: string | number | Date
        legend?: string
        lineStyle?: Partial<React.CSSProperties>
        textStyle?: Partial<React.CSSProperties>
    }

    export type CssMixBlendMode =
        | 'normal'
        | 'multiply'
        | 'screen'
        | 'overlay'
        | 'darken'
        | 'lighten'
        | 'color-dodge'
        | 'color-burn'
        | 'hard-light'
        | 'soft-light'
        | 'difference'
        | 'exclusion'
        | 'hue'
        | 'saturation'
        | 'color'
        | 'luminosity'

    export type StackOrder = 'ascending' | 'descending' | 'insideOut' | 'none' | 'reverse'

    export type StackOffset = 'expand' | 'diverging' | 'none' | 'silhouette' | 'wiggle'

    export type AreaCurve =
        | 'basis'
        | 'cardinal'
        | 'catmullRom'
        | 'linear'
        | 'monotoneX'
        | 'monotoneY'
        | 'natural'
        | 'step'
        | 'stepAfter'
        | 'stepBefore'

    export type DataFormatter = (value: DatumValue) => string | number

    export function useValueFormatter(formatter?: DataFormatter | string): DataFormatter
}
