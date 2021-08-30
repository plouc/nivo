import { useState, useMemo } from 'react'
import { cloneDeep } from 'lodash'
import { sankey as d3Sankey } from 'd3-sankey'
import { useTheme, usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { sankeyAlignmentFromProp } from './props'
import {
    SankeyAlignFunction,
    SankeyCommonProps,
    SankeyDataProps,
    SankeyId,
    SankeyLinkDatum,
    SankeyNodeDatum,
    SankeySortFunction,
} from './types'

const getId = (d: { id: string | number }) => d.id

export const computeNodeAndLinks = <Id extends SankeyId>({
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
    data: SankeyDataProps<Id>['data']
    formatValue: (value: number) => string | number
    layout: SankeyCommonProps<Id>['layout']
    alignFunction: SankeyAlignFunction
    sortFunction: SankeySortFunction
    linkSortMode: any
    nodeThickness: SankeyCommonProps<Id>['nodeThickness']
    nodeSpacing: SankeyCommonProps<Id>['nodeSpacing']
    nodeInnerPadding: SankeyCommonProps<Id>['nodeInnerPadding']
    width: number
    height: number
    getColor: (node: Omit<SankeyNodeDatum<Id>, 'color' | 'label'>) => string
    getLabel: (node: Omit<SankeyNodeDatum<Id>, 'color' | 'label'>) => string | number
}) => {
    const sankey = d3Sankey()
        .nodeAlign(alignFunction)
        .nodeSort(sortFunction)
        // @ts-ignore: this method is not available in @types/d3-sankey
        .linkSort(linkSortMode)
        .nodeWidth(nodeThickness)
        .nodePadding(nodeSpacing)
        .size(layout === 'horizontal' ? [width, height] : [height, width])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    // we need a different identity for correct updates
    const data = (cloneDeep(_data) as unknown) as {
        nodes: SankeyNodeDatum<Id>[]
        links: SankeyLinkDatum<Id>[]
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

export const useSankey = <Id extends SankeyId>({
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
    data: SankeyDataProps<Id>['data']
    valueFormat?: SankeyCommonProps<Id>['valueFormat']
    layout: SankeyCommonProps<Id>['layout']
    width: number
    height: number
    sort: SankeyCommonProps<Id>['sort']
    align: SankeyCommonProps<Id>['align']
    colors: SankeyCommonProps<Id>['colors']
    nodeThickness: SankeyCommonProps<Id>['nodeThickness']
    nodeSpacing: SankeyCommonProps<Id>['nodeSpacing']
    nodeInnerPadding: SankeyCommonProps<Id>['nodeInnerPadding']
    nodeBorderColor: SankeyCommonProps<Id>['nodeBorderColor']
    label: SankeyCommonProps<Id>['label']
    labelTextColor: SankeyCommonProps<Id>['labelTextColor']
}) => {
    const [currentNode, setCurrentNode] = useState<SankeyNodeDatum<Id> | null>(null)
    const [currentLink, setCurrentLink] = useState<SankeyLinkDatum<Id> | null>(null)

    const sortFunction = useMemo(() => {
        if (sort === 'auto') return undefined
        if (sort === 'input') return null
        if (sort === 'ascending') return (a, b) => a.value - b.value
        if (sort === 'descending') return (a, b) => b.value - a.value

        return sort
    }, [sort])

    // If "input" sorting is used, apply this setting to links, too.
    // (In d3, `null` means input sorting and `undefined` is the default)
    const linkSortMode = sort === 'input' ? null : undefined

    const alignFunction = useMemo(() => sankeyAlignmentFromProp(align), [align])

    const theme = useTheme()

    const getColor = useOrdinalColorScale(colors, 'id')
    const getNodeBorderColor = useInheritedColor(nodeBorderColor, theme)

    const getLabel = usePropertyAccessor<
        Omit<SankeyNodeDatum<Id>, 'color' | 'label'>,
        string | number
    >(label)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const formatValue = useValueFormatter<number>(valueFormat)

    const { nodes, links } = useMemo(
        () =>
            computeNodeAndLinks<Id>({
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
