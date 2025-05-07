import { useCallback, useMemo, useState, useContext } from 'react'
import cloneDeep from 'lodash/cloneDeep.js'
import omit from 'lodash/omit.js'
import { partition as d3Partition, hierarchy as d3Hierarchy, HierarchyNode } from 'd3-hierarchy'
import { usePropertyAccessor, useValueFormatter, ChartContext } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { Rect } from '@nivo/rects'
import { commonDefaultProps } from './defaults'
import {
    DataProps,
    IcicleCommonProps,
    ComputedDatum,
    IcicleCommonCustomLayerProps,
    IcicleChartContext,
    IcicleZoomFunction,
} from './types'

const computeNodePath = <Datum>(
    node: HierarchyNode<Datum>,
    getIdentity: (node: Datum) => string
) => {
    const path = node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .reverse()

    return {
        path: path.join('.'),
        pathComponents: path,
    }
}

const sortAscending =
    <Datum>() =>
    (a: HierarchyNode<Datum>, b: HierarchyNode<Datum>) =>
        a.height - b.height || a.value! - b.value!
const sortDescending =
    <Datum>() =>
    (a: HierarchyNode<Datum>, b: HierarchyNode<Datum>) =>
        b.height - a.height || b.value! - a.value!

const calculateZoomMult = (size: number, totalSize: number, offset: number) => [
    totalSize / size,
    offset * (totalSize / size) * -1,
]

