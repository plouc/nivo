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
    nodes: IciclesComputedDatum<RawDatum>[]
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

export interface IciclesComputedDatum<RawDatum> {
    color: string
    // contains the raw node's data
    data: RawDatum
    depth: number
    // defined when using patterns or gradients
    fill?: string
    formattedValue: string
    height: number
    id: DatumId
    parent?: IciclesComputedDatum<RawDatum>
    // contain own id plus all ancestor ids
    path: DatumId[]
    percentage: number
    rect: Rect
    transform: string
    value: number
}

export type IciclesDirection = 'top' | 'right' | 'bottom' | 'left'

export type IciclesCommonProps<RawDatum> = {
    animate: boolean
    borderColor: InheritedColorConfig<IciclesComputedDatum<RawDatum>>
    borderWidth: number
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<IciclesComputedDatum<RawDatum>>
    colorBy: 'id' | 'depth'
    colors: OrdinalColorScaleConfig<Omit<IciclesComputedDatum<RawDatum>, 'color' | 'fill'>>
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
    rectLabelsTextColor: InheritedColorConfig<RawDatum>
    renderWrapper: boolean
    role: string
    theme: Theme
    tooltip: (props: IciclesComputedDatum<RawDatum>) => JSX.Element
    value: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>
    width: number
} & RectLabelsProps<IciclesComputedDatum<RawDatum>>

export type IciclesMouseHandler<RawDatum> = (
    datum: IciclesComputedDatum<RawDatum>,
    event: React.MouseEvent
) => void

export type IciclesMouseHandlers<RawDatum> = Partial<{
    onClick: IciclesMouseHandler<RawDatum>
    onMouseEnter: IciclesMouseHandler<RawDatum>
    onMouseLeave: IciclesMouseHandler<RawDatum>
    onMouseMove: IciclesMouseHandler<RawDatum>
}>

export type IciclesSvgProps<RawDatum> = IciclesCommonProps<RawDatum> &
    SvgDefsAndFill<RawDatum> &
    IciclesMouseHandlers<RawDatum>
