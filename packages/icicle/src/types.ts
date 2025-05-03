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
import { type Rect, RectLabelsProps } from '@nivo/rects'

export type DatumId = string | number

export interface DefaultIcicleDatum {
    id: string
    value?: number
    children?: DefaultIcicleDatum[]
}

export type IcicleLayerId = 'rects' | 'rectLabels'

export interface IcicleCommonCustomLayerProps<Datum> {
    nodes: readonly ComputedDatum<Datum>[]
    baseOffsetLeft: number
    baseOffsetTop: number
}

export type IcicleCustomSvgLayerProps<Datum> = IcicleCommonCustomLayerProps<Datum>
export type IcicleCustomSvgLayer<Datum> = FunctionComponent<IcicleCustomSvgLayerProps<Datum>>
export type IcicleSvgLayer<Datum> = IcicleLayerId | IcicleCustomSvgLayer<Datum>

export interface DataProps<RawDatum> {
    data: RawDatum
}

export interface ChildrenDatum<RawDatum> {
    children?: Array<RawDatum & ChildrenDatum<RawDatum>>
}

export interface ComputedDatum<RawDatum> {
    color: string
    // contains the raw node's data
    data: RawDatum
    depth: number
    // defined when using patterns or gradients
    fill?: string
    formattedValue: string
    height: number
    id: DatumId
    parent?: ComputedDatum<RawDatum>
    // contain own id plus all ancestor ids
    path: DatumId[]
    percentage: number
    rect: Rect
    value: number
}

// - top: Root at the top, children cascade downward, standard icicle.
// - right: Root at the right, children grow to the left, right-to-left icicle.
// - bottom: Root at the bottom, children grow upward, flame chart.
// - left: Root at the left, children grow to the right, left-to-right icicle.
export type IcicleOrientation = 'top' | 'right' | 'bottom' | 'left'

export type IcicleCommonProps<Datum> = {
    identity: PropertyAccessor<Datum, string>
    value: PropertyAccessor<Datum, number>
    valueFormat?: ValueFormat<number>
    margin: Box
    orientation: IcicleOrientation
    theme: PartialTheme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<Datum>, 'color' | 'fill'>>
    colorBy: 'id' | 'depth'
    inheritColorFromParent: boolean
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<ComputedDatum<Datum>>
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<Datum>>
    enableRectLabels: boolean
    isInteractive: boolean
    tooltip: (props: ComputedDatum<Datum>) => JSX.Element
    renderWrapper: boolean
} & Omit<RectLabelsProps<ComputedDatum<Datum>>, 'rectLabelsComponent'>

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
    rectLabelsComponent?: RectLabelsProps<ComputedDatum<Datum>>['rectLabelsComponent']
    animate: boolean
    motionConfig: MotionProps['motionConfig']
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
