import { useMemo, MouseEvent, MutableRefObject, useCallback } from 'react'
import { pack as d3Pack, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import cloneDeep from 'lodash/cloneDeep'
import sortBy from 'lodash/sortBy'
import {
    usePropertyAccessor,
    useValueFormatter,
    useTheme,
    getRelativeCursor,
    getDistance,
} from '@nivo/core'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import {
    CirclePackingCommonProps,
    CirclePackingCustomLayerProps,
    ComputedDatum,
    MouseHandlers,
} from './types'

export const useCirclePacking = <RawDatum>({
    data,
    id,
    value,
    valueFormat,
    width,
    height,
    padding,
    leavesOnly,
    colors,
    colorBy,
    childColor,
}: {
    data: CirclePackingCommonProps<RawDatum>['data']
    id: CirclePackingCommonProps<RawDatum>['id']
    value: CirclePackingCommonProps<RawDatum>['value']
    valueFormat?: CirclePackingCommonProps<RawDatum>['valueFormat']
    width: number
    height: number
    padding: CirclePackingCommonProps<RawDatum>['padding']
    leavesOnly: CirclePackingCommonProps<RawDatum>['leavesOnly']
    colors: CirclePackingCommonProps<RawDatum>['colors']
    colorBy: CirclePackingCommonProps<RawDatum>['colorBy']
    childColor: CirclePackingCommonProps<RawDatum>['childColor']
}): ComputedDatum<RawDatum>[] => {
    const getId = usePropertyAccessor<RawDatum, string>(id)
    const getValue = usePropertyAccessor<RawDatum, number>(value)
    const formatValue = useValueFormatter(valueFormat)

    const getColor = useOrdinalColorScale<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>(
        colors,
        colorBy
    )
    const theme = useTheme()
    const getChildColor = useInheritedColor<ComputedDatum<RawDatum>>(childColor, theme)

    // d3 mutates the data for performance reasons,
    // however it does not work well with reactive programming,
    // this ensures that we don't mutate the input data
    const clonedData = cloneDeep(data)

    const hierarchy = d3Hierarchy<RawDatum>(clonedData).sum(getValue)

    const pack = d3Pack<RawDatum>().size([width, height]).padding(padding)
    const packedData = pack(hierarchy)

    const nodes = leavesOnly ? packedData.leaves() : packedData.descendants()

    // It's important to sort node by depth,
    // it ensures that we assign a parent node
    // which has already been computed, because parent nodes
    // are gonna be computed first
    const sortedNodes = sortBy(nodes, 'depth')

    const total = hierarchy.value ?? 0

    const computedNodes = sortedNodes.reduce<ComputedDatum<RawDatum>[]>((acc, descendant) => {
        const id = getId(descendant.data)
        const value = descendant.value!
        const percentage = (100 * value) / total
        const path = descendant.ancestors().map(ancestor => getId(ancestor.data))

        let parent: ComputedDatum<RawDatum> | undefined
        if (descendant.parent) {
            parent = acc.find(node => node.id === getId(descendant.parent!.data))
        }

        const normalizedNode: ComputedDatum<RawDatum> = {
            id,
            path,
            value,
            percentage,
            formattedValue: valueFormat ? formatValue(value) : `${percentage.toFixed(2)}%`,
            x: descendant.x,
            y: descendant.y,
            radius: descendant.r,
            color: '',
            data: descendant.data,
            depth: descendant.depth,
            height: descendant.height,
        }

        if (childColor !== 'noinherit' && parent && normalizedNode.depth > 1) {
            normalizedNode.color = getChildColor(parent)
        } else {
            normalizedNode.color = getColor(normalizedNode)
        }

        return [...acc, normalizedNode]
    }, [])

    return computedNodes
}

export const useCirclePackingZoom = <RawDatum>(
    nodes: ComputedDatum<RawDatum>[],
    zoomedId: CirclePackingCommonProps<RawDatum>['zoomedId'],
    width: number,
    height: number
) =>
    useMemo(() => {
        if (!zoomedId) return nodes

        const zoomedNode = nodes.find(({ id }) => id === zoomedId)
        if (!zoomedNode) return nodes

        const ratio = Math.min(width, height) / (zoomedNode.radius * 2)
        const offsetX = width / 2 - zoomedNode.x * ratio
        const offsetY = height / 2 - zoomedNode.y * ratio

        return nodes.map(node => ({
            ...node,
            x: node.x * ratio + offsetX,
            y: node.y * ratio + offsetY,
            radius: node.radius * ratio,
        }))
    }, [nodes, zoomedId, width, height])

export const useCirclePackingLabels = <RawDatum>({
    nodes,
    label,
    filter,
    skipRadius,
    textColor,
}: {
    nodes: ComputedDatum<RawDatum>[]
    label: CirclePackingCommonProps<RawDatum>['label']
    filter: CirclePackingCommonProps<RawDatum>['labelsFilter']
    skipRadius: CirclePackingCommonProps<RawDatum>['labelsSkipRadius']
    textColor: CirclePackingCommonProps<RawDatum>['labelTextColor']
}) => {
    const getLabel = usePropertyAccessor<ComputedDatum<RawDatum>, string | number>(label)
    const theme = useTheme()
    const getTextColor = useInheritedColor<ComputedDatum<RawDatum>>(textColor, theme)

    // computing the labels
    const labels = useMemo(
        () =>
            nodes
                .filter(node => node.radius >= skipRadius)
                .map(node => ({
                    label: getLabel(node),
                    textColor: getTextColor(node),
                    node,
                })),
        [nodes, skipRadius, getLabel, getTextColor]
    )

    // apply extra filtering if provided
    return useMemo(() => {
        if (!filter) return labels

        return labels.filter(filter)
    }, [labels, filter])
}

export const useNodeMouseHandlers = <RawDatum>(
    node: ComputedDatum<RawDatum>,
    { onMouseEnter, onMouseMove, onMouseLeave, onClick }: MouseHandlers<RawDatum>
): Partial<
    Record<'onMouseEnter' | 'onMouseMove' | 'onMouseLeave' | 'onClick', (event: MouseEvent) => void>
> =>
    useMemo(
        () => ({
            onMouseEnter: onMouseEnter
                ? (event: MouseEvent) => {
                      onMouseEnter(node, event)
                  }
                : undefined,
            onMouseMove: onMouseMove
                ? (event: MouseEvent) => {
                      onMouseMove(node, event)
                  }
                : undefined,
            onMouseLeave: onMouseLeave
                ? (event: MouseEvent) => {
                      onMouseLeave(node, event)
                  }
                : undefined,
            onClick: onClick
                ? (event: MouseEvent) => {
                      onClick(node, event)
                  }
                : undefined,
        }),
        [node, onMouseEnter, onMouseMove, onMouseLeave, onClick]
    )

export const useMouseCircleDetection = <RawDatum>({
    nodes,
    canvasEl,
    margin,
}: {
    nodes: ComputedDatum<RawDatum>[]
    canvasEl: MutableRefObject<HTMLCanvasElement | null>
    margin: {
        top: number
        left: number
    }
}) => {
    // we need to sort in order to detect higher nodes first
    const sortedNodes = useMemo(() => sortBy(nodes, 'height'), [nodes])

    return useCallback(
        (event: MouseEvent) => {
            if (!canvasEl.current) return null

            const [x, y] = getRelativeCursor(canvasEl.current, event)

            return sortedNodes.find(node => {
                const distanceFromNode = getDistance(
                    node.x,
                    node.y,
                    x - margin.left,
                    y - margin.top
                )
                return distanceFromNode <= node.radius
            })
        },
        [canvasEl, margin, sortedNodes]
    )
}

/**
 * Memoize the context to pass to custom layers.
 */
export const useCirclePackingLayerContext = <RawDatum>({
    nodes,
}: {
    nodes: ComputedDatum<RawDatum>[]
}): CirclePackingCustomLayerProps<RawDatum> =>
    useMemo(
        () => ({
            nodes,
        }),
        [nodes]
    )
