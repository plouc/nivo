import { sankeyCenter, sankeyJustify, sankeyLeft, sankeyRight } from 'd3-sankey'
import { SankeyLayerId, SankeyNodeDatum, SankeyAlignType } from './types'
import { InheritedColorConfig } from '@nivo/colors'
import { SankeyNodeTooltip } from './SankeyNodeTooltip'
import { SankeyLinkTooltip } from './SankeyLinkTooltip'

export const sankeyAlignmentPropMapping = {
    center: sankeyCenter,
    justify: sankeyJustify,
    start: sankeyLeft,
    end: sankeyRight,
}

export const sankeyAlignmentPropKeys = Object.keys(sankeyAlignmentPropMapping) as SankeyAlignType[]

export const sankeyAlignmentFromProp = (prop: SankeyAlignType) => sankeyAlignmentPropMapping[prop]

export const svgDefaultProps = {
    layout: 'horizontal' as const,
    align: 'center' as const,
    sort: 'auto' as const,

    colors: { scheme: 'nivo' as const },

    nodeOpacity: 0.75,
    nodeHoverOpacity: 1,
    nodeHoverOthersOpacity: 0.15,
    nodeThickness: 12,
    nodeSpacing: 12,
    nodeInnerPadding: 0,
    nodeBorderWidth: 1,
    nodeBorderColor: { from: 'color', modifiers: [['darker', 0.5]] } as InheritedColorConfig<
        SankeyNodeDatum<any, any>
    >,
    nodeBorderRadius: 0,

    linkOpacity: 0.25,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.15,
    linkContract: 0,
    linkBlendMode: 'multiply' as const,
    enableLinkGradient: false,

    enableLabels: true,
    label: 'id',
    labelPosition: 'inside' as const,
    labelPadding: 9,
    labelOrientation: 'horizontal' as const,
    labelTextColor: { from: 'color', modifiers: [['darker', 0.8]] } as InheritedColorConfig<
        SankeyNodeDatum<any, any>
    >,

    isInteractive: true,
    nodeTooltip: SankeyNodeTooltip,
    linkTooltip: SankeyLinkTooltip,

    legends: [],

    layers: ['links', 'nodes', 'labels', 'legends'] as SankeyLayerId[],

    role: 'img',

    animate: true,
    motionConfig: 'gentle',
}
