import { useState, useMemo } from 'react'
import cloneDeep from 'lodash/cloneDeep.js'
import { sankey as d3Sankey } from 'd3-sankey'
import { usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useTheme } from '@nivo/theming'
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
    nodePositions,
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
    nodePositions?: Record<string, { x?: number; y?: number }>
}) => {
    const sankey = d3Sankey()
        .nodeAlign(alignFunction)
        .nodeSort(sortFunction as any)
        .linkSort(linkSortMode as any)
        .nodeWidth(nodeThickness)
        .nodePadding(nodeSpacing)
        .size(layout === 'horizontal' ? [width, height] : [height, width])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    // we need a different identity for correct updates
    const data = cloneDeep(_data) as unknown as {
        nodes: SankeyNodeDatum<N, L>[]
        links: SankeyLinkDatum<N, L>[]
    }
    sankey(data)

    data.nodes.forEach(node => {
        // Apply explicit positions provided via nodePositions map first
        if (nodePositions) {
            const override = nodePositions[node.id as unknown as string]
            if (override) {
                if (override.x !== undefined) node.manualX = override.x
                if (override.y !== undefined) node.manualY = override.y
            }
        }

        node.color = getColor(node)
        node.label = getLabel(node)
        node.formattedValue = formatValue(node.value)

        // Apply manual positions if provided  
        if ('manualX' in node && node.manualX !== undefined) {  
            const thickness = node.x1 - node.x0;  
            node.x0 = node.manualX;  
            node.x1 = node.manualX + thickness;  
        }  
            
        if ('manualY' in node && node.manualY !== undefined) {  
            const height = node.y1 - node.y0;  
            node.y0 = node.manualY;  
            node.y1 = node.manualY + height;  
        }

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
        // @ts-expect-error: @types/d3-sankey
        link.thickness = link.width
    })

    // ------------------------------------------------------------------
    // Re-compute link positions so they follow nodes after any manual
    // node positioning override. We compute each link vertical/horizontal
    // offset by stacking the link thicknesses within its source and target
    // node. This replaces the original y0/y1 based positions coming from
    // d3-sankey which are now out of sync once nodes have been moved.
    // ------------------------------------------------------------------
    data.nodes.forEach((node: SankeyNodeDatum<N, L>) => {
        if (layout === 'horizontal') {
            // Outgoing links (left → right)
            let sy = 0
            node.sourceLinks.forEach(link => {
                link.pos0 = node.y0 + sy + link.thickness / 2
                sy += link.thickness
            })

            // Incoming links (left ← right)
            let ty = 0
            node.targetLinks.forEach(link => {
                link.pos1 = node.y0 + ty + link.thickness / 2
                ty += link.thickness
            })
        } else {
            // Vertical layout, we stack along the X axis instead of Y.
            let sx = 0
            node.sourceLinks.forEach(link => {
                link.pos0 = node.x0 + sx + link.thickness / 2
                sx += link.thickness
            })

            let tx = 0
            node.targetLinks.forEach(link => {
                link.pos1 = node.x0 + tx + link.thickness / 2
                tx += link.thickness
            })
        }
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
    nodePositions,
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
    nodePositions?: Record<string, { x?: number; y?: number }>
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
                nodePositions,
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
            nodePositions,
        ]
    )

    const legendData = useMemo(
        () =>
            nodes.map((node: SankeyNodeDatum<N, L>) => ({
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
