import { useCallback, useMemo, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep.js'
import sortBy from 'lodash/sortBy.js'
import omit from 'lodash/omit.js'
import { partition as d3Partition, hierarchy as d3Hierarchy, HierarchyNode } from 'd3-hierarchy'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { Rect } from '@nivo/rects'
import { commonDefaultProps } from './defaults'
import { DataProps, IcicleCommonProps, ComputedDatum, IcicleCommonCustomLayerProps } from './types'

const computeNodePath = <Datum>(
    node: HierarchyNode<Datum>,
    getIdentity: (node: Datum) => string
) => {
    const path = node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .reverse()

    return { path: path.join('.'), pathComponents: path }
}

export const useIcicle = <Datum>({
    data,
    identity = commonDefaultProps.identity as IcicleCommonProps<Datum>['identity'],
    value = commonDefaultProps.value as IcicleCommonProps<Datum>['value'],
    valueFormat,
    orientation = commonDefaultProps.orientation,
    padding = commonDefaultProps.padding,
    colors = commonDefaultProps.colors as IcicleCommonProps<Datum>['colors'],
    colorBy = commonDefaultProps.colorBy,
    inheritColorFromParent = commonDefaultProps.inheritColorFromParent,
    childColor = commonDefaultProps.childColor as IcicleCommonProps<Datum>['childColor'],
    width,
    height,
}: DataProps<Datum> &
    Pick<
        IcicleCommonProps<Datum>,
        | 'identity'
        | 'value'
        | 'valueFormat'
        | 'orientation'
        | 'padding'
        | 'colors'
        | 'colorBy'
        | 'inheritColorFromParent'
        | 'childColor'
    > & {
        width: number
        height: number
    }) => {
    const getIdentity = usePropertyAccessor(identity)
    const getValue = usePropertyAccessor(value)
    const formatValue = useValueFormatter(valueFormat)

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getChildColor = useInheritedColor(childColor, theme)

    const { nodes, nodeByPath } = useMemo(() => {
        // D3 mutates the data for performance reasons.
        // However, it does not work well with reactive programming.
        // This ensures that we don't mutate the input data.
        const clonedData = cloneDeep(data)

        const hierarchy = d3Hierarchy<Datum>(clonedData).sum(getValue)
        // .sort((a, b) => b.height - a.height || b.value! - a.value!)

        const isHorizontal = orientation === 'left' || orientation === 'right'

        const partition = d3Partition<Datum>()
            .size(isHorizontal ? [height, width] : [width, height])
            .padding(padding)

        const descendants = partition(hierarchy).descendants()

        const total = hierarchy.value ?? 0

        // It's important to sort node by depth.
        // It ensures that we assign a parent node which has already been computed.
        // Because parent nodes are going to be computed first.
        const sortedNodes = sortBy(descendants, 'depth')

        const nodeByPath: Record<string, ComputedDatum<Datum>> = {}

        return {
            nodeByPath,
            nodes: sortedNodes.reduce<ComputedDatum<Datum>[]>((acc, node) => {
                const id = getIdentity(node.data)
                // d3 hierarchy node value is optional by default as it depends on
                // a call to `count()` or `sum()`, and we previously called `sum()`.
                const value = node.value!
                const percentage = (100 * value) / total
                const { path, pathComponents } = computeNodePath(node, getIdentity)

                let { x0, x1, y0, y1 } = node
                if (isHorizontal) {
                    x0 = node.y0
                    x1 = node.y1
                    y0 = node.x0
                    y1 = node.x1
                }

                const nodeWidth = x1 - x0
                const nodeHeight = y1 - y0

                if (orientation === 'left') {
                    x0 = width - x1
                } else if (orientation === 'top') {
                    y0 = height - y1
                }

                const rect: Rect = {
                    x: x0,
                    y: y0,
                    width: nodeWidth,
                    height: nodeHeight,
                }

                let parent: ComputedDatum<Datum> | undefined
                if (node.parent) {
                    const parentPath = pathComponents.slice(0, -1).join('.')
                    parent = nodeByPath[parentPath]
                }

                const normalizedNode: ComputedDatum<Datum> = {
                    id,
                    path,
                    pathComponents,
                    value,
                    percentage,
                    rect,
                    formattedValue: formatValue(value),
                    color: '',
                    data: omit(node.data!, 'children'),
                    depth: node.depth,
                    height: node.height,
                }

                if (inheritColorFromParent && parent && normalizedNode.depth > 1) {
                    normalizedNode.color = getChildColor(parent, normalizedNode)
                } else {
                    normalizedNode.color = getColor(normalizedNode)
                }

                nodeByPath[path] = normalizedNode

                return [...acc, normalizedNode]
            }, []),
        }
    }, [
        data,
        getValue,
        getIdentity,
        valueFormat,
        formatValue,
        getColor,
        inheritColorFromParent,
        getChildColor,
        width,
        height,
        orientation,
        padding,
    ])

    const [zoomedNodePath, setZoomedNodePath] = useState<string | null>(null)

    const zoomedNodes = useMemo(() => {
        if (!zoomedNodePath) return nodes

        const zoomedNode = nodeByPath[zoomedNodePath]
        if (!zoomedNode) return nodes

        const isHorizontal = orientation === 'left' || orientation === 'right'

        let xMult = 1
        let xOffset = 0
        let yMult = 1
        let yOffset = 0

        if (!isHorizontal) {
            xMult = width / zoomedNode.rect.width
            xOffset = zoomedNode.rect.x * xMult * -1
        } else {
            yMult = height / zoomedNode.rect.height
            yOffset = zoomedNode.rect.y * yMult * -1
        }

        return nodes.map(node => ({
            ...node,
            rect: {
                x: xOffset + node.rect.x * xMult,
                y: yOffset + node.rect.y * yMult,
                width: node.rect.width * xMult,
                height: node.rect.height * yMult,
            },
        }))
    }, [zoomedNodePath, nodes, nodeByPath, width, height])

    const zoom = useCallback(
        (nodePath: string | null) => {
            setZoomedNodePath(prev => {
                if (prev === nodePath) return null
                return nodePath
            })
        },
        [setZoomedNodePath]
    )

    return {
        nodes: zoomedNodes,
        zoom,
    }
}

/**
 * Memoize the context to pass to custom layers.
 */
export const useIcicleCustomLayerProps = <Datum>({
    nodes,
    zoom,
}: IcicleCommonCustomLayerProps<Datum>): IcicleCommonCustomLayerProps<Datum> =>
    useMemo(
        () => ({
            nodes,
            zoom,
        }),
        [nodes]
    )
