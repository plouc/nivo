import * as React from 'react'
import { Interpolation, SpringConfig } from '@react-spring/web'
import { CurveFactory } from 'd3-shape'
import { ComponentType } from 'react'

declare module '@nivo/core' {
    // src/types.ts
    export type DatumValue = string | number | Date

    // src/types.ts
    export interface Dimensions {
        height: number
        width: number
    }

    // src/components/dots/types.ts
    export interface Point {
        x: number
        y: number
    }

    // not used so removed
    export interface AlignBox extends Dimensions, Point {}

    // src/types.ts
    export type Margin = {
        bottom: number
        left: number
        right: number
        top: number
    }

    // src/types.ts
    export type Box = Partial<Margin>

    // src/types.ts
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

    // not used, removed
    export const boxAlignments: BoxAlign[]

    // src/lib/cartesian/utils.ts
    export function alignBox(
        box: AlignBox,
        container: AlignBox,
        alignment: BoxAlign
    ): [number, number]

    // removed, color functionality provided by @nivo/colors
    export type GetColor<T> = (datum: T) => string
    // removed, color functionality provided by @nivo/colors
    export type Colors = string[] | string
    // removed, color functionality provided by @nivo/colors
    export interface ColorProps<T> {
        colors?: Colors
        colorBy?: string | GetColor<T>
    }

    // src/theming/types.ts
    // (code below shortened)
    export type CompleteTheme = {}

    // src/theming/types.ts
    // (code below shortened)
    export type Theme = Partial<Pick<CompleteTheme, 'background' | 'fontFamily' | 'fontSize' | 'textColor'>>

    // src/theming/hooks.ts
    export function useTheme(): CompleteTheme

    // incorporated into src/theming/context.tsx
    export function usePartialTheme(theme?: Theme): CompleteTheme

    // not used, removed
    export type MotionProps = Partial<{
        animate: boolean
        motionDamping: number
        motionStiffness: number
    }>

    // src/motion/types.ts
    export type ModernMotionProps = Partial<{
        animate: boolean
        motionConfig: string | SpringConfig
    }>

    // src/motion/hooks.ts
    export function useMotionConfig(): {
        animate: boolean
        config: SpringConfig
        springConfig: {
            stiffness: number
            damping: number
        }
    }

    // src/components/defs/types.ts
    export type SvgFillMatcher<T> = (datum: T) => boolean

    // src/components/defs/types.ts
    export interface SvgDefsAndFill<T> {
        defs?: {
            id: string
            [key: string]: any
        }[]
        fill?: { id: string; match: Record<string, unknown> | SvgFillMatcher<T> | '*' }[]
    }

    // src/props/blendMode.ts
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

    // src/props.stacks.ts
    export type StackOrder = 'ascending' | 'descending' | 'insideOut' | 'none' | 'reverse'

    // src/props/stacks.ts
    export type StackOffset = 'expand' | 'diverging' | 'none' | 'silhouette' | 'wiggle'

    // src/props/curve.ts (as AreaCurveInterpolatorId)
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

    // src/motion/hooks.ts
    export function useAnimatedPath(path: string): Interpolation<string>

    // ------------------------------------------------------------------------
    // Patterns & Gradients
    // ------------------------------------------------------------------------

    // src/components/defs/gradients/types.ts
    export type GradientColor = {
        offset: number
        color: string
        opacity?: number
    }

    // src/components/defs/gradients/LinearGradient.tsx
    export function linearGradientDef(
        id: string,
        colors: GradientColor[],
        options?: React.SVGProps<SVGLinearGradientElement>
    ): {
        id: string
        type: 'linearGradient'
        colors: GradientColor[]
    } & React.SVGProps<SVGLinearGradientElement>

    // src/components/defs/gradient/types.ts
    export type LinearGradientDef = {
        id: string
        type: 'linearGradient'
        colors: {
            offset: number
            color: string
            opacity?: number
        }[]
        gradientTransform?: string
    }

    // src/components/defs/patterns/types.ts
    export type PatternDotsDef = {
        id: string
        type: 'patternDots'
        color?: string
        background?: string
        size?: number
        padding?: number
        stagger?: boolean
    }

    // src/components/defs/patterns/PatternDots.tsx
    export function patternDotsDef(
        id: string,
        options?: Omit<PatternDotsDef, 'id' | 'type'>
    ): PatternDotsDef
    export function PatternDots(props: Omit<PatternDotsDef, 'type'>): JSX.Element

    // src/components/defs/patterns/types.ts
    export type PatternSquaresDef = Omit<PatternDotsDef, 'type'> & {
        type: 'patternSquares'
    }
    // src/components/defs/patterns/PatternSquare.tsx
    export function patternSquaresDef(
        id: string,
        options?: Omit<PatternSquaresDef, 'id' | 'type'>
    ): PatternSquaresDef

