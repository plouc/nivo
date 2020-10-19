import { useState, useMemo } from 'react'
import { cloneDeep } from 'lodash'
import { sankey as d3Sankey } from 'd3-sankey'
import { useTheme, getLabelGenerator } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { sankeyAlignmentFromProp } from './props'

const getId = d => d.id

export const computeNodeAndLinks = ({
    data: _data,
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
    getLinkColor,
    getLabel,
}) => {
    const sankey = d3Sankey()
        .nodeAlign(alignFunction)
        .nodeSort(sortFunction)
        .linkSort(linkSortMode)
        .nodeWidth(nodeThickness)
        .nodePadding(nodeSpacing)
        .size(layout === 'horizontal' ? [width, height] : [height, width])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    // we need a different identity for correct updates
    const data = cloneDeep(_data)
    sankey(data)

    data.nodes.forEach(node => {
        node.color = getColor(node)
        node.label = getLabel(node)
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
        link.color = getLinkColor(link)
        link.pos0 = link.y0
        link.pos1 = link.y1
        link.thickness = link.width
        delete link.y0
        delete link.y1
        delete link.width
    })

    return data
}

export const useSankey = ({
    data,
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
    labelFormat,
    labelTextColor,
}) => {
    const [currentNode, setCurrentNode] = useState(null)
    const [currentLink, setCurrentLink] = useState(null)

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
    const getLinkColor = useOrdinalColorScale(colors, 'source.id')

    const getLabel = useMemo(() => getLabelGenerator(label, labelFormat), [label, labelFormat])
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)

    const { nodes, links } = useMemo(
        () =>
            computeNodeAndLinks({
                data,
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
                getLinkColor,
                getLabel,
            }),
        [
            data,
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
            getLinkColor,
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
