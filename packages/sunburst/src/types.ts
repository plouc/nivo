import { Arc, ArcGenerator, ArcLabelsProps, ArcTransitionMode } from '@nivo/arcs'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import {
    Theme,
    Dimensions,
    Box,
    ValueFormat,
    SvgDefsAndFill,
    ModernMotionProps,
    PropertyAccessor,
} from '@nivo/core'

export type DatumId = string | number

export type SunburstLayerId = 'arcs' | 'arcLabels'

export interface SunburstCustomLayerProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
    centerX: number
    centerY: number
    radius: number
    arcGenerator: ArcGenerator
}

export type SunburstCustomLayer<RawDatum> = React.FC<SunburstCustomLayerProps<RawDatum>>

export type SunburstLayer<RawDatum> = SunburstLayerId | SunburstCustomLayer<RawDatum>

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
    id: DatumId
    // contain own id plus all ancestor ids
    path: DatumId[]
    value: number
    percentage: number
    formattedValue: string
    color: string
    // defined when using patterns or gradients
    fill?: string
    arc: Arc
    // contains the raw node's data
    data: RawDatum
    depth: number
    height: number
    parent?: ComputedDatum<RawDatum>
}

export type CommonProps<RawDatum> = {
    layers: SunburstLayer<RawDatum>[]

    margin: Box

    cornerRadius: number

    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>
    borderWidth: number
    borderColor: string

    childColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    enableArcLabels: boolean

    role: string

    theme: Theme

    transitionMode: ArcTransitionMode

    isInteractive: boolean
    tooltip: (props: ComputedDatum<RawDatum>) => JSX.Element
} & ArcLabelsProps<ComputedDatum<RawDatum>>

export type MouseEventHandler<RawDatum, ElementType> = (
    datum: ComputedDatum<RawDatum>,
    event: React.MouseEvent<ElementType>
) => void

export type MouseEventHandlers<RawDatum, ElementType> = Partial<{
    onClick: MouseEventHandler<RawDatum, ElementType>
    onMouseEnter: MouseEventHandler<RawDatum, ElementType>
    onMouseLeave: MouseEventHandler<RawDatum, ElementType>
    onMouseMove: MouseEventHandler<RawDatum, ElementType>
}>

export type SvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    SvgDefsAndFill<RawDatum> &
    MouseEventHandlers<RawDatum, SVGPathElement> &
    ModernMotionProps &
    Partial<CommonProps<RawDatum>>

export type CompleteSvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    SvgDefsAndFill<RawDatum> &
    MouseEventHandlers<RawDatum, SVGPathElement> &
    ModernMotionProps &
    CommonProps<RawDatum>

export type SunburstArcProps<RawDatum> = Pick<
    SvgProps<RawDatum>,
    'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'borderWidth' | 'borderColor'
> &
    Pick<CommonProps<RawDatum>, 'isInteractive' | 'tooltip'> & {
        arcGenerator: ArcGenerator
        node: ComputedDatum<RawDatum>
    }

export type SunburstLabelProps<RawDatum> = {
    label: CommonProps<RawDatum>['arcLabel']
    nodes: Array<ComputedDatum<RawDatum>>
    skipAngle?: number
    textColor: CommonProps<RawDatum>['arcLabelsTextColor']
}