    // src/components/defs/patterns/PatternSquare.tsx
    export function PatternSquares(props: Omit<PatternSquaresDef, 'type'>): JSX.Element

    // src/components/defs/patterns/types.ts
    export type PatternLinesDef = {
        id: string
        type: 'patternLines'
        spacing?: number
        rotation?: number
        background?: string
        color?: string
        lineWidth?: number
    }

    // src/components/defs/patterns/PatternLines.tsx
    export function patternLinesDef(
        id: string,
        options?: Omit<PatternLinesDef, 'id' | 'type'>
    ): PatternLinesDef

    // src/components/defs/patterns/PatternLines.tsx
    export function PatternLines(props: Omit<PatternLinesDef, 'type'>): JSX.Element

    // src/components/defs/types.ts as DefSpec
    export type Def = LinearGradientDef | PatternDotsDef | PatternSquaresDef | PatternLinesDef

    // src/components/defs/types.ts as DefSpec
    export type DefsProps = {
        defs: Def[]
    }

    // src/components/defs/defs.tsx
    export function Defs(props: DefsProps): JSX.Element

    // ------------------------------------------------------------------------
    // Motion
    // ------------------------------------------------------------------------

    // src/motion/props.ts
    export const defaultAnimate = true

    // src/motion/props.ts
    export const defaultMotionStiffness = 90

    // src/motion/props.ts
    export const defaultMotionDamping = 15

    // removed, type not needed
    type MotionDefaultProps = {
        animate: true
        stiffness: 90
        damping: 15
        config: 'default'
    }

    // src/motion/props.ts
    export const motionDefaultProps: MotionDefaultProps

    // removed, not needed
    type DefaultMargin = {
        top: 0
        right: 0
        bottom: 0
        left: 0
    }

    // src/props.margin.ts
    export const defaultMargin: DefaultMargin

    // src/lib/polar/utils.ts
    export function degreesToRadians(degrees: number): number

    // src/lib/polar/utils.ts
    export function radiansToDegrees(radians: number): number

    // removed, not needed
    export function absoluteAngleDegrees(degrees: number): number

    // src/lib/polar/utils.ts
    export function normalizeAngle(degrees: number): number

    // src/lib/polar/utils.ts
    export function clampArc(
        startAngle: number,
        endAngle: number,
        length?: number
    ): [number, number]

    // removed
    type Accessor<T extends keyof U, U> = T extends string ? U[T] : never

    //src/lib/types.ts
    export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T

    // src/hooks.ts
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

    // src/hooks.ts
    export function useMeasure(): [
        React.RefObject<HTMLDivElement>,
        { left: number; top: number; width: number; height: number }
    ]

    // src/components/types.ts
    type SvgWrapperType = (
        props: React.PropsWithChildren<{
            width: number
            height: number
            margin: Margin
            defs?: any
            role?: string
            ariaLabel?: React.AriaAttributes['aria-label']
            ariaLabelledBy?: React.AriaAttributes['aria-labelledby']
            ariaDescribedBy?: React.AriaAttributes['aria-describedby']
            isFocusable?: boolean
        }>
    ) => JSX.Element

    // src/components/SvgWrapper.tsx
    export const SvgWrapper: SvgWrapperType

    // src/components/types.ts
    interface ContainerProps {
        theme?: Theme
        renderWrapper?: boolean
        isInteractive?: boolean
        animate?: boolean
        motionStiffness?: number
        motionDamping?: number
        motionConfig?: string | SpringConfig
    }

    // removed, not needed
    type ContainerType = (props: React.PropsWithChildren<ContainerProps>) => JSX.Element

    // src/component/Container.tsx
    export const Container: ContainerType

    // src/components/types.ts
    type ResponsiveWrapperType = (props: {
        children: (dimensions: { width: number; height: number }) => JSX.Element
    }) => JSX.Element

    // src/components/ResponsiveWrapper.tsx
    export const ResponsiveWrapper: ResponsiveWrapperType

    // src/theming/context.tsx
    interface ThemeProviderProps {
        theme?: Theme
    }

    // src/theming/context.tsx
    type ThemeProviderType = (props: React.PropsWithChildren<ThemeProviderProps>) => JSX.Element

    // src/theming/context.tsx
    export const ThemeProvider: ThemeProviderType

    // /src/lib/interactivity/detect.ts
    export function getDistance(x1: number, y1: number, x2: number, y2: number): number

    // /src/lib/interactivity/detect.ts
    export function getAngle(x1: number, y1: number, x2: number, y2: number): number

    // src/lib/polar/utils.ts
    export function positionFromAngle(
        angle: number,
        distance: number
    ): {
        x: number
        y: number
    }

