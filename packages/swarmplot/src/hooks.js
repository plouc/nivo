/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { useOrdinalColorScale } from '@nivo/colors'
import {
    computeSwarmPlotValueScale,
    computeSwarmPlotOrdinalScale,
    computeSwarmPlotForces,
    computeSwarmPlotNodes,
} from './compute'

export const useSwarmPlotValueScale = ({ axis, scale, data, width, height }) => {
    return useMemo(() => computeSwarmPlotValueScale({ axis, scale, data, width, height }), [
        axis,
        scale,
        data,
        width,
        height,
    ])
}

export const useSwarmPlotOrdinalScale = ({ axis, data, gap, width, height }) => {
    return useMemo(() => computeSwarmPlotOrdinalScale({ axis, data, gap, width, height }), [
        axis,
        data,
        gap,
        width,
        height,
    ])
}

export const useSwarmPlotForces = ({
    axis,
    valueScale,
    ordinalScale,
    nodeSize,
    nodePadding,
    forceStrength,
}) => {
    return useMemo(
        () =>
            computeSwarmPlotForces({
                axis,
                valueScale,
                ordinalScale,
                nodeSize,
                nodePadding,
                forceStrength,
            }),
        [axis, valueScale, ordinalScale, nodeSize, nodePadding, forceStrength]
    )
}

export const useSwarmPlot = ({
    data,
    layout,
    colors,
    scale,
    width,
    height,
    gap,
    nodeSize,
    nodePadding,
    forceStrength,
    simulationIterations,
}) => {
    const axis = layout === 'horizontal' ? 'x' : 'y'

    const valueScale = useSwarmPlotValueScale({
        axis,
        scale,
        data,
        width,
        height,
    })
    const ordinalScale = useSwarmPlotOrdinalScale({
        axis,
        data,
        gap,
        width,
        height,
    })
    const forces = useSwarmPlotForces({
        axis,
        valueScale,
        ordinalScale,
        nodeSize,
        nodePadding,
        forceStrength,
    })

    const { nodes, xScale, yScale } = useMemo(
        () =>
            computeSwarmPlotNodes({
                data,
                layout,
                valueScale,
                ordinalScale,
                forces,
                simulationIterations,
            }),
        [data, layout, valueScale, ordinalScale, forces, simulationIterations]
    )

    const colorScale = useOrdinalColorScale(colors, 'serieId')

    const coloredNodes = useMemo(() => nodes.map(node => ({ ...node, color: colorScale(node) })))

    return {
        nodes: coloredNodes,
        xScale,
        yScale,
        colorScale,
    }
}

/*
withPropsOnChange(['borderColor'], ({ borderColor }) => ({
    getBorderColor: getInheritedColorGenerator(borderColor),
})),
*/
