import { Arc } from 'd3-shape'
import { HierarchyRectangularNode } from 'd3-hierarchy'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import {
    Theme,
    Dimensions,
    Box,
    DataFormatter,
    SvgDefsAndFill,
    ModernMotionProps,
} from '@nivo/core'

export type DatumId = string | number
export type DatumValue = number

export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T
export type LabelAccessorFunction<RawDatum> = (datum: ComputedDatum<RawDatum>) => string | number

export interface DataProps<RawDatum> {
    data: RawDatum
    id: string | number | DatumPropertyAccessor<RawDatum, DatumId>
    value: string | number | DatumPropertyAccessor<RawDatum, DatumValue>
}

export interface NormalizedDatum<RawDatum> {
    color?: string
    depth: number
    id: DatumId
    fill?: string
    parent?: ComputedDatum<RawDatum>
    percentage: number
    value: DatumValue
}

export interface ComputedDatum<RawDatum> {
    x0: number
    y0: number
    x1: number
    y1: number
    data: NormalizedDatum<RawDatum>
    depth: number
    height: number
    parent: HierarchyRectangularNode<RawDatum> | null
    value: number
}

export type CommonProps<RawDatum> = {
    margin: Box

    cornerRadius: number

    colors: OrdinalColorScaleConfig<Omit<NormalizedDatum<RawDatum>, 'color' | 'fill' | 'parent'>>
    borderWidth: number
    borderColor: string

    childColor: InheritedColorConfig<NormalizedDatum<RawDatum>>

    // slice labels
    enableSliceLabels: boolean
    sliceLabel: string | LabelAccessorFunction<NormalizedDatum<RawDatum>>
    sliceLabelsSkipAngle: number
    sliceLabelsTextColor: InheritedColorConfig<NormalizedDatum<RawDatum>>

    role: string

    theme: Theme

    isInteractive: boolean
    tooltipFormat: DataFormatter
    tooltip: (payload: NormalizedDatum<RawDatum>) => JSX.Element
}

export type MouseEventHandler<RawDatum, ElementType> = (
    datum: NormalizedDatum<RawDatum>,
    event: React.MouseEvent<ElementType>
) => void

export type MouseEventHandlers<RawDatum, ElementType> = Partial<{
    onClick: MouseEventHandler<RawDatum, ElementType>
    onMouseEnter: MouseEventHandler<RawDatum, ElementType>
    onMouseLeave: MouseEventHandler<RawDatum, ElementType>
}>

export type SvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    SvgDefsAndFill<RawDatum> &
    MouseEventHandlers<RawDatum, SVGPathElement> &
    ModernMotionProps &
    Partial<CommonProps<RawDatum>>

export type SunburstArcProps<RawDatum> = Pick<
    SvgProps<RawDatum>,
    | 'tooltip'
    | 'tooltipFormat'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'borderWidth'
    | 'borderColor'
> & {
    arcGenerator: Arc<any, ComputedDatum<RawDatum>>
    node: ComputedDatum<RawDatum>
}

export type SunburstLabelProps<RawDatum> = {
    label: CommonProps<RawDatum>['sliceLabel']
    nodes: Array<ComputedDatum<RawDatum>>
    skipAngle?: number
    textColor: CommonProps<RawDatum>['sliceLabelsTextColor']
}