    // src/lib/types.ts
    export type ValueFormat<Value, Context = void> =
        | string // d3 formatter
        // explicit formatting function
        | (Context extends void
              ? (value: Value) => string
              : (value: Value, context: Context) => string)

    // src/lib/values.ts
    export function getValueFormatter<Value, Context = void>(
        format?: ValueFormat<Value, Context>
    ): Context extends void ? (value: Value) => string : (value: Value, context: Context) => string

    // src/hooks.ts
    export function useValueFormatter<Value, Context = void>(
        format?: ValueFormat<Value, Context>
    ): Context extends void ? (value: Value) => string : (value: Value, context: Context) => string

    // src/lib/types.ts
    export type PropertyAccessor<Datum, Value> =
        // path to use with `lodash.get()`
        | string
        // explicit accessor function
        | ((datum: Datum) => Value)

    // src/lib/properties.ts
    export function getPropertyAccessor<Datum, Value>(
        accessor: PropertyAccessor<Datum, Value>
    ): (datum: Datum) => Value

    // src/lib/properties.ts
    export function usePropertyAccessor<Datum, Value>(
        accessor: PropertyAccessor<Datum, Value>
    ): (datum: Datum) => Value

    // src/lib/interactivity/index.ts
    export function getRelativeCursor(element: Element, event: React.MouseEvent): [number, number]

    // src/lib/interactivity/detect.ts
    export function isCursorInRect(
        x: number,
        y: number,
        width: number,
        height: number,
        cursorX: number,
        cursorY: number
    ): boolean

    // src/components/cartesian/markers/types.ts
    export interface CartesianMarkerProps<V extends DatumValue = DatumValue> {
        axis: 'x' | 'y'
        value: V
        legend?: string
        legendOrientation?: 'horizontal' | 'vertical'
        legendPosition?: BoxAlign
        lineStyle?: Partial<React.CSSProperties>
        textStyle?: Partial<React.CSSProperties>
    }

    // src/components/cartesian/markers/types.ts
    interface CartesianMarkersProps<
        X extends DatumValue = DatumValue,
        Y extends DatumValue = DatumValue
    > {
        width: number
        height: number
        xScale: (value: X) => number
        yScale: (value: Y) => number
        markers: CartesianMarkerProps<X | Y>[]
    }

    // src/components/cartesian/markers/types.ts
    type CartesianMarkersType = <
        X extends DatumValue = DatumValue,
        Y extends DatumValue = DatumValue
    >(
        props: CartesianMarkersProps<X, Y>
    ) => JSX.Element
    export const CartesianMarkers: CartesianMarkersType

    // src/props/curve.ts
    export type CurveFactoryId =
        | 'basis'
        | 'basisClosed'
        | 'basisOpen'
        | 'bundle'
        | 'cardinal'
        | 'cardinalClosed'
        | 'cardinalOpen'
        | 'catmullRom'
        | 'catmullRomClosed'
        | 'catmullRomOpen'
        | 'linear'
        | 'linearClosed'
        | 'monotoneX'
        | 'monotoneY'
        | 'natural'
        | 'step'
        | 'stepAfter'
        | 'stepBefore'

    // src/props/curve.ts
    export type LineCurveFactoryId =
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

    // src/props/curve.ts
    export type AreaCurveFactoryId =
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

    // src/props/curve.ts
    export type ClosedCurveFactoryId =
        | 'basisClosed'
        | 'cardinalClosed'
        | 'catmullRomClosed'
        | 'linearClosed'
    // removed
    export const closedCurvePropKeys: ClosedCurveFactoryId[]

    // src/props.curve.ts
    export const curveFromProp: (interpolation: CurveFactoryId) => CurveFactory

    // src/hooks.ts
    export const useCurveInterpolation: (interpolation: CurveFactoryId) => CurveFactory

    // src/components/dots/types.ts
    export interface DotsItemSymbolProps {
        size: number
        color: string
        borderWidth: number
        borderColor: string
    }

    // src/components/dots/types.ts
    export type DotsItemSymbolComponent = React.FunctionComponent<DotsItemSymbolProps>

    // src/components/dots/types.ts
    export interface DotsItemProps<D = any> {
        datum: D
        x: number
        y: number
        size: number
        color: string
        borderWidth: number
        borderColor: string
        label?: string | number
        labelTextAnchor?: 'start' | 'middle' | 'end'
        labelYOffset?: number
        symbol?: DotsItemSymbolComponent
    }

    // src/components/dots/DotsItem.ts
    export const DotsItem: React.FunctionComponent<DotsItemProps>

    // src/components/types.ts
    export type ExtractProps<TComponent> = TComponent extends ComponentType<infer TProps>
        ? TProps
        : never
}
