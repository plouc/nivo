import { createElement, useCallback, useMemo, MouseEvent } from 'react'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import startCase from 'lodash/startCase'
import {
    treemap as d3Treemap,
    hierarchy,
    HierarchyNode,
    HierarchyRectangularNode,
} from 'd3-hierarchy'
import {
    useTheme,
    useValueFormatter,
    PropertyAccessor,
    usePropertyAccessor,
    useTooltip,
} from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { commonDefaultProps } from './defaults'
import {
    DefaultTreeMapDatum,
    TreeMapCommonProps,
    TreeMapDataProps,
    ComputedNode,
    ComputedNodeWithoutStyles,
    ComputedNodeWithHandlers,
    CustomLayerProps,
} from './types'
import { tileByType } from './tiling'

export const useTreeMapLayout = <Datum extends object>({
    width,
    height,
    tile,
    innerPadding,
    outerPadding,
    enableParentLabel,
    parentLabelSize,
    parentLabelPosition,
    leavesOnly,
}: {
    width: number
    height: number
    tile: TreeMapCommonProps<Datum>['tile']
    innerPadding: TreeMapCommonProps<Datum>['innerPadding']
    outerPadding: TreeMapCommonProps<Datum>['outerPadding']
    enableParentLabel: TreeMapCommonProps<Datum>['enableParentLabel']
    parentLabelSize: TreeMapCommonProps<Datum>['parentLabelSize']
    parentLabelPosition: TreeMapCommonProps<Datum>['parentLabelPosition']
    leavesOnly: TreeMapCommonProps<Datum>['leavesOnly']
}) =>
    useMemo(() => {
        const treemap = d3Treemap<Datum>()
            .size([width, height])
            .tile(tileByType[tile])
            .round(true)
            .paddingInner(innerPadding)
            .paddingOuter(outerPadding)

        if (enableParentLabel && !leavesOnly) {
            const parentLabelPadding = parentLabelSize + outerPadding * 2
            // @ts-ignore
            treemap[`padding${startCase(parentLabelPosition)}`](parentLabelPadding)
        }

        return treemap
    }, [
        width,
        height,
        tile,
        innerPadding,
        outerPadding,
        enableParentLabel,
        parentLabelSize,
        parentLabelPosition,
        leavesOnly,
    ])

export const useHierarchy = <Datum extends object>({
    root,
    getValue,
}: {
    root: Datum
    getValue: (datum: Datum) => number
}) => useMemo(() => hierarchy<Datum>(root).sum(getValue), [root, getValue])

const computeNodeIdAndPath = <Datum extends object>(
    node: HierarchyNode<Datum>,
    getIdentity: (node: Datum) => string
) => {
    const path = node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .reverse()

    return { path: path.join('.'), pathComponents: path }
}

