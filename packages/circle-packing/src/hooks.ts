import { pack as d3Pack, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import cloneDeep from 'lodash/cloneDeep'
import sortBy from 'lodash/sortBy'
import { usePropertyAccessor } from '@nivo/core'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { DatumWithChildren, CirclePackSvgProps, ComputedDatum } from './types'

export const useCirclePacking = <RawDatum extends DatumWithChildren<RawDatum>>({
    data,
    id,
    value,
    width,
    height,
    padding,
    colors,
    childColor,
}: {
    data: RawDatum
    id: CirclePackSvgProps<RawDatum>['id']
    value: CirclePackSvgProps<RawDatum>['value']
    width: number
    height: number
    padding: CirclePackSvgProps<RawDatum>['padding']
    colors: CirclePackSvgProps<RawDatum>['colors']
    childColor: CirclePackSvgProps<RawDatum>['childColor']
}) => {
    const getId = usePropertyAccessor<RawDatum, string | number>(id)
    const getValue = usePropertyAccessor<RawDatum, number>(value)

    const getColor = useOrdinalColorScale<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>(
        colors,
        'id'
    )
    const getChildColor = useInheritedColor<ComputedDatum<RawDatum>>(childColor)

    // d3 mutates the data for performance reasons,
    // however it does not work well with reactive programming,
    // this ensures that we don't mutate the input data
    const clonedData = cloneDeep(data)

    const hierarchy = d3Hierarchy(clonedData).sum(getValue)

    const pack = d3Pack().size([width, height]).padding(padding)

    const packedData = pack(hierarchy)

    // let nodes = leavesOnly ? root.leaves() : root.descendants()
    const nodes = packedData.descendants()

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
