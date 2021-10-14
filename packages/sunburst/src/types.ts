import { Arc, ArcGenerator, ArcLabelsProps, ArcTransitionMode } from '@nivo/arcs'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import {
    Theme,
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

export type SunburstCommonProps<RawDatum> = {
    data: RawDatum
    id: PropertyAccessor<RawDatum, DatumId>
    value: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>
    width: number
    height: number
    margin?: Box
    cornerRadius: number
    innerRadiusRatio: number
    renderRootNode: boolean
    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>
    colorBy: 'id' | 'depth'
    inheritColorFromParent: boolean
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    enableArcLabels: boolean
    layers: SunburstLayer<RawDatum>[]
    role: string
    transitionMode: ArcTransitionMode
    isInteractive: boolean
    tooltip: (props: ComputedDatum<RawDatum>) => JSX.Element
    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']
} & ArcLabelsProps<ComputedDatum<RawDatum>>

export type MouseHandler<RawDatum> = (
    datum: ComputedDatum<RawDatum>,
    event: React.MouseEvent
) => void

export type MouseHandlers<RawDatum> = Partial<{
    onClick: MouseHandler<RawDatum>
    onMouseEnter: MouseHandler<RawDatum>
    onMouseLeave: MouseHandler<RawDatum>
    onMouseMove: MouseHandler<RawDatum>
}>

export type SunburstSvgProps<RawDatum> = SunburstCommonProps<RawDatum> &
    SvgDefsAndFill<RawDatum> &
    MouseHandlers<RawDatum>
