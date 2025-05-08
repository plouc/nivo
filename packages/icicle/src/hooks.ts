import { useCallback, useMemo, useState, useContext } from 'react'
import cloneDeep from 'lodash/cloneDeep.js'
import omit from 'lodash/omit.js'
import { partition as d3Partition, hierarchy as d3Hierarchy, HierarchyNode } from 'd3-hierarchy'
import { usePropertyAccessor, useValueFormatter, ChartContext } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { useNodeRefs } from '@nivo/rects'
import { commonDefaultProps } from './defaults'
import {
    DataProps,
    IcicleCommonProps,
    IcicleNode,
    IcicleChartContext,
    IcicleZoomFunction,
    IcicleOrientation,
    IcicleNodesA11yProps,
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

/**
 * This hook handles computing the base nodes for the icicle chart.
 * This is the first step in the computing process, then the nodes might
 * be altered by the zooming process.
 */
const useIcicleNodes = <Datum>({
    data,
    getValue,
    sort,
    orientation,
    width,
    height,
    getIdentity,
    formatValue,
    inheritColorFromParent,
    getColor,
    getChildColor,
}: {
    data: DataProps<Datum>['data']
    getValue: (node: Datum) => number
    sort: IcicleCommonProps<Datum>['sort']
    orientation: IcicleCommonProps<Datum>['orientation']
    width: number
    height: number
    getIdentity: (node: Datum) => string
    formatValue: (value: number) => string
    inheritColorFromParent: IcicleCommonProps<Datum>['inheritColorFromParent']
    getColor: (node: Omit<IcicleNode<Datum>, 'color' | 'fill'>) => string
    getChildColor: (node: IcicleNode<Datum>) => string
}) =>
    useMemo(() => {
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

        const nodeByPath: Record<string, IcicleNode<Datum>> = {}
        const nodes = partition(hierarchy)
            .descendants()
            .map((node, index, allNodes) => {
                const id = getIdentity(node.data)
                // d3 hierarchy node value is optional by default as it depends on
                // a call to `count()` or `sum()`, and we previously called `sum()`.
                const value = node.value!
                const percentage = (100 * value) / total
                const { path, pathComponents } = computeNodePath(node, getIdentity)

                let { x0, x1, y0, y1 } = node
                if (isHorizontal) {
                    ;[x0, x1, y0, y1] = [node.y0, node.y1, node.x0, node.x1]
                }

                const nodeWidth = x1 - x0
                const nodeHeight = y1 - y0

                if (orientation === 'left') {
                    x0 = width - x1
                } else if (orientation === 'top') {
                    y0 = height - y1
                }

                const parent = node.parent
                    ? nodeByPath[pathComponents.slice(0, -1).join('.')]
                    : undefined

                const maxDescendantDepth =
                    node.height > 0
                        ? Math.max(...node.leaves().map(leaf => leaf.depth))
                        : node.depth

                const previousPath =
                    index > 0 && allNodes[index - 1].depth === node.depth
                        ? computeNodePath(allNodes[index - 1], getIdentity).path
                        : null

                const nextPath =
                    index < allNodes.length - 1 && allNodes[index + 1].depth === node.depth
                        ? computeNodePath(allNodes[index + 1], getIdentity).path
                        : null

                const firstChildPath =
                    node.children && node.children.length > 0
                        ? computeNodePath(node.children[0], getIdentity).path
                        : null

                const normalizedNode: IcicleNode<Datum> = {
                    id,
                    path,
                    pathComponents,
                    value,
                    percentage,
                    rect: {
                        x: x0,
                        y: y0,
                        width: nodeWidth,
                        height: nodeHeight,
                    },
                    isVisible: true,
                    formattedValue: formatValue(value),
                    color: '',
                    data: omit(node.data!, 'children'),
                    depth: node.depth,
                    height: node.height,
                    maxDescendantDepth,
                    nav: {
                        up: parent?.path ?? null,
                        prev: previousPath,
                        next: nextPath,
                        down: firstChildPath,
                    },
                    a11y: {},
                }

                if (inheritColorFromParent && parent && normalizedNode.depth > 1) {
                    normalizedNode.color = getChildColor(parent)
                } else {
                    normalizedNode.color = getColor(normalizedNode)
                }

                nodeByPath[path] = normalizedNode
                return normalizedNode
            })

        return {
            nodes,
            nodeByPath,
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

const useIcicleA11y = <Datum>({
    nodes,
    isEnabled,
    isFocusable,
    nodeRole,
    nodeAriaLabel,
    nodeAriaLabelledBy,
    nodeAriaDescribedBy,
    nodeAriaHidden,
    nodeAriaDisabled,
}: {
    nodes: readonly IcicleNode<Datum>[]
    isEnabled: boolean
    isFocusable: boolean
} & Omit<IcicleNodesA11yProps<Datum>, 'isFocusable'>) =>
    useMemo(() => {
        if (!isEnabled) return nodes

        const getRole =
            nodeRole === undefined
                ? undefined
                : typeof nodeRole === 'string'
                  ? () => nodeRole
                  : nodeRole

        return nodes.map(node => ({
            ...node,
            a11y: {
                isFocusable,
                role: getRole?.(node),
                label: nodeAriaLabel?.(node),
                labelledBy: nodeAriaLabelledBy?.(node),
                describedBy: nodeAriaDescribedBy?.(node),
                level: node.depth + 1,
                hidden: nodeAriaHidden?.(node),
                disabled: nodeAriaDisabled?.(node),
            },
        }))
    }, [
        nodes,
        isFocusable,
        isEnabled,
        nodeRole,
        nodeAriaLabel,
        nodeAriaLabelledBy,
        nodeAriaDescribedBy,
        nodeAriaHidden,
        nodeAriaDisabled,
    ])

const calculateZoomMult = (size: number, totalSize: number, offset: number) => [
    totalSize / size,
    offset * (totalSize / size) * -1,
]

/**
 * This hook handles re-computing all nodes if a node is currently zoomed.
 */
const useIcicleZoom = <Datum>({
    nodes,
    nodeByPath,
    orientation,
    enableZooming,
    zoomMode,
    width,
    height,
}: {
    nodes: readonly IcicleNode<Datum>[]
    nodeByPath: Record<string, IcicleNode<Datum>>
    orientation: IcicleCommonProps<Datum>['orientation']
    enableZooming: IcicleCommonProps<Datum>['enableZooming']
    zoomMode: IcicleCommonProps<Datum>['zoomMode']
    width: number
    height: number
}) => {
    const [zoomedNodePath, setZoomedNodePath] = useState<string | null>(null)

    const zoom = useCallback(
        (nodePath: string | null) => {
            if (!enableZooming) return null

            setZoomedNodePath(prev => {
                if (prev === nodePath) return null
                return nodePath
            })
        },
        [enableZooming, setZoomedNodePath]
    )

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
                const isBottom = orientation === 'bottom'
                const aggregatedHeight = deepestDescendant
                    ? isBottom
                        ? deepestDescendant.rect.y +
                          deepestDescendant.rect.height -
                          zoomedNode.rect.y
                        : zoomedNode.rect.y + zoomedNode.rect.height - deepestDescendant.rect.y
                    : zoomedNode.rect.height

                const y = isBottom
                    ? zoomedNode.rect.y
                    : (deepestDescendant?.rect.y ?? zoomedNode.rect.y)

                ;[yMult, yOffset] = calculateZoomMult(aggregatedHeight, height, y)
            }
        } else {
            ;[yMult, yOffset] = calculateZoomMult(zoomedNode.rect.height, height, zoomedNode.rect.y)

            if (needsDepthScaling) {
                const isRight = orientation === 'right'
                const aggregatedWidth = deepestDescendant
                    ? isRight
                        ? deepestDescendant.rect.x +
                          deepestDescendant.rect.width -
                          zoomedNode.rect.x
                        : zoomedNode.rect.x + zoomedNode.rect.width - deepestDescendant.rect.x
                    : zoomedNode.rect.width

                const x = isRight
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

    return {
        zoomedNodes,
        zoom,
    }
}

/**
 * This hook handles the spacing between nodes, we cannot use d3.partition.padding
 * due to zooming, otherwise the spacing would be scaled as well when zooming.
 *
 * The nodes with a width or height of 0, after spacing, are kept,
 * this is not ideal, but this is important for keyboard navigation
 * and transitions.
 */
const useIcicleSpacing = <Datum>({
    nodes,
    gapX,
    gapY,
}: {
    nodes: readonly IcicleNode<Datum>[]
    gapX: IcicleCommonProps<Datum>['gapX']
    gapY: IcicleCommonProps<Datum>['gapY']
}) =>
    useMemo(() => {
        const spacedNodeByPath: Record<string, IcicleNode<Datum>> = {}

        return {
            spacedNodes: nodes.map(node => {
                const spacedNode = {
                    ...node,
                    rect: {
                        x: node.rect.x + gapX / 2,
                        y: node.rect.y + gapY / 2,
                        width: Math.max(node.rect.width - gapX, 0),
                        height: Math.max(node.rect.height - gapY, 0),
                    },
                }
                spacedNodeByPath[node.path] = spacedNode
                return spacedNode
            }),
            spacedNodeByPath,
        }
    }, [nodes, gapX, gapY])

/**
 * This hook handles the main logic of the icicle chart.
 *
 * The logic is split into three parts:
 * 1. Computing base nodes
 * 2. Add a11y properties
 * 3. Applying the zoom
 * 4. Applying the spacing
 *
 * This might not be the most efficient, but this is the best we can do for now.
 */
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
    isFocusable = false,
    withA11y = false,
    nodeRole,
    nodeAriaLabel,
    nodeAriaLabelledBy,
    nodeAriaDescribedBy,
    nodeAriaHidden,
    nodeAriaDisabled,
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
        isFocusable?: boolean
        withA11y?: boolean
    } & Omit<IcicleNodesA11yProps<Datum>, 'isFocusable'>) => {
    const getIdentity = usePropertyAccessor(identity)
    const getValue = usePropertyAccessor(value)
    const formatValue = useValueFormatter(valueFormat)

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getChildColor = useInheritedColor(childColor, theme)

    const { nodes, nodeByPath } = useIcicleNodes<Datum>({
        data,
        getValue,
        sort,
        orientation,
        width,
        height,
        getIdentity,
        formatValue,
        inheritColorFromParent,
        getColor,
        getChildColor,
    })

    const nodesWithA11y = useIcicleA11y<Datum>({
        nodes,
        isEnabled: withA11y,
        isFocusable,
        nodeRole,
        nodeAriaLabel,
        nodeAriaLabelledBy,
        nodeAriaDescribedBy,
        nodeAriaHidden,
        nodeAriaDisabled,
    })

    const { zoomedNodes, zoom } = useIcicleZoom<Datum>({
        nodes: nodesWithA11y,
        nodeByPath,
        orientation,
        enableZooming,
        zoomMode,
        width,
        height,
    })

    const { spacedNodes, spacedNodeByPath } = useIcicleSpacing<Datum>({
        nodes: zoomedNodes,
        gapX,
        gapY,
    })

    return {
        nodes: spacedNodes,
        nodeByPath: spacedNodeByPath,
        zoom,
    }
}

export const useIcicleNav = <Datum>(
    nodes: IcicleNode<Datum>[],
    nodeByPath: Record<string, IcicleNode<Datum>>
) => {
    const nodeRefs = useNodeRefs(nodes.map(node => node.path))

    const nav = useMemo(() => {
        const moveTo = (nodePath: string, to: keyof IcicleNode<Datum>['nav']) => {
            const node = nodeByPath[nodePath]
            if (!node || !node.nav[to]) return

            const target = nodeByPath[node.nav[to]]
            if (!target) return

            const ref = nodeRefs.current[target.path]
            if (!ref || !ref.current) return

            ref.current.focus()
        }

        const moveUp = (nodePath: string) => {
            moveTo(nodePath, 'up')
        }

        const movePrev = (nodePath: string) => {
            moveTo(nodePath, 'prev')
        }

        const moveNext = (nodePath: string) => {
            moveTo(nodePath, 'next')
        }

        const moveDown = (nodePath: string) => {
            moveTo(nodePath, 'down')
        }

        return {
            moveUp,
            movePrev,
            moveNext,
            moveDown,
        }
    }, [nodeRefs, nodeByPath])

    return {
        nodeRefs,
        nav,
    }
}

export const useMemoizeChartContext = <Context>(
    {
        orientation,
        zoom,
    }: {
        orientation: IcicleOrientation
        zoom: IcicleZoomFunction
    },
    extra: Context
): IcicleChartContext<Context> =>
    useMemo(() => ({ orientation, zoom, ...extra }), [orientation, zoom, extra])

/**
 * This hook returns the chart context, which contains global properties
 * that might be useful when using custom components for nodes or labels.
 *
 * Let's say you want to create a custom node/label component, and you want
 * to pass a custom function to the nodes or labels which requires a state
 * defined outside the Icicle chart.
 * Without the context, you would have to pass the state down to the node/label,
 * which is not ideal, you would have to make the node/label component dynamic,
 * defeating the purpose of memoization.
 * With the context, you're able to define custom components externally while
 * still having access to the chart context.
 */
export const useIcicleContext = <Context = Record<string, unknown>>() => {
    const ctx = useContext(ChartContext)
    if (!ctx) {
        throw new Error('No context found, make sure to use the component inside a chart component')
    }

    return ctx as IcicleChartContext<Context>
}
