/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useCallback } from 'react'
import get from 'lodash/get'
import { useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'

import {
    computeValueScale,
    computeOrdinalScale,
    computeForces,
    computeNodes,
    getSizeGenerator,
} from './compute'
import { useAnnotations } from '@nivo/annotations'
import SwarmPlotTooltip from './SwarmPlotTooltip'

export const useValueScale = ({ width, height, axis, getValue, scale, data }) =>
    useMemo(
        () =>
            computeValueScale({
                width,
                height,
                axis,
                getValue,
                scale,
                data,
            }),
        [width, height, axis, getValue, scale, data]
    )

export const useOrdinalScale = ({ width, height, axis, groups, gap }) =>
    useMemo(() => computeOrdinalScale({ width, height, axis, groups, gap }), [
        width,
        height,
        axis,
        groups,
        gap,
    ])

export const useForces = ({ axis, valueScale, ordinalScale, getSize, spacing, forceStrength }) =>
    useMemo(
        () =>
            computeForces({
                axis,
                valueScale,
                ordinalScale,
                getSize,
                spacing,
                forceStrength,
            }),
        [axis, valueScale, ordinalScale, getSize, spacing, forceStrength]
    )

const useSize = size => useMemo(() => getSizeGenerator(size), [size])

const getAccessor = instruction => {
    if (typeof instruction === 'function') return instruction
    return d => get(d, instruction)
}

export const useSwarmPlot = ({
    width,
    height,
    data,
    identity,
    label,
    groups,
    groupBy,
    value,
    valueFormat,
    valueScale: valueScaleConfig,
    size,
    spacing,
    layout,
    gap,
    colors,
    colorBy,
    forceStrength,
    simulationIterations,
}) => {
    const axis = layout === 'horizontal' ? 'x' : 'y'

    const getIdentity = useMemo(() => getAccessor(identity), [identity])
    const getLabel = useMemo(() => getAccessor(label), [label])
    const getValue = useMemo(() => getAccessor(value), [value])
    const formatValue = useValueFormatter(valueFormat)
    const getGroup = useMemo(() => getAccessor(groupBy), [groupBy])
    const getSize = useSize(size)
    const getColor = useOrdinalColorScale(colors, colorBy)

    const valueScale = useValueScale({
        width,
        height,
        axis,
        getValue,
        scale: valueScaleConfig,
        data,
    })

    const ordinalScale = useOrdinalScale({
        width,
        height,
        axis,
        groups,
        gap,
    })

    const forces = useForces({
        axis,
        valueScale,
        ordinalScale,
        spacing,
        forceStrength,
    })

    const { nodes, xScale, yScale } = useMemo(
        () =>
            computeNodes({
                data,
                getIdentity,
                layout,
                getValue,
                valueScale,
                getGroup,
                ordinalScale,
                getSize,
                forces,
                simulationIterations,
                valueScaleConfig,
            }),
        [
            data,
            getIdentity,
            layout,
            getValue,
            valueScale,
            getGroup,
            ordinalScale,
            getSize,
            forces,
            simulationIterations,
        ]
    )

    const augmentedNodes = useMemo(
        () =>
            nodes.map(node => ({
                id: node.id,
                index: node.index,
                group: node.group,
                label: getLabel(node),
                value: node.value,
                formattedValue: formatValue(node.value),
                x: node.x,
                y: node.y,
                size: node.size,
                color: getColor(node),
                data: node.data,
            })),
        [nodes, getLabel, formatValue, getColor]
    )

    return {
        nodes: augmentedNodes,
        xScale,
        yScale,
        getColor,
    }
}

export const useBorderWidth = borderWidth =>
    useMemo(() => {
        if (typeof borderWidth === 'function') return borderWidth
        return () => borderWidth
    }, [borderWidth])

export const useNodeMouseHandlers = ({
    isEnabled,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const showNodeTooltip = useMemo(() => {
        if (tooltip) return (node, event) => showTooltipFromEvent(tooltip({ node }), event)
        return (node, event) => showTooltipFromEvent(<SwarmPlotTooltip node={node} />, event)
    }, [showTooltipFromEvent])

    const mouseEnterHandler = useCallback(
        (node, event) => {
            if (!isEnabled) return
            showNodeTooltip(node, event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [isEnabled, onMouseEnter]
    )

    const mouseMoveHandler = useCallback(
        (node, event) => {
            if (!isEnabled) return
            showNodeTooltip(node, event)
            onMouseMove && onMouseMove(node, event)
        },
        [isEnabled, onMouseMove]
    )

    const mouseLeaveHandler = useCallback(
        (node, event) => {
            if (!isEnabled) return
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [isEnabled, onMouseLeave],
        hideTooltip
    )

    const clickHandler = useCallback(
        (node, event) => {
            isEnabled && onClick && onClick(node, event)
        },
        [isEnabled, onClick]
    )

    return {
        onMouseEnter: mouseEnterHandler,
        onMouseMove: mouseMoveHandler,
        onMouseLeave: mouseLeaveHandler,
        onClick: clickHandler,
    }
}

export const useSwarmPlotAnnotations = (items, annotations) =>
    useAnnotations({
        items,
        annotations,
        getDimensions: (node, offset) => {
            const size = node.size + offset * 2

            return { size, width: size, height: size }
        },
    })
