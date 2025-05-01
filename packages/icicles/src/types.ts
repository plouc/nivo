import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import {
    Theme,
    Box,
    ValueFormat,
    SvgDefsAndFill,
    ModernMotionProps,
    PropertyAccessor,
} from '@nivo/core'
import { type Rect, RectLabelsProps } from '@nivo/rects'

export type DatumId = string | number

export type IciclesLayerId = 'rects' | 'rectLabels'

export interface IciclesCustomLayerProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
    baseOffsetLeft: number
    baseOffsetTop: number
}

export type IciclesCustomLayer<RawDatum> = React.FC<IciclesCustomLayerProps<RawDatum>>

export type IciclesLayer<RawDatum> = IciclesLayerId | IciclesCustomLayer<RawDatum>

export interface DataProps<RawDatum> {
    data: RawDatum
    id?: PropertyAccessor<RawDatum, DatumId>
    value?: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>
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

export type IciclesDirection = 'top' | 'right' | 'bottom' | 'left'

export type IciclesCommonProps<RawDatum> = {
    animate: boolean
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    borderWidth: number
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    colorBy: 'id' | 'depth'
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>
    data: RawDatum
    direction: IciclesDirection
    enableRectLabels: boolean
    height: number
    id: PropertyAccessor<RawDatum, DatumId>
    inheritColorFromParent: boolean
    isInteractive: boolean
    layers: IciclesLayer<RawDatum>[]
    margin?: Box
    motionConfig: ModernMotionProps['motionConfig']
    rectLabelsOffset: number
    rectLabelsSkipLength: number
    rectLabelsSkipPercentage: number
    rectLabelsTextColor: InheritedColorConfig<RawDatum>
    renderWrapper: boolean
    role: string
    theme: Theme
    tooltip: (props: ComputedDatum<RawDatum>) => JSX.Element
    value: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>
    width: number
} & RectLabelsProps<ComputedDatum<RawDatum>>

export type MouseHandler<RawDatum> = (
    datum: ComputedDatum<RawDatum>,
    event: React.MouseEvent
) => void

export type WheelHandler<RawDatum> = (
    datum: ComputedDatum<RawDatum>,
    event: React.WheelEvent
) => void

export type MouseHandlers<RawDatum> = Partial<{
    onClick: MouseHandler<RawDatum>
    onMouseEnter: MouseHandler<RawDatum>
    onMouseLeave: MouseHandler<RawDatum>
    onMouseMove: MouseHandler<RawDatum>
    onWheel: WheelHandler<RawDatum>
    onContextMenu: MouseHandler<RawDatum>
}>

export type IciclesSvgProps<RawDatum> = IciclesCommonProps<RawDatum> &
    SvgDefsAndFill<RawDatum> &
    MouseHandlers<RawDatum>
