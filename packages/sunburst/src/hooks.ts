import { useMemo } from 'react'
import { partition as d3Partition, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import cloneDeep from 'lodash/cloneDeep'
import sortBy from 'lodash/sortBy'
import { usePropertyAccessor, useTheme, useValueFormatter } from '@nivo/core'
import { Arc, useArcGenerator } from '@nivo/arcs'
import { useOrdinalColorScale, useInheritedColor, InheritedColorConfig } from '@nivo/colors'
import {
    SunburstCommonProps,
    ComputedDatum,
    DataProps,
    DatumId,
    SunburstCustomLayerProps,
} from './types'
import { defaultProps } from './props'

export const useSunburst = <RawDatum>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    radius,
    cornerRadius = defaultProps.cornerRadius,
    colors = defaultProps.colors,
    colorBy = defaultProps.colorBy,
    inheritColorFromParent = defaultProps.inheritColorFromParent,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
}: {
    data: DataProps<RawDatum>['data']
    id?: DataProps<RawDatum>['id']
    value?: DataProps<RawDatum>['value']
    valueFormat?: DataProps<RawDatum>['valueFormat']
    radius: number
    cornerRadius?: SunburstCommonProps<RawDatum>['cornerRadius']
    colors?: SunburstCommonProps<RawDatum>['colors']
    colorBy?: SunburstCommonProps<RawDatum>['colorBy']
    inheritColorFromParent?: SunburstCommonProps<RawDatum>['inheritColorFromParent']
    childColor?: SunburstCommonProps<RawDatum>['childColor']
}) => {
    const theme = useTheme()
    const getColor = useOrdinalColorScale<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>(
        colors,
        colorBy
    )
    const getChildColor = useInheritedColor<ComputedDatum<RawDatum>>(childColor, theme)

    const getId = usePropertyAccessor<RawDatum, DatumId>(id)
    const getValue = usePropertyAccessor<RawDatum, number>(value)
    const formatValue = useValueFormatter<number>(valueFormat)

    const nodes: ComputedDatum<RawDatum>[] = useMemo(() => {
        // d3 mutates the data for performance reasons,
        // however it does not work well with reactive programming,
        // this ensures that we don't mutate the input data
        const clonedData = cloneDeep(data)

        const hierarchy = d3Hierarchy(clonedData).sum(getValue)

        const partition = d3Partition<RawDatum>().size([2 * Math.PI, radius * radius])
        // exclude root node
        const descendants = partition(hierarchy).descendants().slice(1)

        const total = hierarchy.value ?? 0

        // It's important to sort node by depth,
        // it ensures that we assign a parent node
        // which has already been computed, because parent nodes
        // are going to be computed first
        const sortedNodes = sortBy(descendants, 'depth')

        return sortedNodes.reduce<ComputedDatum<RawDatum>[]>((acc, descendant) => {
            const id = getId(descendant.data)
            // d3 hierarchy node value is optional by default as it depends on
            // a call to `count()` or `sum()`, and we previously called `sum()`,
            // d3 typings could be improved and make it non optional when calling
            // one of those.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const value = descendant.value!
            const percentage = (100 * value) / total
            const path = descendant.ancestors().map(ancestor => getId(ancestor.data))

            const arc: Arc = {
                startAngle: descendant.x0,
                endAngle: descendant.x1,
                innerRadius: Math.sqrt(descendant.y0),
                outerRadius: Math.sqrt(descendant.y1),
            }

            let parent: ComputedDatum<RawDatum> | undefined
            if (descendant.parent) {
                // as the parent is defined by the input data, and we sorted the data
                // by `depth`, we can safely assume it's defined.
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                parent = acc.find(node => node.id === getId(descendant.parent!.data))
            }

            const normalizedNode: ComputedDatum<RawDatum> = {
                id,
                path,
                value,
                percentage,
                formattedValue: valueFormat ? formatValue(value) : `${percentage.toFixed(2)}%`,
                color: '',
                arc,
                data: descendant.data,
                depth: descendant.depth,
                height: descendant.height,
            }

            if (inheritColorFromParent && parent && normalizedNode.depth > 1) {
                normalizedNode.color = getChildColor(parent)
            } else {
                normalizedNode.color = getColor(normalizedNode)
            }

            return [...acc, normalizedNode]
        }, [])
    }, [
        data,
        radius,
        getValue,
        getId,
        valueFormat,
        formatValue,
        getColor,
        inheritColorFromParent,
        getChildColor,
    ])

    const arcGenerator = useArcGenerator({ cornerRadius })

    return { arcGenerator, nodes }
}

/**
 * Memoize the context to pass to custom layers.
 */
export const useSunburstLayerContext = <RawDatum>({
    nodes,
    arcGenerator,
    centerX,
    centerY,
    radius,
}: SunburstCustomLayerProps<RawDatum>): SunburstCustomLayerProps<RawDatum> =>
    useMemo(
        () => ({
            nodes,
            arcGenerator,
            centerX,
            centerY,
            radius,
        }),
        [nodes, arcGenerator, centerX, centerY, radius]
    )
