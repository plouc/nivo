import { AriaAttributes, FunctionComponent, MouseEvent, WheelEvent } from 'react'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import {
    Box,
    ValueFormat,
    SvgDefsAndFill,
    MotionProps,
    PropertyAccessor,
    Dimensions,
} from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { type Rect, RectLabelsProps, RectTransitionMode, RectNodeComponent } from '@nivo/rects'
import { HierarchyNode } from 'd3-hierarchy'

export interface DefaultIcicleDatum {
    id: string
    value?: number
    children?: DefaultIcicleDatum[]
}

export type NodesSortingFunction<Datum> = (
    a: HierarchyNode<Datum>,
    b: HierarchyNode<Datum>
) => number
export type NodesSorting<Datum> = 'input' | 'asc' | 'desc' | NodesSortingFunction<Datum>

export type IcicleZoomFunction = (nodePath: string | null) => void

export type IcicleLayerId = 'rects' | 'labels'

export type IcicleChartContext<Context = Record<string, unknown>> = {
    zoom: IcicleZoomFunction
} & Context

export interface IcicleCommonCustomLayerProps<Datum> {
    nodes: readonly ComputedDatum<Datum>[]
    zoom: IcicleZoomFunction
}

export type IcicleCustomLayerProps<Datum> = IcicleCommonCustomLayerProps<Datum>
export type IcicleCustomLayer<Datum> = FunctionComponent<IcicleCustomLayerProps<Datum>>
export type IcicleLayer<Datum> = IcicleLayerId | IcicleCustomLayer<Datum>

export interface DataProps<Datum> {
    data: Datum
}

export interface ComputedDatum<Datum> {
    id: string
    path: string
    // Contains own id plus all ancestors' ids, starting from the root
    pathComponents: string[]
    color: string
    // contains the raw node's data
    data: Omit<Datum, 'children'>
    depth: number
    // defined when using patterns or gradients
    fill?: string
    formattedValue: string
    height: number
    parent?: ComputedDatum<Datum>
    percentage: number
    rect: Rect
    value: number
    maxDescendantDepth: number
}

export interface ComputedDatumWithLabel<Datum> extends ComputedDatum<Datum> {
    label: {
        label: string
    }
}

// - top: Root at the top, children cascade downward, standard icicle.
// - right: Root at the right, children grow to the left, right-to-left icicle.
// - bottom: Root at the bottom, children grow upward, flame chart.
// - left: Root at the left, children grow to the right, left-to-right icicle.
export type IcicleOrientation = 'top' | 'right' | 'bottom' | 'left'

export type IcicleZoomMode = 'lateral' | 'global'

export type IcicleCommonProps<Datum, Context = Record<string, unknown>> = {
    identity: PropertyAccessor<Datum, string>
    sort: NodesSorting<Datum>
    value: PropertyAccessor<Datum, number>
    valueFormat?: ValueFormat<number>
    orientation: IcicleOrientation
    margin: Box
    gapX: number
    gapY: number
    theme: PartialTheme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<Datum>, 'color' | 'fill'>>
    colorBy: 'id' | 'depth'
    inheritColorFromParent: boolean
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<ComputedDatum<Datum>>
    borderRadius: number
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<Datum>>
    enableLabels: boolean
    isInteractive: boolean
    enableZooming: boolean
    zoomMode: IcicleZoomMode
    tooltip: FunctionComponent<ComputedDatum<Datum>>
    context: Context
    renderWrapper: boolean
} & Omit<RectLabelsProps<ComputedDatum<Datum>>, 'uid' | 'labelComponent'>

export type MouseHandler<Datum, E = Element> = (
    datum: ComputedDatum<Datum>,
    event: MouseEvent<E>
) => void

export type WheelHandler<Datum, E = Element> = (
    datum: ComputedDatum<Datum>,
    event: WheelEvent<E>
) => void

export type EventHandlers<Datum, E = Element> = Partial<{
    onClick: MouseHandler<Datum, E>
    onMouseEnter: MouseHandler<Datum, E>
    onMouseLeave: MouseHandler<Datum, E>
    onMouseMove: MouseHandler<Datum, E>
    onWheel: WheelHandler<Datum, E>
    onContextMenu: MouseHandler<Datum, E>
}>

export interface IcicleSvgExtraProps<Datum> {
    layers: readonly IcicleLayer<Datum>[]
    nodeComponent: RectNodeComponent<ComputedDatum<Datum>>
    labelComponent: RectLabelsProps<ComputedDatum<Datum>>['labelComponent']
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    animateOnMount: boolean
    rectsTransitionMode: RectTransitionMode
    labelsTransitionMode: RectTransitionMode
    role: string
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

export type IcicleSvgProps<Datum, Context = Record<string, unknown>> = DataProps<Datum> &
    Dimensions &
    Partial<IcicleCommonProps<Datum, Context>> &
    Partial<IcicleSvgExtraProps<Datum>> &
    EventHandlers<Datum> &
    SvgDefsAndFill<ComputedDatum<Datum>>
export type IcicleSvgPropsWithDefaults<
    Datum,
    Context = Record<string, unknown>,
> = DataProps<Datum> &
    Dimensions &
    IcicleCommonProps<Datum, Context> &
    IcicleSvgExtraProps<Datum> &
    EventHandlers<Datum> &
    SvgDefsAndFill<ComputedDatum<Datum>>

export interface IcicleHtmlExtraProps<Datum> {
    layers: readonly IcicleLayer<Datum>[]
    nodeComponent: RectNodeComponent<ComputedDatum<Datum>>
    labelComponent: RectLabelsProps<ComputedDatum<Datum>>['labelComponent']
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    animateOnMount: boolean
    rectsTransitionMode: RectTransitionMode
    labelsTransitionMode: RectTransitionMode
    role: string
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

export type IcicleHtmlProps<Datum, Context = Record<string, unknown>> = DataProps<Datum> &
    Dimensions &
    Partial<IcicleCommonProps<Datum, Context>> &
    Partial<IcicleHtmlExtraProps<Datum>> &
    EventHandlers<Datum>
export type IcicleHtmlPropsWithDefaults<
    Datum,
    Context = Record<string, unknown>,
> = DataProps<Datum> &
    Dimensions &
    IcicleCommonProps<Datum, Context> &
    IcicleHtmlExtraProps<Datum> &
    EventHandlers<Datum>
