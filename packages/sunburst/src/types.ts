import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { Theme, Dimensions, Box } from '@nivo/core'

type NameAndColor = {
    name: string
    color: string
}

// Pretty sure this should be generic.. loc is example from website
type DataLocation = NameAndColor & {
    loc: number
}

type DataChildren = NameAndColor & {
    children: DataChildren[] | DataLocation[]
}

type Data = NameAndColor & DataChildren

export type SunburstNode = {
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

type CommonSunburstProps = {
    data: Data

    identity: string | ((node: SunburstNode['data']) => string)
    value: string | ((node: SunburstNode['data']) => number)

    margin: Box

    cornerRadius: number

    colors: OrdinalColorsInstruction<SunburstNode>
    borderWidth: number
    borderColor: string

    childColor: InheritedColorProp<SunburstNode>

    // slices labels
    enableSlicesLabels: boolean
    sliceLabel: string | ((node: SunburstNode['data']) => string)

    slicesLabelsSkipAngle?: number
    slicesLabelsTextColor?: InheritedColorProp<SunburstNode>

    role: string

    theme: Theme

    isInteractive: boolean
    tooltipFormat: (value: React.ReactText) => React.ReactText
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

    arcGenerator: (node: SunburstNode) => string // computed

    radius: number // computed
    centerX: number // computed
    centerY: number // computed

    outerWidth: number
    outerHeight: number

    getColor: (payload: unknown) => string
    getChildColor: (payload: unknown) => string

    getSliceLabel: (node: SunburstNode['data']) => string
}

export type SunburstSvgProps = Dimensions &
    Partial<CommonSunburstProps> &
    ComputedSunburstProps & { nodes: ComputedSunburstProps['nodes'] }

export type SunburstArcProps = Pick<
    SunburstSvgProps,
    | 'tooltip'
    | 'tooltipFormat'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'borderWidth'
    | 'borderColor'
> &
    Pick<ComputedSunburstProps, 'arcGenerator'> &
    TooltipHandlers & {
        node: SunburstNode
        path?: string // computed
    }

export type SunburstLabelProps = Pick<SunburstSvgProps, 'nodes' | 'theme'> & {
    label: SunburstSvgProps['getSliceLabel']
    skipAngle?: number
    textColor: (payload: SunburstNode['data'], theme?: Theme) => string
}

export type TooltipHandlers = {
    showTooltip: (payload: JSX.Element, event: React.MouseEvent<SVGPathElement, MouseEvent>) => void
    hideTooltip: () => void
}
