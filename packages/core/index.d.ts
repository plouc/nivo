import * as React from 'react'
import { OpaqueInterpolation, SpringConfig } from 'react-spring'

declare module '@nivo/core' {
    export type DatumValue = string | number | Date

    export interface Dimensions {
        height: number
        width: number
    }

    export type Margin = {
        bottom: number
        left: number
        right: number
        top: number
    }

    export type Box = Partial<Margin>
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

    export type CompleteTheme = {
        crosshair: {
            line: {
                stroke: string
                strokeWidth: number
                strokeOpacity: number
                strokeDasharray: string
            }
        }
        background: string
        fontFamily: string
        fontSize: number
        textColor: string
        axis: {
            domain: {
                line: Partial<React.CSSProperties>
            }
            ticks: {
                line: Partial<React.CSSProperties>
                text: Partial<React.CSSProperties>
            }
            legend: {
                text: Partial<React.CSSProperties>
            }
        }
        grid: {
            line: Partial<React.CSSProperties>
        }
        legends: {
            text: Partial<React.CSSProperties>
        }
        labels: {
            text: Partial<React.CSSProperties>
        }
        markers: {
            lineColor: string
            lineStrokeWidth: number
            textColor: string
            fontSize: string | 0
            text: Partial<React.CSSProperties>
        }
        dots: {
            text: Partial<React.CSSProperties>
        }
        tooltip: {
            container: Partial<React.CSSProperties>
            basic: Partial<React.CSSProperties>
            chip: Partial<React.CSSProperties>
            table: Partial<React.CSSProperties>
            tableCell: Partial<React.CSSProperties>
        }
        annotations: {
            text: Partial<React.CSSProperties>
            link: Partial<React.CSSProperties>
            outline: Partial<React.CSSProperties>
            symbol: Partial<React.CSSProperties>
        }
    }

    export type Theme = Partial<
        Pick<CompleteTheme, 'background' | 'fontFamily' | 'fontSize' | 'textColor'> & {
            crosshair: Partial<{
                line: Partial<CompleteTheme['crosshair']['line']>
            }>
            axis: Partial<{
                domain: Partial<{
                    line: Partial<CompleteTheme['axis']['domain']['line']>
                }>
                ticks: Partial<{
                    line: Partial<CompleteTheme['axis']['ticks']['line']>
                    text: Partial<CompleteTheme['axis']['ticks']['text']>
                }>
                legend: Partial<{
                    text: Partial<CompleteTheme['axis']['legend']['text']>
                }>
            }>
            grid: Partial<{
                line: Partial<CompleteTheme['grid']['line']>
            }>
            legends: Partial<{
                text: Partial<CompleteTheme['legends']['text']>
            }>
            labels: Partial<{
                text: Partial<CompleteTheme['labels']['text']>
            }>
            markers: Partial<CompleteTheme['markers']>
            dots: Partial<{
                text: Partial<CompleteTheme['dots']['text']>
            }>
            tooltip: Partial<CompleteTheme['tooltip']>
            annotations: Partial<CompleteTheme['annotations']>
        }
    >

    export function useTheme(): CompleteTheme
    export function usePartialTheme(theme?: Theme): CompleteTheme

    export type MotionProps = Partial<{
        animate: boolean
        motionDamping: number
        motionStiffness: number
    }>

    export type ModernMotionProps = Partial<{
        animate: boolean
        motionConfig: string | SpringConfig
    }>

    export function useMotionConfig(): {
        animate: boolean
        config: SpringConfig
        springConfig: {
            stiffness: number
            damping: number
        }
    }

    export type SvgFillMatcher<T> = (datum: T) => boolean
    export interface SvgDefsAndFill<T> {
        defs?: {
            id: string
            [key: string]: any
        }[]
        fill?: { id: string; match: Record<string, unknown> | SvgFillMatcher<T> | '*' }[]
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

    export function useAnimatedPath(path: string): OpaqueInterpolation<string>
    export function useValueFormatter(formatter?: DataFormatter | string): DataFormatter

    export type LinearGradientDef = {
        id: string
        type: 'linearGradient'
        colors: {
            offset: number
            color: string
            opacity?: number
        }[]
    }

    export type PatternDotsDef = {
        id: string
        type: 'patternDots'
        color?: string
        background?: string
        size?: number
        padding?: number
        stagger?: boolean
    }

    export type PatternSquaresDef = Omit<PatternDotsDef, 'type'> & {
        type: 'patternDots'
    }

    export type PatternLinesDef = {
        id: string
        type: 'patternLines'
        spacing?: number
        rotation?: number
        background?: string
        color?: string
        lineWidth?: number
    }

    export type Def = LinearGradientDef | PatternDotsDef | PatternSquaresDef | PatternLinesDef

    export type DefsProps = {
        defs: Def[]
    }

    export declare const defaultAnimate = true
    export declare const defaultMotionStiffness = 90
    export declare const defaultMotionDamping = 15

    export declare const motionDefaultProps = {
        animate: true,
        stiffness: 90,
        damping: 15,
        config: 'default',
    }

    export declare const defaultMargin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }

    export function PatternLines(props: Omit<PatternLinesDef, 'type'>): JSX.Element
    export function PatternSquares(props: Omit<PatternSquaresDef, 'type'>): JSX.Element
    export function PatternDots(props: Omit<PatternDotsDef, 'type'>): JSX.Element

    export function Defs(props: DefsProps): JSX.Element

    export function degreesToRadians(degrees: number): number
    export function radiansToDegrees(radians: number): number

    type Accessor<T, U> = T extends string ? U[T] : never

    export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T

    export function getAccessorFor<RawDatum, T>(
        directive: string | number | DatumPropertyAccessor<RawDatum, T>
    ): DatumPropertyAccessor<RawDatum, T>

    export function useDimensions(
        width: number,
        height: number,
        margin?: Box
    ): {
        margin: Margin
        innerWidth: number
        innerHeight: number
        outerWidth: number
        outerHeight: number
    }

    export const SvgWrapper = (
        props: React.PropsWithChildren<{
            width: number
            height: number
            margin: Margin
            defs?: any
            role?: string
        }>
    ) => JSX.Element

    interface ContainerProps {
        theme?: Theme
        renderWrapper?: boolean
        isInteractive?: boolean
        animate?: boolean
        motionStiffness?: number
        motionDamping?: number
        motionConfig?: string | SpringConfig
    }

    export const Container = (props: React.PropsWithChildren<ContainerProps>) => JSX.Element

    export const ResponsiveWrapper = (props: {
        children: (dimensions: { width: number; height: number }) => JSX.Element
    }) => JSX.Element

    export function getDistance(x1: number, y1: number, x2: number, y2: number): number
    export function getAngle(x1: number, y1: number, x2: number, y2: number): number
}
