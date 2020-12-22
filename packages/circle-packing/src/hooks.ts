import { useMemo, MouseEvent } from 'react'
import { pack as d3Pack, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import cloneDeep from 'lodash/cloneDeep'
import sortBy from 'lodash/sortBy'
import { usePropertyAccessor, useValueFormatter, useTheme } from '@nivo/core'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import {
    CirclePackingCommonProps,
    CirclePackingCustomLayerProps,
    ComputedDatum,
    MouseHandlers,
} from './types'

export const useCirclePacking = <RawDatum extends DatumWithChildren<RawDatum>>({
    data,
    id,
    value,
    width,
    height,
    padding,
    leavesOnly,
    colors,
    colorBy,
    childColor,
}: {
    data: RawDatum
    id: CirclePackSvgProps<RawDatum>['id']
    value: CirclePackSvgProps<RawDatum>['value']
    width: number
    height: number
    padding: CirclePackingCommonProps<RawDatum>['padding']
    leavesOnly: CirclePackingCommonProps<RawDatum>['leavesOnly']
    colors: CirclePackingCommonProps<RawDatum>['colors']
    colorBy: CirclePackingCommonProps<RawDatum>['colorBy']
    childColor: CirclePackingCommonProps<RawDatum>['childColor']
}): ComputedDatum<RawDatum>[] => {
    console.log('compute nodes')

    const getId = usePropertyAccessor<RawDatum, string | number>(id)
    const getValue = usePropertyAccessor<RawDatum, number>(value)

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

    const hierarchy = d3Hierarchy(clonedData).sum(getValue)

    const pack = d3Pack().size([width, height]).padding(padding)

    const packedData = pack(hierarchy)

    const nodes = leavesOnly ? packedData.leaves() : packedData.descendants()

    // It's important to sort node by depth,
    // it ensures that we assign a parent node
    // which has already been computed, because parent nodes
    // are gonna be computed first
    const sortedNodes = sortBy(nodes, 'depth')

    const total = hierarchy.value ?? 0

    const computedNodes = sortedNodes.reduce<ComputedDatum<RawDatum>>((acc, descendant) => {
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
            //formattedValue: valueFormat ? formatValue(value) : `${percentage.toFixed(2)}%`,
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
    textColor: CirclePackingCommonProps<RawDatum>['labelsTextColor']
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

export const useBoundMouseHandlers = <RawDatum>(
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
