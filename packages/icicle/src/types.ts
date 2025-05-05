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
import { type Rect, RectLabelsProps, RectTransitionMode } from '@nivo/rects'

export interface DefaultIcicleDatum {
    id: string
    value?: number
    children?: DefaultIcicleDatum[]
}

export type IcicleLayerId = 'rects' | 'labels'

export interface IcicleCommonCustomLayerProps<Datum> {
    nodes: readonly ComputedDatum<Datum>[]
    zoom: (nodePath: string | null) => void
}

export type IcicleCustomSvgLayerProps<Datum> = IcicleCommonCustomLayerProps<Datum>
export type IcicleCustomSvgLayer<Datum> = FunctionComponent<IcicleCustomSvgLayerProps<Datum>>
export type IcicleSvgLayer<Datum> = IcicleLayerId | IcicleCustomSvgLayer<Datum>

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

// - top: Root at the top, children cascade downward, standard icicle.
// - right: Root at the right, children grow to the left, right-to-left icicle.
// - bottom: Root at the bottom, children grow upward, flame chart.
// - left: Root at the left, children grow to the right, left-to-right icicle.
export type IcicleOrientation = 'top' | 'right' | 'bottom' | 'left'

export type IcicleZoomMode = 'lateral' | 'global'

export type IcicleCommonProps<Datum> = {
    identity: PropertyAccessor<Datum, string>
    value: PropertyAccessor<Datum, number>
    valueFormat?: ValueFormat<number>
    margin: Box
    orientation: IcicleOrientation
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
    renderWrapper: boolean
} & Omit<RectLabelsProps<ComputedDatum<Datum>>, 'uid' | 'labelComponent'>

export type MouseHandler<Datum> = (datum: ComputedDatum<Datum>, event: MouseEvent) => void

export type WheelHandler<Datum> = (datum: ComputedDatum<Datum>, event: WheelEvent) => void

export type MouseHandlers<Datum> = Partial<{
    onClick: MouseHandler<Datum>
    onMouseEnter: MouseHandler<Datum>
    onMouseLeave: MouseHandler<Datum>
    onMouseMove: MouseHandler<Datum>
    onWheel: WheelHandler<Datum>
    onContextMenu: MouseHandler<Datum>
}>

export interface IcicleSvgExtraProps<Datum> {
    layers: readonly IcicleSvgLayer<Datum>[]
    labelComponent?: RectLabelsProps<ComputedDatum<Datum>>['labelComponent']
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    rectsTransitionMode: RectTransitionMode
    labelsTransitionMode: RectTransitionMode
    role: string
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

export type IcicleSvgProps<Datum> = DataProps<Datum> &
    Dimensions &
    Partial<IcicleCommonProps<Datum>> &
    Partial<IcicleSvgExtraProps<Datum>> &
    MouseHandlers<Datum> &
    SvgDefsAndFill<any>
export type IcicleSvgPropsWithDefaults<Datum> = DataProps<Datum> &
    Dimensions &
    IcicleCommonProps<Datum> &
    IcicleSvgExtraProps<Datum> &
    MouseHandlers<Datum> &
    SvgDefsAndFill<any>