export const useTreeMap = <Datum extends object = DefaultTreeMapDatum>({
    data,
    width,
    height,
    identity = commonDefaultProps.identity as PropertyAccessor<Datum, string>,
    value = commonDefaultProps.value as PropertyAccessor<Datum, number>,
    valueFormat,
    leavesOnly = commonDefaultProps.leavesOnly,
    tile = commonDefaultProps.tile,
    innerPadding = commonDefaultProps.innerPadding,
    outerPadding = commonDefaultProps.outerPadding,
    label = commonDefaultProps.label as TreeMapCommonProps<Datum>['label'],
    orientLabel = commonDefaultProps.orientLabel,
    enableParentLabel = commonDefaultProps.enableParentLabel,
    parentLabel = commonDefaultProps.parentLabel as TreeMapCommonProps<Datum>['parentLabel'],
    parentLabelSize = commonDefaultProps.parentLabelSize,
    parentLabelPosition = commonDefaultProps.parentLabelPosition,
    parentLabelPadding = commonDefaultProps.parentLabelPadding,
    colors = commonDefaultProps.colors as TreeMapCommonProps<Datum>['colors'],
    colorBy = commonDefaultProps.colorBy as TreeMapCommonProps<Datum>['colorBy'],
    nodeOpacity = commonDefaultProps.nodeOpacity,
    borderColor = commonDefaultProps.borderColor as TreeMapCommonProps<Datum>['borderColor'],
    labelTextColor = commonDefaultProps.labelTextColor as TreeMapCommonProps<Datum>['labelTextColor'],
    parentLabelTextColor = commonDefaultProps.parentLabelTextColor as TreeMapCommonProps<Datum>['parentLabelTextColor'],
}: {
    data: TreeMapDataProps<Datum>['data']
    width: number
    height: number
    identity?: TreeMapCommonProps<Datum>['identity']
    value?: TreeMapCommonProps<Datum>['value']
    valueFormat?: TreeMapCommonProps<Datum>['valueFormat']
    tile?: TreeMapCommonProps<Datum>['tile']
    leavesOnly?: TreeMapCommonProps<Datum>['leavesOnly']
    innerPadding?: TreeMapCommonProps<Datum>['innerPadding']
    outerPadding?: TreeMapCommonProps<Datum>['outerPadding']
    label?: TreeMapCommonProps<Datum>['label']
    orientLabel?: TreeMapCommonProps<Datum>['orientLabel']
    enableParentLabel?: TreeMapCommonProps<Datum>['enableParentLabel']
    parentLabel?: TreeMapCommonProps<Datum>['parentLabel']
    parentLabelSize?: TreeMapCommonProps<Datum>['parentLabelSize']
    parentLabelPosition?: TreeMapCommonProps<Datum>['parentLabelPosition']
    parentLabelPadding?: TreeMapCommonProps<Datum>['parentLabelPadding']
    colors?: TreeMapCommonProps<Datum>['colors']
    colorBy?: TreeMapCommonProps<Datum>['colorBy']
    nodeOpacity?: TreeMapCommonProps<Datum>['nodeOpacity']
    borderColor?: TreeMapCommonProps<Datum>['borderColor']
    labelTextColor?: TreeMapCommonProps<Datum>['labelTextColor']
    parentLabelTextColor?: TreeMapCommonProps<Datum>['parentLabelTextColor']
}) => {
    const getIdentity = usePropertyAccessor(identity)
    const getValue = usePropertyAccessor(value)
    const formatValue = useValueFormatter(valueFormat)
    const getLabel = usePropertyAccessor(label)
    const getParentLabel = usePropertyAccessor(parentLabel)

    const layout = useTreeMapLayout<Datum>({
        width,
        height,
        tile,
        innerPadding,
        outerPadding,
        enableParentLabel,
        parentLabelSize,
        parentLabelPosition,
        leavesOnly,
    })

    const hierarchy = useHierarchy<Datum>({ root: data, getValue })

    const rawNodes = useMemo(() => {
        // d3 treemap mutates the data, so we need to copy it
        // to have proper behavior for subsequents useMemo()
        const root = cloneDeep(hierarchy)
        layout(root)

        return (
            leavesOnly ? root.leaves() : root.descendants()
        ) as HierarchyRectangularNode<Datum>[]
    }, [hierarchy, layout, leavesOnly])

    const nodes = useMemo(
        () =>
            rawNodes.map(rawNode => {
                const { path, pathComponents } = computeNodeIdAndPath(rawNode, getIdentity)

                const node = {
                    id: getIdentity(rawNode.data),
                    path,
                    pathComponents,
                    data: omit(rawNode.data, 'children'),
                    x: rawNode.x0,
                    y: rawNode.y0,
                    width: rawNode.x1 - rawNode.x0,
                    height: rawNode.y1 - rawNode.y0,
                    value: rawNode.value!,
                    formattedValue: formatValue(rawNode.value!),
                    treeDepth: rawNode.depth,
                    treeHeight: rawNode.height,
                    isParent: rawNode.height > 0,
                    isLeaf: rawNode.height === 0,
                    parentLabelX: 0,
                    parentLabelY: 0,
                    parentLabelRotation: 0,
                } as ComputedNodeWithoutStyles<Datum>

                node.labelRotation = orientLabel && node.height > node.width ? -90 : 0

                if (parentLabelPosition === 'top') {
                    node.parentLabelX = outerPadding + parentLabelPadding
                    node.parentLabelY = outerPadding + parentLabelSize / 2
                }
                if (parentLabelPosition === 'right') {
                    node.parentLabelX = node.width - outerPadding - parentLabelSize / 2
                    node.parentLabelY = node.height - outerPadding - parentLabelPadding
                    node.parentLabelRotation = -90
                }
                if (parentLabelPosition === 'bottom') {
                    node.parentLabelX = outerPadding + parentLabelPadding
                    node.parentLabelY = node.height - outerPadding - parentLabelSize / 2
                }
                if (parentLabelPosition === 'left') {
                    node.parentLabelX = outerPadding + parentLabelSize / 2
                    node.parentLabelY = node.height - outerPadding - parentLabelPadding
                    node.parentLabelRotation = -90
                }

                node.label = getLabel(node)
                node.parentLabel = getParentLabel(node)

                return node
            }),
        [
            rawNodes,
            getIdentity,
            formatValue,
            getLabel,
            orientLabel,
            getParentLabel,
            parentLabelSize,
            parentLabelPosition,
            parentLabelPadding,
            outerPadding,
        ]
    )

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const getParentLabelTextColor = useInheritedColor(parentLabelTextColor, theme)

    const nodesWithStyles = useMemo(
        () =>
            nodes.map(node => {
                const nodeWithStyles = {
                    ...node,
                    color: getColor(node),
                    opacity: nodeOpacity,
                } as ComputedNode<Datum>

                nodeWithStyles.borderColor = getBorderColor(nodeWithStyles)
                nodeWithStyles.labelTextColor = getLabelTextColor(nodeWithStyles)
                nodeWithStyles.parentLabelTextColor = getParentLabelTextColor(nodeWithStyles)

                return nodeWithStyles
            }),
        [nodes, getColor, nodeOpacity, getBorderColor, getLabelTextColor, getParentLabelTextColor]
    )

    return {
        hierarchy,
        nodes: nodesWithStyles,
        layout,
    }
}

