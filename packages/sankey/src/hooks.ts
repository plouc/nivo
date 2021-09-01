import { useState, useMemo } from 'react'
import { cloneDeep } from 'lodash'
import { sankey as d3Sankey } from 'd3-sankey'
import { useTheme, usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { sankeyAlignmentFromProp } from './props'
import {
    DefaultLink,
    DefaultNode,
    SankeyAlignFunction,
    SankeyCommonProps,
    SankeyDataProps,
    SankeyLinkDatum,
    SankeyNodeDatum,
    SankeySortFunction,
} from './types'

const getId = <N extends DefaultNode>(node: N) => node.id

export const computeNodeAndLinks = <N extends DefaultNode, L extends DefaultLink>({
    data: _data,
    formatValue,
    layout,
    alignFunction,
    sortFunction,
    linkSortMode,
    nodeThickness,
    nodeSpacing,
    nodeInnerPadding,
    width,
    height,
    getColor,
    getLabel,
}: {
    data: SankeyDataProps<N, L>['data']
    formatValue: (value: number) => string
    layout: SankeyCommonProps<N, L>['layout']
    alignFunction: SankeyAlignFunction
    sortFunction: null | undefined | SankeySortFunction<N, L>
    linkSortMode: null | undefined
    nodeThickness: SankeyCommonProps<N, L>['nodeThickness']
    nodeSpacing: SankeyCommonProps<N, L>['nodeSpacing']
    nodeInnerPadding: SankeyCommonProps<N, L>['nodeInnerPadding']
    width: number
    height: number
    getColor: (node: Omit<SankeyNodeDatum<N, L>, 'color' | 'label'>) => string
    getLabel: (node: Omit<SankeyNodeDatum<N, L>, 'color' | 'label'>) => string
}) => {
    const sankey = d3Sankey()
        .nodeAlign(alignFunction)
        // @ts-ignore: this method signature is incorrect in current @types/d3-sankey
        .nodeSort(sortFunction)
        // @ts-ignore: this method is not available in current @types/d3-sankey
        .linkSort(linkSortMode)
        .nodeWidth(nodeThickness)
        .nodePadding(nodeSpacing)
        .size(layout === 'horizontal' ? [width, height] : [height, width])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    // we need a different identity for correct updates
    const data = (cloneDeep(_data) as unknown) as {
        nodes: SankeyNodeDatum<N, L>[]
        links: SankeyLinkDatum<N, L>[]
    }
    sankey(data)

    data.nodes.forEach(node => {
        node.color = getColor(node)
        node.label = getLabel(node)
        node.formattedValue = formatValue(node.value)

        if (layout === 'horizontal') {
            node.x = node.x0 + nodeInnerPadding
            node.y = node.y0
            node.width = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0)
            node.height = Math.max(node.y1 - node.y0, 0)
        } else {
            node.x = node.y0
            node.y = node.x0 + nodeInnerPadding
            node.width = Math.max(node.y1 - node.y0, 0)
            node.height = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0)

            const oldX0 = node.x0
            const oldX1 = node.x1

            node.x0 = node.y0
            node.x1 = node.y1
            node.y0 = oldX0
            node.y1 = oldX1
        }
    })

    data.links.forEach(link => {
        link.formattedValue = formatValue(link.value)
        link.color = link.source.color
        // @ts-ignore
        link.pos0 = link.y0
        // @ts-ignore
        link.pos1 = link.y1
        // @ts-ignore
        link.thickness = link.width
        // @ts-ignore
        delete link.y0
        // @ts-ignore
        delete link.y1
        // @ts-ignore
        delete link.width
    })

    return data
}

export const useSankey = <N extends DefaultNode, L extends DefaultLink>({
    data,
    valueFormat,
    layout,
    width,
    height,
    sort,
    align,
    colors,
    nodeThickness,
    nodeSpacing,
    nodeInnerPadding,
    nodeBorderColor,
    label,
    labelTextColor,
}: {
    data: SankeyDataProps<N, L>['data']
    valueFormat?: SankeyCommonProps<N, L>['valueFormat']
    layout: SankeyCommonProps<N, L>['layout']
    width: number
    height: number
    sort: SankeyCommonProps<N, L>['sort']
    align: SankeyCommonProps<N, L>['align']
    colors: SankeyCommonProps<N, L>['colors']
    nodeThickness: SankeyCommonProps<N, L>['nodeThickness']
    nodeSpacing: SankeyCommonProps<N, L>['nodeSpacing']
    nodeInnerPadding: SankeyCommonProps<N, L>['nodeInnerPadding']
    nodeBorderColor: SankeyCommonProps<N, L>['nodeBorderColor']
    label: SankeyCommonProps<N, L>['label']
    labelTextColor: SankeyCommonProps<N, L>['labelTextColor']
}) => {
    const [currentNode, setCurrentNode] = useState<SankeyNodeDatum<N, L> | null>(null)
    const [currentLink, setCurrentLink] = useState<SankeyLinkDatum<N, L> | null>(null)

    const sortFunction = useMemo(() => {
        if (sort === 'auto') return undefined
        if (sort === 'input') return null
        if (sort === 'ascending') {
            return (a: SankeyNodeDatum<N, L>, b: SankeyNodeDatum<N, L>) => a.value - b.value
        }
        if (sort === 'descending') {
            return (a: SankeyNodeDatum<N, L>, b: SankeyNodeDatum<N, L>) => b.value - a.value
        }

        return sort
    }, [sort])

    // If "input" sorting is used, apply this setting to links, too.
    // (In d3, `null` means input sorting and `undefined` is the default)
    const linkSortMode = sort === 'input' ? null : undefined

    const alignFunction = useMemo(() => {
        if (typeof align === 'function') return align
        return sankeyAlignmentFromProp(align)
    }, [align])

    const theme = useTheme()

    const getColor = useOrdinalColorScale(colors, 'id')
    const getNodeBorderColor = useInheritedColor(nodeBorderColor, theme)

    const getLabel = usePropertyAccessor<Omit<SankeyNodeDatum<N, L>, 'color' | 'label'>, string>(
        label
    )
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const formatValue = useValueFormatter<number>(valueFormat)

    const { nodes, links } = useMemo(
        () =>
            computeNodeAndLinks<N, L>({
                data,
                formatValue,
                layout,
                alignFunction,
                sortFunction,
                linkSortMode,
                nodeThickness,
                nodeSpacing,
                nodeInnerPadding,
                width,
                height,
                getColor,
                getLabel,
            }),
        [
            data,
            formatValue,
            layout,
            alignFunction,
            sortFunction,
            linkSortMode,
            nodeThickness,
            nodeSpacing,
            nodeInnerPadding,
            width,
            height,
            getColor,
            getLabel,
        ]
    )

    const legendData = useMemo(
        () =>
            nodes.map(node => ({
                id: node.id,
                label: node.label,
                color: node.color,
            })),
        [nodes]
    )

    return {
        nodes,
        links,
        legendData,
        getNodeBorderColor,
        currentNode,
        setCurrentNode,
        currentLink,
        setCurrentLink,
        getLabelTextColor,
    }
}
