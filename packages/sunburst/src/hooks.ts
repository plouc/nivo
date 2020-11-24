import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import { getAccessorFor, useTheme } from '@nivo/core'
import { arc } from 'd3-shape'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useMemo } from 'react'
import { partition as d3Partition, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import { CommonProps, ComputedDatum, DataProps, NormalizedDatum } from './types'

type MaybeColor = { color?: string }

const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> =>
    keys.reduce((acc, prop) => ({ ...acc, [prop]: obj[prop] }), {} as Pick<T, K>)

export const useSunburst = <RawDatum extends MaybeColor>({
    childColor,
    colors,
    cornerRadius,
    data,
    id,
    value,
    radius,
}: {
    childColor: CommonProps<RawDatum>['childColor']
    colors: CommonProps<RawDatum>['colors']
    cornerRadius: CommonProps<RawDatum>['cornerRadius']
    data: DataProps<RawDatum>['data']
    id: DataProps<RawDatum>['id']
    radius: number
    value: DataProps<RawDatum>['value']
}) => {
    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, 'id')
    const getChildColor = useInheritedColor(childColor, theme) as (
        datum: NormalizedDatum<RawDatum>
    ) => string

    const getId = useMemo(() => getAccessorFor(id), [id])
    const getValue = useMemo(() => getAccessorFor(value), [value])

    const nodes = useMemo(() => {
        const partition = d3Partition<RawDatum>().size([2 * Math.PI, radius * radius])
        const hierarchy = d3Hierarchy(data).sum(getValue)
        const total = hierarchy.value ?? 0

        return sortBy(partition(cloneDeep(hierarchy)).descendants(), 'depth').reduce<
            Array<ComputedDatum<RawDatum>>
        >((acc, descendant) => {
            // Maybe the types are wrong from d3, but value prop is always present, but types make it optional
            const node = {
                value: 0,
                ...pick(descendant, 'x0', 'y0', 'x1', 'y1', 'depth', 'height', 'parent', 'value'),
            }

            const { value } = node
            const id = getId(descendant.data)
            const data = {
                depth: node.depth,
                id,
                percentage: (100 * value) / total,
                value,
            }

            const parent = acc.find(
                computed => node.parent && computed.data.id === getId(node.parent.data)
            )

            const color =
                node.depth === 1 || childColor === 'noinherit'
                    ? getColor(data)
                    : parent
                    ? getChildColor(parent.data)
                    : descendant.data.color

            return [...acc, { ...node, data: { ...data, color, parent } }]
        }, [])
    }, [data, childColor, getChildColor, getColor, getId, getValue, radius])

    const arcGenerator = useMemo(
        () =>
            arc<ComputedDatum<RawDatum>>()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .innerRadius(d => Math.sqrt(d.y0))
                .outerRadius(d => Math.sqrt(d.y1))
                .cornerRadius(cornerRadius),
        [cornerRadius]
    )

    return { arcGenerator, nodes }
}