export const useInteractiveTreeMapNodes = <Datum extends object>(
    nodes: ComputedNode<Datum>[],
    {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }: {
        isInteractive: TreeMapCommonProps<Datum>['isInteractive']
        onMouseEnter?: TreeMapCommonProps<Datum>['onMouseEnter']
        onMouseMove?: TreeMapCommonProps<Datum>['onMouseMove']
        onMouseLeave?: TreeMapCommonProps<Datum>['onMouseLeave']
        onClick?: TreeMapCommonProps<Datum>['onClick']
        tooltip: TreeMapCommonProps<Datum>['tooltip']
    }
): ComputedNodeWithHandlers<Datum>[] => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const showTooltip = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event, 'left')
        },
        [showTooltipFromEvent, tooltip]
    )

    const handleMouseEnter = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            showTooltip(node, event)
            onMouseEnter?.(node, event)
        },
        [onMouseEnter, showTooltip]
    )

    const handleMouseMove = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            showTooltip(node, event)
            onMouseMove?.(node, event)
        },
        [onMouseMove, showTooltip]
    )

    const handleMouseLeave = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [onMouseLeave, hideTooltip]
    )

    const handleClick = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            onClick?.(node, event)
        },
        [onClick]
    )

    return useMemo(
        () =>
            nodes.map(node => {
                if (!isInteractive) return node

                return {
                    ...node,
                    onMouseEnter: (event: MouseEvent) => handleMouseEnter(node, event),
                    onMouseMove: (event: MouseEvent) => handleMouseMove(node, event),
                    onMouseLeave: (event: MouseEvent) => handleMouseLeave(node, event),
                    onClick: (event: MouseEvent) => handleClick(node, event),
                }
            }),
        [isInteractive, nodes, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]
    )
}

export const useCustomLayerProps = <Datum extends object>({
    nodes,
}: CustomLayerProps<Datum>): CustomLayerProps<Datum> =>
    useMemo(
        () => ({
            nodes,
        }),
        [nodes]
    )
