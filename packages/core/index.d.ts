import * as React from 'react'
import { Interpolation, SpringConfig } from '@react-spring/web'
import { CurveFactory } from 'd3-shape'
import { ComponentType } from 'react'

export type DatumValue = string | number | Date

export interface Dimensions {
    height: number
    width: number
}

export interface Point {
    x: number
    y: number
}

export interface AlignBox extends Dimensions, Point {}

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
export function alignBox(box: AlignBox, container: AlignBox, alignment: BoxAlign): [number, number]

export type GetColor<T> = (datum: T) => string
export type Colors = string[] | string
export interface ColorProps<T> {
    colors?: Colors
    colorBy?: string | GetColor<T>
}

/**
 * Required text properties + optional ones.
 */
export type TextStyle = {
    fontFamily: Exclude<React.CSSProperties['fontFamily'], undefined>
    fontSize: Exclude<React.CSSProperties['fontSize'], undefined>
    fill: string
    outlineWidth: number
    outlineColor: string
} & Partial<React.CSSProperties>

export type CompleteTheme = {
    background: string
    text: TextStyle
    axis: {
        domain: {
            line: Partial<React.CSSProperties>
        }
        ticks: {
            line: Partial<React.CSSProperties>
            text: TextStyle
        }
        legend: {
            text: TextStyle
        }
    }
    grid: {
        line: Partial<React.CSSProperties>
    }
    crosshair: {
        line: {
            stroke: string
            strokeWidth: number
            strokeOpacity: number
            strokeDasharray: string
        }
    }
    legends: {
        hidden: {
            symbol: Partial<{
                fill: string
                opacity: number
            }>
            text: TextStyle
        }
        title: {
            text: TextStyle
        }
        text: TextStyle
        ticks: {
            line: Partial<React.CSSProperties>
            text: TextStyle
        }
    }
    labels: {
        text: Partial<React.CSSProperties>
    }
    markers: {
        lineColor: string
        lineStrokeWidth: number
        textColor: string
        fontSize: string | 0
        text: TextStyle
    }
    dots: {
        text: TextStyle
    }
    tooltip: {
        container: Partial<React.CSSProperties>
        basic: Partial<React.CSSProperties>
        chip: Partial<React.CSSProperties>
        table: Partial<React.CSSProperties>
        tableCell: Partial<React.CSSProperties>
        tableCellValue: Partial<React.CSSProperties>
    }
    annotations: {
        text: {
            fill: string
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<React.CSSProperties, 'fill'>>
        link: {
            stroke: string
            strokeWidth: number
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<React.CSSProperties, 'stroke' | 'strokeWidth'>>
        outline: {
            stroke: string
            strokeWidth: number
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<React.CSSProperties, 'stroke' | 'strokeWidth'>>
        symbol: {
            fill: string
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<React.CSSProperties, 'fill'>>
    }
}

/**
 * Required properties without inheritance.
 *
 * The theme supports defining styles at the top level
 * (for text for example), which are then used to populate
 * similar nested properties.
 *
 * For example `text` will be merged with `axis.ticks.text`,
 * we use this approach so that it's simpler to define global styles.
 */
export type ThemeWithoutInheritance = {
    background: CompleteTheme['background']
    text: CompleteTheme['text']
    axis: {
        domain: {
            line: CompleteTheme['axis']['domain']['line']
        }
        ticks: {
            line: CompleteTheme['axis']['ticks']['line']
            text: Partial<CompleteTheme['axis']['ticks']['text']>
        }
        legend: Partial<{
            text: Partial<CompleteTheme['axis']['legend']['text']>
        }>
    }
    grid: {
        line: CompleteTheme['grid']['line']
    }
    crosshair: {
        line: CompleteTheme['crosshair']['line']
    }
    legends: {
        hidden: {
            symbol: CompleteTheme['legends']['hidden']['symbol']
            text: Partial<CompleteTheme['legends']['hidden']['text']>
        }
        title: {
            text: Partial<CompleteTheme['legends']['title']['text']>
        }
        text: Partial<CompleteTheme['legends']['text']>
        ticks: {
            line: CompleteTheme['legends']['ticks']['line']
            text: Partial<CompleteTheme['legends']['ticks']['text']>
        }
    }
    labels: {
        text: Partial<CompleteTheme['labels']['text']>
    }
    markers: Partial<CompleteTheme['markers']>
    dots: {
        text: Partial<CompleteTheme['dots']['text']>
    }
    tooltip: CompleteTheme['tooltip']
    annotations: {
        text: Partial<CompleteTheme['annotations']['text']>
        link: CompleteTheme['annotations']['link']
        outline: CompleteTheme['annotations']['outline']
        symbol: CompleteTheme['annotations']['symbol']
    }
}

export type Theme = Partial<{
    background: CompleteTheme['background']
    text: Partial<CompleteTheme['text']>
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
    crosshair: Partial<{
        line: Partial<CompleteTheme['crosshair']['line']>
    }>
    legends: Partial<{
        hidden: Partial<{
            symbol: CompleteTheme['legends']['hidden']['symbol']
            text: CompleteTheme['legends']['hidden']['text']
        }>
        title: Partial<{
            text: Partial<CompleteTheme['legends']['title']['text']>
        }>
        text: Partial<CompleteTheme['legends']['text']>
        ticks: Partial<{
            line: Partial<CompleteTheme['legends']['ticks']['line']>
            text: Partial<CompleteTheme['legends']['ticks']['text']>
        }>
    }>
    labels: Partial<{
        text: Partial<CompleteTheme['labels']['text']>
    }>
    markers: Partial<CompleteTheme['markers']>
    dots: Partial<{
        text: Partial<CompleteTheme['dots']['text']>
    }>
    tooltip: Partial<CompleteTheme['tooltip']>
    annotations: Partial<{
        text: Partial<CompleteTheme['annotations']['text']>
        link: Partial<CompleteTheme['annotations']['link']>
        outline: Partial<CompleteTheme['annotations']['outline']>
        symbol: Partial<CompleteTheme['annotations']['symbol']>
    }>
}>

export function useTheme(): CompleteTheme
export function usePartialTheme(theme?: Theme): CompleteTheme

export type MotionProps = Partial<{
    animate: boolean
    motionConfig: string | SpringConfig
}>

export function useMotionConfig(): {
    animate: boolean
    config: SpringConfig
}

export type SvgFillMatcher<T> = (datum: T) => boolean
export interface SvgDefsAndFill<T> {
    defs?: {
        id: string
        [key: string]: any
    }[]
    fill?: { id: string; match: Record<string, unknown> | SvgFillMatcher<T> | '*' }[]
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

export function useAnimatedPath(path: string): Interpolation<string>

// ------------------------------------------------------------------------
// Patterns & Gradients
// ------------------------------------------------------------------------

export type GradientColor = {
    offset: number
    color: string
    opacity?: number
}

export function linearGradientDef(
    id: string,
    colors: GradientColor[],
    options?: React.SVGProps<SVGLinearGradientElement>
): {
    id: string
    type: 'linearGradient'
    colors: GradientColor[]
} & React.SVGProps<SVGLinearGradientElement>

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

export type PatternDotsDef = {
    id: string
    type: 'patternDots'
    color?: string
    background?: string
    size?: number
    padding?: number
    stagger?: boolean
}
export function patternDotsDef(
    id: string,
    options?: Omit<PatternDotsDef, 'id' | 'type'>
): PatternDotsDef
export function PatternDots(props: Omit<PatternDotsDef, 'type'>): JSX.Element

export type PatternSquaresDef = Omit<PatternDotsDef, 'type'> & {
    type: 'patternSquares'
}
export function patternSquaresDef(
    id: string,
    options?: Omit<PatternSquaresDef, 'id' | 'type'>
): PatternSquaresDef
export function PatternSquares(props: Omit<PatternSquaresDef, 'type'>): JSX.Element

export type PatternLinesDef = {
    id: string
    type: 'patternLines'
    spacing?: number
    rotation?: number
    background?: string
    color?: string
    lineWidth?: number
}
export function patternLinesDef(
    id: string,
    options?: Omit<PatternLinesDef, 'id' | 'type'>
): PatternLinesDef
export function PatternLines(props: Omit<PatternLinesDef, 'type'>): JSX.Element

export type Def = LinearGradientDef | PatternDotsDef | PatternSquaresDef | PatternLinesDef

export type DefsProps = {
    defs: Def[]
}

export function Defs(props: DefsProps): JSX.Element

// ------------------------------------------------------------------------
// Motion
// ------------------------------------------------------------------------

export const defaultAnimate = true

type MotionDefaultProps = {
    animate: true
    config: 'default'
}
export const motionDefaultProps: MotionDefaultProps

type DefaultMargin = {
    top: 0
    right: 0
    bottom: 0
    left: 0
}
export const defaultMargin: DefaultMargin

export function degreesToRadians(degrees: number): number
export function radiansToDegrees(radians: number): number
export function absoluteAngleDegrees(degrees: number): number
export function normalizeAngle(degrees: number): number
export function clampArc(startAngle: number, endAngle: number, length?: number): [number, number]

type Accessor<T extends keyof U, U> = T extends string ? U[T] : never

export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T

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

export function useMeasure(): [
    React.RefObject<HTMLDivElement>,
    { left: number; top: number; width: number; height: number }
]

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
export const SvgWrapper: SvgWrapperType

interface ContainerProps {
    theme?: Theme
    renderWrapper?: boolean
    isInteractive?: boolean
    animate?: boolean
    motionConfig?: string | SpringConfig
}
type ContainerType = (props: React.PropsWithChildren<ContainerProps>) => JSX.Element
export const Container: ContainerType

type ResponsiveWrapperType = (props: {
    children: (dimensions: { width: number; height: number }) => JSX.Element
}) => JSX.Element
export const ResponsiveWrapper: ResponsiveWrapperType

interface ThemeProviderProps {
    theme?: Theme
}

type ThemeProviderType = (props: React.PropsWithChildren<ThemeProviderProps>) => JSX.Element
export const ThemeProvider: ThemeProviderType

export function getDistance(x1: number, y1: number, x2: number, y2: number): number
export function getAngle(x1: number, y1: number, x2: number, y2: number): number

export function positionFromAngle(
    angle: number,
    distance: number
): {
    x: number
    y: number
}

export type ValueFormat<Value, Context = void> =
    | string // d3 formatter
    // explicit formatting function
    | (Context extends void ? (value: Value) => string : (value: Value, context: Context) => string)
export function getValueFormatter<Value, Context = void>(
    format?: ValueFormat<Value, Context>
): Context extends void ? (value: Value) => string : (value: Value, context: Context) => string
export function useValueFormatter<Value, Context = void>(
    format?: ValueFormat<Value, Context>
): Context extends void ? (value: Value) => string : (value: Value, context: Context) => string

export type PropertyAccessor<Datum, Value> =
    // path to use with `lodash.get()`
    | string
    // explicit accessor function
    | ((datum: Datum) => Value)
export function getPropertyAccessor<Datum, Value>(
    accessor: PropertyAccessor<Datum, Value>
): (datum: Datum) => Value
export function usePropertyAccessor<Datum, Value>(
    accessor: PropertyAccessor<Datum, Value>
): (datum: Datum) => Value

export function getRelativeCursor(
    element: Element,
    event: React.MouseEvent | React.TouchEvent
): [number, number]
export function isCursorInRect(
    x: number,
    y: number,
    width: number,
    height: number,
    cursorX: number,
    cursorY: number
): boolean

export interface CartesianMarkerProps<V extends DatumValue = DatumValue> {
    axis: 'x' | 'y'
    value: V
    legend?: string
    legendOrientation?: 'horizontal' | 'vertical'
    legendPosition?: BoxAlign
    lineStyle?: Partial<React.CSSProperties>
    textStyle?: Partial<React.CSSProperties>
}
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
type CartesianMarkersType = <X extends DatumValue = DatumValue, Y extends DatumValue = DatumValue>(
    props: CartesianMarkersProps<X, Y>
) => JSX.Element
export const CartesianMarkers: CartesianMarkersType

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

// Curve factories compatible d3 line shape generator
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

// Curve factories compatible d3 area shape generator
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

export type ClosedCurveFactoryId =
    | 'basisClosed'
    | 'cardinalClosed'
    | 'catmullRomClosed'
    | 'linearClosed'
export const closedCurvePropKeys: ClosedCurveFactoryId[]

export const curveFromProp: (interpolation: CurveFactoryId) => CurveFactory

export const useCurveInterpolation: (interpolation: CurveFactoryId) => CurveFactory

export interface DotsItemSymbolProps {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}
export type DotsItemSymbolComponent = React.FunctionComponent<DotsItemSymbolProps>

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
export const DotsItem: React.FunctionComponent<DotsItemProps>

export type ExtractProps<TComponent> = TComponent extends ComponentType<infer TProps>
    ? TProps
    : never
