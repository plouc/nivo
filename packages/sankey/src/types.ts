import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { SankeyNodeMinimal } from 'd3-sankey'
import {
    Box,
    Theme,
    CssMixBlendMode,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type SankeyId = string | number

export interface SankeyRawNode<Id extends SankeyId> {
    id: Id
}

export interface SankeyRawLink<Id extends SankeyId> {
    source: Id
    target: Id
    value: number
    // start/end color can optionally be used to have custom gradients
    startColor?: string
    endColor?: string
}

export interface SankeyLinkDatum<Id extends SankeyId> {
    color: string
    index: number
    pos0: number
    pos1: number
    source: SankeyNodeDatum<Id>
    target: SankeyNodeDatum<Id>
    thickness: number
    value: number
    formattedValue: string | number
    // start/end color can optionally be used to have custom gradients
    startColor?: string
    endColor?: string
}

export interface SankeyNodeDatum<Id extends SankeyId> {
    color: string
    depth: number
    height: number
    id: Id
    index: number
    label: string | number
    layer: number
    sourceLinks: SankeyLinkDatum<Id>[]
    targetLinks: SankeyLinkDatum<Id>[]
    value: number
    formattedValue: string | number
    width: number
    x: number
    x0: number
    x1: number
    y: number
    y0: number
    y1: number
}

export interface SankeyDataProps<Id extends SankeyId> {
    data: {
        nodes: SankeyRawNode<Id>[]
        keys: SankeyRawLink<Id>[]
    }
}

export type SankeyLayerId = 'links' | 'nodes' | 'labels' | 'legends'

export type SankeyMouseHandler<Id extends SankeyId> = (
    data: SankeyNodeDatum<Id> | SankeyLinkDatum<Id>,
    event: MouseEvent
) => void

export type SankeyAlignType = 'center' | 'justify' | 'start' | 'end'
export type SankeyAlignFunction = (node: SankeyNodeMinimal<any, any>, n: number) => number

export type SankeySortType = 'auto' | 'input' | 'ascending' | 'descending'
export type SankeySortFunction = (
    a: SankeyNodeMinimal<any, any>,
    b: SankeyNodeMinimal<any, any>
) => number

export interface SankeyCommonProps<Id extends SankeyId> {
    // formatting for link value
    valueFormat: ValueFormat<number>

    layout: 'horizontal' | 'vertical'
    align: SankeyAlignType | SankeyAlignFunction
    sort: SankeySortType | SankeySortFunction

    layers: SankeyLayerId[]

    margin: Box

    colors: OrdinalColorScaleConfig
    theme: Theme

    nodeOpacity: number
    nodeHoverOpacity: number
    nodeHoverOthersOpacity: number
    nodeThickness: number
    nodeSpacing: number
    nodeInnerPadding: number
    nodeBorderWidth: number
    nodeBorderColor: InheritedColorConfig<SankeyNodeDatum<Id>>
    nodeBorderRadius: number

    linkOpacity: number
    linkHoverOpacity: number
    linkHoverOthersOpacity: number
    linkContract: number
    linkBlendMode: CssMixBlendMode
    enableLinkGradient: boolean

    enableLabels: boolean
    label: PropertyAccessor<Omit<SankeyNodeDatum<Id>, 'color' | 'label'>, string | number>
    labelPosition: 'inside' | 'outside'
    labelPadding: number
    labelOrientation: 'horizontal' | 'vertical'
    labelTextColor: InheritedColorConfig<SankeyNodeDatum<Id>>

    isInteractive: boolean
    onClick: SankeyMouseHandler<Id>
    nodeTooltip: FunctionComponent<{ node: SankeyNodeDatum<Id> }>
    linkTooltip: FunctionComponent<{ link: SankeyLinkDatum<Id> }>

    legends: LegendProps[]

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type SankeySvgProps<Id extends SankeyId> = Partial<SankeyCommonProps<Id>> &
    SankeyDataProps<Id> &
    Dimensions &
    ModernMotionProps
