import pick from 'lodash/pick'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import React, { createElement, useCallback, useMemo } from 'react'
import { usePropertyAccessor, useTheme, useValueFormatter } from '@nivo/core'
import { arc, Arc } from 'd3-shape'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { partition as d3Partition, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import {
    CommonProps,
    ComputedDatum,
    DataProps,
    NormalizedDatum,
    MouseEventHandlers,
    SunburstCustomLayerProps,
} from './types'

type MaybeColor = { color?: string }

export const useEventHandlers = <RawDatum>({
    data,
    isInteractive,
    onClick: onClickHandler,
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave: onMouseLeaveHandler,
    onMouseMove: onMouseMoveHandler,
    tooltip,
}: Pick<CommonProps<RawDatum>, 'isInteractive' | 'tooltip'> &
    MouseEventHandlers<RawDatum, SVGPathElement> & {
        data: NormalizedDatum<RawDatum>
    }) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleTooltip = useCallback(
        (event: React.MouseEvent<SVGPathElement>) =>
            showTooltipFromEvent(createElement(tooltip, data), event),
        [data, showTooltipFromEvent, tooltip]
    )

    const onClick = useCallback(
        (event: React.MouseEvent<SVGPathElement>) => onClickHandler?.(data, event),
        [data, onClickHandler]
    )
    const onMouseEnter = useCallback(
        (event: React.MouseEvent<SVGPathElement>) => {
            onMouseEnterHandler?.(data, event)
            handleTooltip(event)
        },
        [data, handleTooltip, onMouseEnterHandler]
    )
    const onMouseLeave = useCallback(
        (event: React.MouseEvent<SVGPathElement>) => {
            onMouseLeaveHandler?.(data, event)
            hideTooltip()
        },
        [data, hideTooltip, onMouseLeaveHandler]
    )
    const onMouseMove = useCallback(
        (event: React.MouseEvent<SVGPathElement>) => {
            onMouseMoveHandler?.(data, event)
            handleTooltip(event)
        },
        [data, handleTooltip, onMouseMoveHandler]
    )

    return useMemo(() => {
        if (!isInteractive) {
            return {
                onClick: undefined,
                onMouseEnter: undefined,
                onMouseLeave: undefined,
                onMouseMove: undefined,
            }
        }

        return {
            onClick,
            onMouseEnter,
            onMouseLeave,
            onMouseMove,
        }
    }, [isInteractive, onClick, onMouseEnter, onMouseLeave, onMouseMove])
}

export const useSunburst = <RawDatum extends MaybeColor>({
    childColor,
    colors,
    cornerRadius,
    data,
    id,
    value,
    valueFormat,
    radius,
}: {
    childColor: CommonProps<RawDatum>['childColor']
    colors: CommonProps<RawDatum>['colors']
    cornerRadius: CommonProps<RawDatum>['cornerRadius']
    data: DataProps<RawDatum>['data']
    id: NonNullable<DataProps<RawDatum>['id']>
    radius: number
    value: NonNullable<DataProps<RawDatum>['value']>
    valueFormat: DataProps<RawDatum>['valueFormat']
}) => {
    const theme = useTheme()
    const getColor = useOrdinalColorScale<NormalizedDatum<RawDatum>>(colors, 'id')
    const getChildColor = useInheritedColor(childColor, theme) as (
        datum: NormalizedDatum<RawDatum>
    ) => string

    const getId = usePropertyAccessor(id)
    const getValue = usePropertyAccessor(value)

    const formatValue = useValueFormatter<number>(valueFormat)

    const nodes = useMemo(() => {
        const partition = d3Partition<RawDatum>().size([2 * Math.PI, radius * radius])
        const hierarchy = d3Hierarchy(data).sum(getValue)
        const descendants = partition(cloneDeep(hierarchy)).descendants()
        const total = hierarchy.value ?? 0

        return sortBy(descendants, 'depth').reduce<Array<ComputedDatum<RawDatum>>>(
            (acc, descendant) => {
                // Maybe the types are wrong from d3, but value prop is always present, but types make it optional
                const node = {
                    value: 0,
                    ...pick(descendant, [
                        'x0',
                        'y0',
                        'x1',
                        'y1',
                        'depth',
                        'height',
                        'parent',
                        'value',
                    ]),
                }

                const { value } = node
                const id = getId(descendant.data)
                const percentage = (100 * value) / total
                const data = {
                    color: descendant.data.color,
                    data: descendant.data,
                    depth: node.depth,
                    formattedValue: valueFormat ? formatValue(value) : `${percentage.toFixed(2)}%`,
                    id,
                    percentage,
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
            },
            []
        )
    }, [
        radius,
        data,
        getValue,
        getId,
        valueFormat,
        formatValue,
        childColor,
        getColor,
        getChildColor,
    ])

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

/**
 * Memoize the context to pass to custom layers.
 */
export const useSunburstLayerContext = <RawDatum>({
    nodes,
    arcGenerator,
    centerX,
    centerY,
    radius,
}: {
    nodes: ComputedDatum<RawDatum>[]
    arcGenerator: Arc<any, ComputedDatum<RawDatum>>
    centerX: number
    centerY: number
    radius: number
}): SunburstCustomLayerProps<RawDatum> =>
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
