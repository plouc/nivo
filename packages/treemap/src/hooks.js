import React, { useCallback, useMemo } from 'react'
import get from 'lodash/get'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import startCase from 'lodash/startCase'
import { treemap as d3Treemap, hierarchy } from 'd3-hierarchy'
import { treeMapTileFromProp, useTheme, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { TreeMapDefaultProps } from './props'
import TreeMapNodeTooltip from './TreeMapNodeTooltip'

export const useTreeMapLayout = ({
    width,
    height,
    tile,
    innerPadding,
    outerPadding,
    enableParentLabel,
    parentLabelSize,
    parentLabelPosition,
    leavesOnly,
}) =>
    useMemo(() => {
        const treemap = d3Treemap()
            .size([width, height])
            .tile(treeMapTileFromProp(tile))
            .round(true)
            .paddingInner(innerPadding)
            .paddingOuter(outerPadding)

        if (enableParentLabel && !leavesOnly) {
            const parentLabelPadding = parentLabelSize + outerPadding * 2
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

export const useHierarchy = ({ root, getValue }) =>
    useMemo(() => hierarchy(root).sum(getValue), [root, getValue])

export const useAccessor = accessor =>
    useMemo(() => {
        if (typeof accessor === 'function') return accessor
        return d => get(d, accessor)
    }, [accessor])

const computeNodeIdAndPath = (node, getIdentity) => {
    const path = node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .reverse()

    return [path.join('.'), path]
}

export const useTreeMap = ({
    data,
    identity = TreeMapDefaultProps.identity,
    value = TreeMapDefaultProps.value,
    valueFormat,
    leavesOnly = TreeMapDefaultProps.leavesOnly,
    width,
    height,
    tile = TreeMapDefaultProps.tile,
    innerPadding = TreeMapDefaultProps.innerPadding,
    outerPadding = TreeMapDefaultProps.outerPadding,
    label = TreeMapDefaultProps.label,
    orientLabel = TreeMapDefaultProps.orientLabel,
    enableParentLabel = TreeMapDefaultProps.enableParentLabel,
    parentLabel = TreeMapDefaultProps.parentLabel,
    parentLabelSize = TreeMapDefaultProps.parentLabelSize,
    parentLabelPosition = TreeMapDefaultProps.parentLabelPosition,
    parentLabelPadding = TreeMapDefaultProps.parentLabelPadding,
    colors = TreeMapDefaultProps.colors,
    colorBy = TreeMapDefaultProps.colorBy,
    nodeOpacity = TreeMapDefaultProps.nodeOpacity,
    borderColor = TreeMapDefaultProps.borderColor,
    labelTextColor = TreeMapDefaultProps.labelTextColor,
    parentLabelTextColor = TreeMapDefaultProps.parentLabelTextColor,
}) => {
    const getIdentity = useAccessor(identity)
    const getValue = useAccessor(value)
    const formatValue = useValueFormatter(valueFormat)
    const getLabel = useAccessor(label)
    const getParentLabel = useAccessor(parentLabel)

    const layout = useTreeMapLayout({
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

    const hierarchy = useHierarchy({ root: data, getValue })

    const rawNodes = useMemo(() => {
        // d3 treemap mutates the data, so we need to copy it
        // to have proper behavior for subsequents useMemo()
        const root = cloneDeep(hierarchy)
        layout(root)

        return leavesOnly ? root.leaves() : root.descendants()
    }, [hierarchy, layout, leavesOnly])

    const nodes = useMemo(
        () =>
            rawNodes.map(rawNode => {
                const [path, pathComponents] = computeNodeIdAndPath(rawNode, getIdentity)

                const node = {
                    id: getIdentity(rawNode.data),
                    path,
                    pathComponents,
                    data: omit(rawNode.data, 'children'),
                    x: rawNode.x0,
                    y: rawNode.y0,
                    width: rawNode.x1 - rawNode.x0,
                    height: rawNode.y1 - rawNode.y0,
                    value: rawNode.value,
                    formattedValue: formatValue(rawNode.value),
                    treeDepth: rawNode.depth,
                    treeHeight: rawNode.height,
                    isParent: rawNode.height > 0,
                    isLeaf: rawNode.height === 0,
                }

                node.label = getLabel(node)
                node.parentLabel = getParentLabel(node)
                node.parentLabelRotation = 0

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

                return node
            }),
        [
            rawNodes,
            leavesOnly,
            getIdentity,
            formatValue,
            getLabel,
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

    const enhancedNodes = useMemo(
        () =>
            nodes.map(node => {
                node.opacity = nodeOpacity
                node.labelRotation = orientLabel && node.height > node.width ? -90 : 0
                node.color = getColor(node)
                node.borderColor = getBorderColor(node)
                node.labelTextColor = getLabelTextColor(node)
                node.parentLabelTextColor = getParentLabelTextColor(node)

                return node
            }),
        [
            nodes,
            getColor,
            nodeOpacity,
            getBorderColor,
            getLabelTextColor,
            getParentLabelTextColor,
            orientLabel,
        ]
    )

    return {
        hierarchy,
        nodes: enhancedNodes,
        layout,
    }
}

export const useInteractiveTreeMapNodes = (
    nodes,
    { isInteractive, onMouseEnter, onMouseMove, onMouseLeave, onClick, tooltip }
) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const showTooltip = useCallback(
        (node, event) => {
            showTooltipFromEvent(
                <TreeMapNodeTooltip node={node} tooltip={tooltip} />,
                event,
                'left'
            )
        },
        [showTooltipFromEvent, tooltip]
    )

    const handleMouseEnter = useCallback(
        (node, event) => {
            showTooltip(node, event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [onMouseEnter, showTooltip]
    )

    const handleMouseMove = useCallback(
        (node, event) => {
            showTooltip(node, event)
            onMouseMove && onMouseMove(node, event)
        },
        [onMouseMove, showTooltip]
    )

    const handleMouseLeave = useCallback(
        (node, event) => {
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [onMouseLeave, hideTooltip]
    )

    const handleClick = useCallback(
        (node, event) => {
            onClick && onClick(node, event)
        },
        [onClick]
    )

    return useMemo(() => {
        return nodes.map(node => {
            if (!isInteractive) return node

            return {
                ...node,
                onMouseEnter: event => handleMouseEnter(node, event),
                onMouseMove: event => handleMouseMove(node, event),
                onMouseLeave: event => handleMouseLeave(node, event),
                onClick: event => handleClick(node, event),
            }
        })
    }, [nodes, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick])
}
