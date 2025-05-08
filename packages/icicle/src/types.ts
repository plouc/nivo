import {
    AriaAttributes,
    FunctionComponent,
    MouseEvent,
    FocusEvent,
    KeyboardEvent,
    WheelEvent,
} from 'react'
import { HierarchyNode } from 'd3-hierarchy'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import {
    Box,
    ValueFormat,
    SvgDefsAndFill,
    MotionProps,
    PropertyAccessor,
    Dimensions,
    DefaultChartContext,
} from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import {
    type Rect,
    RectLabelsProps,
    RectTransitionMode,
    RectNodeComponent,
    DatumA11yProps,
} from '@nivo/rects'

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
    orientation: IcicleOrientation
    zoom: IcicleZoomFunction
} & Context

export interface IcicleCommonCustomLayerProps<Datum> {
    nodes: readonly IcicleNode<Datum>[]
    zoom: IcicleZoomFunction
}

export type IcicleCustomLayerProps<Datum> = IcicleCommonCustomLayerProps<Datum>
export type IcicleCustomLayer<Datum> = FunctionComponent<IcicleCustomLayerProps<Datum>>
export type IcicleLayer<Datum> = IcicleLayerId | IcicleCustomLayer<Datum>

export interface DataProps<Datum> {
    data: Datum
}

export interface IcicleNodeNavigation {
    // Path of the parent, or null if the node is the root.
    up: string | null
    // Path of the previous node at the same depth.
    prev: string | null
    // Path of the next node at the same depth.
    next: string | null
    // Path of the first child.
    down: string | null
}

export interface IcicleNode<Datum> {
    id: string
    // Used as a unique key for the node, it contains the id of the node
    // and all its ancestors separated by a dot.
    path: string
    // Contains own id plus all ancestors' ids, starting from the root
    pathComponents: string[]
    // Contains the raw node's data, without the children for lighter structure.
    data: Omit<Datum, 'children'>
    depth: number
    // Height in the tree, not the rendered height
    height: number
    value: number
    formattedValue: string
    // Percentage of the node's value compared to the root node's value.
    percentage: number
    // Defined when zooming, if false, this means that the node is off-screen,
    // it is important to know this state when using keyboard navigation.
    isVisible: boolean
    color: string
    // Defined when using patterns or gradients
    fill?: string
    // Coordinates of the node in the rendered chart.
    rect: Rect
    // The max depth of the node's descendant, which is used for zooming.
    maxDescendantDepth: number
    nav: IcicleNodeNavigation
    a11y: DatumA11yProps
}

// - top: Root at the top, children cascade downward, standard icicle.
// - right: Root at the right, children grow to the left, right-to-left icicle.
// - bottom: Root at the bottom, children grow upward, flame chart.
// - left: Root at the left, children grow to the right, left-to-right icicle.
export type IcicleOrientation = 'top' | 'right' | 'bottom' | 'left'

export type IcicleZoomMode = 'lateral' | 'global'

export type IcicleCommonProps<Datum, Context = DefaultChartContext> = {
    identity: PropertyAccessor<Datum, string>
    sort: NodesSorting<Datum>
    value: PropertyAccessor<Datum, number>
    valueFormat?: ValueFormat<number>
    orientation: IcicleOrientation
    margin: Box
    gapX: number
    gapY: number
    theme: PartialTheme
    colors: OrdinalColorScaleConfig<Omit<IcicleNode<Datum>, 'color' | 'fill'>>
    colorBy: 'id' | 'depth'
    inheritColorFromParent: boolean
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<IcicleNode<Datum>>
    borderRadius: number
    borderWidth: number
    borderColor: InheritedColorConfig<IcicleNode<Datum>>
    enableLabels: boolean
    isInteractive: boolean
    enableZooming: boolean
    zoomMode: IcicleZoomMode
    tooltip: FunctionComponent<IcicleNode<Datum>>
    context: Context
    renderWrapper: boolean
} & Omit<RectLabelsProps<IcicleNode<Datum>>, 'uid' | 'labelComponent'>