export const useIcicle = <Datum>({
    data,
    sort = commonDefaultProps.sort as IcicleCommonProps<Datum>['sort'],
    identity = commonDefaultProps.identity as IcicleCommonProps<Datum>['identity'],
    value = commonDefaultProps.value as IcicleCommonProps<Datum>['value'],
    valueFormat,
    width,
    height,
    orientation = commonDefaultProps.orientation,
    gapX = commonDefaultProps.gapX,
    gapY = commonDefaultProps.gapY,
    colors = commonDefaultProps.colors as IcicleCommonProps<Datum>['colors'],
    colorBy = commonDefaultProps.colorBy,
    inheritColorFromParent = commonDefaultProps.inheritColorFromParent,
    childColor = commonDefaultProps.childColor as IcicleCommonProps<Datum>['childColor'],
    enableZooming = commonDefaultProps.enableZooming,
    zoomMode = commonDefaultProps.zoomMode,
}: DataProps<Datum> &
    Pick<
        IcicleCommonProps<Datum>,
        | 'sort'
        | 'identity'
        | 'value'
        | 'valueFormat'
        | 'orientation'
        | 'gapX'
        | 'gapY'
        | 'colors'
        | 'colorBy'
        | 'inheritColorFromParent'
        | 'childColor'
        | 'enableZooming'
        | 'zoomMode'
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
        if (sort === 'asc') hierarchy.sort(sortAscending<Datum>())
        else if (sort === 'desc') hierarchy.sort(sortDescending<Datum>())

        const total = hierarchy.value ?? 0

        const isHorizontal = orientation === 'left' || orientation === 'right'
        const partition = d3Partition<Datum>().size(
            isHorizontal ? [height, width] : [width, height]
        )

        const nodeByPath: Record<string, ComputedDatum<Datum>> = {}

        return {
            nodeByPath,
            nodes: partition(hierarchy)
                .descendants()
                .reduce<ComputedDatum<Datum>[]>((acc, node) => {
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

                    let maxDescendantDepth = node.depth
                    if (node.height > 0) {
                        const nodeLeaves = node.leaves().sort((a, b) => b.depth - a.depth)
                        if (nodeLeaves.length > 0) maxDescendantDepth = nodeLeaves[0].depth
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
                        maxDescendantDepth,
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
        sort,
        getValue,
        getIdentity,
        formatValue,
        getColor,
        inheritColorFromParent,
        getChildColor,
        width,
        height,
        orientation,
    ])

    const [zoomedNodePath, setZoomedNodePath] = useState<string | null>(null)

    const zoomedNodes = useMemo(() => {
        if (!enableZooming || !zoomedNodePath) return nodes

        const zoomedNode = nodeByPath[zoomedNodePath]
        if (!zoomedNode) return nodes

        const isHorizontal = orientation === 'left' || orientation === 'right'
        let xMult = 1,
            xOffset = 0,
            yMult = 1,
            yOffset = 0

        const needsDepthScaling = zoomMode === 'global' && zoomedNode.depth > 0
        const deepestDescendant =
            needsDepthScaling && zoomedNode.maxDescendantDepth > zoomedNode.height
                ? nodes.find(node => node.depth === zoomedNode.maxDescendantDepth)
                : undefined

        if (!isHorizontal) {
            ;[xMult, xOffset] = calculateZoomMult(zoomedNode.rect.width, width, zoomedNode.rect.x)

            if (needsDepthScaling) {
                const isBottomOrientation = orientation === 'bottom'
                const aggregatedHeight = deepestDescendant
                    ? isBottomOrientation
                        ? deepestDescendant.rect.y +
                          deepestDescendant.rect.height -
                          zoomedNode.rect.y
                        : zoomedNode.rect.y + zoomedNode.rect.height - deepestDescendant.rect.y
                    : zoomedNode.rect.height

                const y = isBottomOrientation
                    ? zoomedNode.rect.y
                    : (deepestDescendant?.rect.y ?? zoomedNode.rect.y)

                ;[yMult, yOffset] = calculateZoomMult(aggregatedHeight, height, y)
            }
        } else {
            ;[yMult, yOffset] = calculateZoomMult(zoomedNode.rect.height, height, zoomedNode.rect.y)

            if (needsDepthScaling) {
                const isRightOrientation = orientation === 'right'
                const aggregatedWidth = deepestDescendant
                    ? isRightOrientation
                        ? deepestDescendant.rect.x +
                          deepestDescendant.rect.width -
                          zoomedNode.rect.x
                        : zoomedNode.rect.x + zoomedNode.rect.width - deepestDescendant.rect.x
                    : zoomedNode.rect.width

                const x = isRightOrientation
                    ? zoomedNode.rect.x
                    : (deepestDescendant?.rect.x ?? zoomedNode.rect.x)

                ;[xMult, xOffset] = calculateZoomMult(aggregatedWidth, width, x)
            }
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
    }, [enableZooming, zoomMode, zoomedNodePath, nodes, nodeByPath, width, height, orientation])

    const spacedNodes = useMemo(() => {
        return zoomedNodes.map(node => {
            return {
                ...node,
                rect: {
                    x: node.rect.x + gapX / 2,
                    y: node.rect.y + gapY / 2,
                    width: node.rect.width - gapX,
                    height: node.rect.height - gapY,
                },
            }
        })
    }, [zoomedNodes, gapX, gapY])

    const zoom = useCallback(
        (nodePath: string | null) => {
            if (!enableZooming) return

            setZoomedNodePath(prev => {
                if (prev === nodePath) return null
                return nodePath
            })
        },
        [enableZooming, setZoomedNodePath]
    )

    return {
        nodes: spacedNodes,
        zoom,
    }
}

export const useMemoizeChartContext = <Context>(
    zoom: IcicleZoomFunction,
    extra: Context
): IcicleChartContext<Context> => useMemo(() => ({ zoom, ...extra }), [zoom, extra])

export const useIcicleContext = <Context = Record<string, unknown>>() => {
    const ctx = useContext(ChartContext)
    if (!ctx) {
        throw new Error('No context found, make sure to use the component inside a chart component')
    }

    return ctx as IcicleChartContext<Context>
}

export const useIcicleCustomLayerProps = <Datum>({
    nodes,
    zoom,
}: IcicleCommonCustomLayerProps<Datum>): IcicleCommonCustomLayerProps<Datum> =>
    useMemo(
        () => ({
            nodes,
            zoom,
        }),
        [nodes, zoom]
    )
