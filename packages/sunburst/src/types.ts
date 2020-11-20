import { Arc } from 'd3-shape'
import { HierarchyRectangularNode } from 'd3-hierarchy'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { Theme, Dimensions, Box, DataFormatter } from '@nivo/core'

export type DatumId = string | number
export type DatumValue = number

export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T
export type LabelAccessorFunction<RawDatum> = (datum: ComputedDatum<RawDatum>) => string | number

export interface DataProps<RawDatum> {
    data: RawDatum
    id: string | number | DatumPropertyAccessor<RawDatum, DatumId>
    value: string | number | DatumPropertyAccessor<RawDatum, DatumValue>
}

export interface NormalizedDatum {
    color?: string
    id: DatumId
    value: DatumValue
    depth: number
    percentage: number
}

export interface ComputedDatum<RawDatum> {
    x0: number
    y0: number
    x1: number
    y1: number
    data: NormalizedDatum
    depth: number
    height: number
    parent: HierarchyRectangularNode<RawDatum> | null
    value: number
}

export type CommonProps = {
    margin: Box

    cornerRadius: number

    colors: OrdinalColorScaleConfig<Omit<NormalizedDatum, 'color'>>
    borderWidth: number
    borderColor: string

    childColor: InheritedColorConfig<NormalizedDatum>

    // slice labels
    enableSliceLabels: boolean
    sliceLabel: string | LabelAccessorFunction<NormalizedDatum>
    sliceLabelsSkipAngle: number
    sliceLabelsTextColor: InheritedColorConfig<NormalizedDatum>

    role: string

    theme: Theme

    isInteractive: boolean
    tooltipFormat: DataFormatter
    tooltip: (payload: NormalizedDatum) => JSX.Element
}

export type MouseEventHandler<ElementType> = (
    datum: NormalizedDatum,
    event: React.MouseEvent<ElementType>
) => void

export type MouseEventHandlers<ElementType> = Partial<{
    onClick: MouseEventHandler<ElementType>
    onMouseEnter: MouseEventHandler<ElementType>
    onMouseLeave: MouseEventHandler<ElementType>
}>

export type SvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    MouseEventHandlers<SVGPathElement> &
    Partial<CommonProps>

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
    label: CommonProps['sliceLabel']
    nodes: Array<ComputedDatum<RawDatum>>
    skipAngle?: number
    textColor: CommonProps['sliceLabelsTextColor']
}