export type MouseHandler<Datum> = (datum: IcicleNode<Datum>, event: MouseEvent) => void

export type FocusHandler<Datum> = (datum: IcicleNode<Datum>, event: FocusEvent) => void

export type KeyboardHandler<Datum> = (datum: IcicleNode<Datum>, event: KeyboardEvent) => void

export type WheelHandler<Datum> = (datum: IcicleNode<Datum>, event: WheelEvent) => void

export type IcicleNodeComponent<Datum> = RectNodeComponent<IcicleNode<Datum>>

export type EventHandlers<Datum> = Partial<{
    onClick: MouseHandler<Datum>
    onMouseEnter: MouseHandler<Datum>
    onMouseLeave: MouseHandler<Datum>
    onMouseMove: MouseHandler<Datum>
    onFocus: FocusHandler<Datum>
    onBlur: FocusHandler<Datum>
    onKeyDown: KeyboardHandler<Datum>
    onWheel: WheelHandler<Datum>
    onContextMenu: MouseHandler<Datum>
}>

export interface IcicleNodesA11yProps<Datum> {
    nodeRole?: string | ((node: IcicleNode<Datum>) => string | undefined)
    nodeAriaLabel?: (node: IcicleNode<Datum>) => AriaAttributes['aria-label']
    nodeAriaLabelledBy?: (node: IcicleNode<Datum>) => AriaAttributes['aria-labelledby']
    nodeAriaDescribedBy?: (node: IcicleNode<Datum>) => AriaAttributes['aria-describedby']
    nodeAriaHidden?: (node: IcicleNode<Datum>) => AriaAttributes['aria-hidden']
    nodeAriaDisabled?: (node: IcicleNode<Datum>) => AriaAttributes['aria-disabled']
}

export interface IcicleSvgExtraProps<Datum> {
    layers: readonly IcicleLayer<Datum>[]
    nodeComponent: IcicleNodeComponent<Datum>
    labelComponent: RectLabelsProps<IcicleNode<Datum>>['labelComponent']
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    animateOnMount: boolean
    rectsTransitionMode: RectTransitionMode
    labelsTransitionMode: RectTransitionMode
    role: string
    isFocusable: boolean
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

export type IcicleSvgProps<Datum, Context = DefaultChartContext> = DataProps<Datum> &
    Dimensions &
    Partial<IcicleCommonProps<Datum, Context>> &
    Partial<IcicleSvgExtraProps<Datum>> &
    EventHandlers<Datum> &
    SvgDefsAndFill<IcicleNode<Datum>> &
    Partial<IcicleNodesA11yProps<Datum>>
export type IcicleSvgPropsWithDefaults<Datum, Context = DefaultChartContext> = DataProps<Datum> &
    Dimensions &
    IcicleCommonProps<Datum, Context> &
    IcicleSvgExtraProps<Datum> &
    EventHandlers<Datum> &
    SvgDefsAndFill<IcicleNode<Datum>> &
    IcicleNodesA11yProps<Datum>

export interface IcicleHtmlExtraProps<Datum> {
    layers: readonly IcicleLayer<Datum>[]
    nodeComponent: IcicleNodeComponent<Datum>
    labelComponent: RectLabelsProps<IcicleNode<Datum>>['labelComponent']
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    animateOnMount: boolean
    rectsTransitionMode: RectTransitionMode
    labelsTransitionMode: RectTransitionMode
    role: string
    isFocusable: boolean
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

export type IcicleHtmlProps<Datum, Context = DefaultChartContext> = DataProps<Datum> &
    Dimensions &
    Partial<IcicleCommonProps<Datum, Context>> &
    Partial<IcicleHtmlExtraProps<Datum>> &
    EventHandlers<Datum> &
    Partial<IcicleNodesA11yProps<Datum>>
export type IcicleHtmlPropsWithDefaults<Datum, Context = DefaultChartContext> = DataProps<Datum> &
    Dimensions &
    IcicleCommonProps<Datum, Context> &
    IcicleHtmlExtraProps<Datum> &
    EventHandlers<Datum> &
    IcicleNodesA11yProps<Datum>
