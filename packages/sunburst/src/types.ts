import { Arc } from 'd3-shape'
import { HierarchyRectangularNode } from 'd3-hierarchy'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { Theme, Dimensions, Box, DataFormatter } from '@nivo/core'
import { DefaultSunburstProps } from './props'

type NameAndColor = {
    color: string
}

type DataLocation<Datum extends Record<string, unknown>> = NameAndColor & Datum

type DataChildren<Datum extends Record<string, unknown>> = NameAndColor & {
    children: DataChildren<Datum>[] | DataLocation<Datum>[]
}

export type Data<Datum extends Record<string, unknown>> = NameAndColor & DataChildren<Datum>

export type SunburstNodeOld = {
    data: {
        id: string
        color: string
    }
    depth: number
    x0: number
    x1: number
    y0: number
    y1: number
}

type ComputedNode<Datum extends Record<string, unknown> = any> = HierarchyRectangularNode<
    DataChildren<Datum>
>

export type SunburstNode<Datum extends Record<string, unknown> = any> = Omit<
    ComputedNode<Datum>,
    'children' | 'data'
> & {
    data: {
        color: string
        id: string
        value: number
        percentage: number
        depth: number
    }
}

type CommonSunburstProps = {
    identity: string | ((node: ComputedNode['data']) => string)
    value: string | ((node: ComputedNode['data']) => number)

    margin: Box

    cornerRadius: number

    colors: OrdinalColorScaleConfig<Omit<SunburstNode['data'], 'color'>>
    borderWidth: number
    borderColor: string

    childColor: InheritedColorConfig<SunburstNode['data']>

    // slices labels
    enableSliceLabels: boolean
    sliceLabel: string | ((node: ComputedNode['data']) => string)
    sliceLabelsSkipAngle: number
    sliceLabelsTextColor: InheritedColorConfig<SunburstNode['data']>

    role: string

    theme: Theme

    isInteractive: boolean
    tooltipFormat: DataFormatter
    tooltip: (payload: SunburstNode['data']) => JSX.Element

    onClick: (
        payload: SunburstNode['data'],
        event: React.MouseEvent<SVGPathElement, MouseEvent>
    ) => void
    onMouseEnter: (
        payload: SunburstNode['data'],
        event: React.MouseEvent<SVGPathElement, MouseEvent>
    ) => void
    onMouseLeave: (
        payload: SunburstNode['data'],
        event: React.MouseEvent<SVGPathElement, MouseEvent>
    ) => void
}

type ComputedSunburstProps = {
    identity: string | ((node: SunburstNode['data']) => string)
    getIdentity: (node: SunburstNode['data']) => string // computed

    getValue: (node: SunburstNode['data']) => number // computed

    nodes: SunburstNode[] // computed

    partition: any // computed

    // arcGenerator: (node: SunburstNode) => string // computed
    arcGenerator: Arc<any, SunburstNode<any>>

    radius: number // computed
    centerX: number // computed
    centerY: number // computed

    outerWidth: number
    outerHeight: number

    getColor: (payload: unknown) => string
    getChildColor: (payload: unknown) => string

    getSliceLabel: (node: SunburstNode['data']) => string
}

export type SunburstSvgProps<Datum extends Record<string, unknown>> = Dimensions &
    DefaultSunburstProps &
    Partial<CommonSunburstProps> & {
        data: Data<Datum>
    }

export type SunburstArcProps = Pick<
    SunburstSvgProps<any>,
    | 'tooltip'
    | 'tooltipFormat'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'borderWidth'
    | 'borderColor'
> &
    Pick<ComputedSunburstProps, 'arcGenerator'> & {
        node: SunburstNode
    }

export type SunburstLabelProps = Pick<ComputedSunburstProps, 'nodes'> & {
    label: ComputedSunburstProps['getSliceLabel']
    skipAngle?: number
    textColor: CommonSunburstProps['sliceLabelsTextColor']
}
