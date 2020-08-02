/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment } from 'react'
import { SvgWrapper, withContainer, useDimensions, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { Mesh } from '@nivo/voronoi'
import { SwarmPlotPropTypes, SwarmPlotDefaultProps } from './props'
import { useSwarmPlot, useBorderWidth, useNodeMouseHandlers } from './hooks'
import AnimatedSwarmPlotNodes from './AnimatedSwarmPlotNodes'
import StaticSwarmPlotNodes from './StaticSwarmPlotNodes'
import SwarmPlotNode from './SwarmPlotNode'
import SwarmPlotAnnotations from './SwarmPlotAnnotations'

const SwarmPlot = memo(
    ({
        width,
        height,
        margin: partialMargin,
        data,
        groups,
        groupBy,
        identity,
        label,
        value,
        valueFormat,
        valueScale,
        size,
        spacing,
        layout,
        gap,

        forceStrength,
        simulationIterations,

        layers,
        renderNode,

        colors,
        colorBy,
        borderWidth,
        borderColor,

        enableGridX,
        gridXValues,
        enableGridY,
        gridYValues,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,

        annotations,

        isInteractive,
        useMesh,
        debugMesh,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,

        animate,
        motionStiffness,
        motionDamping,
    }) => {
        const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
            width,
            height,
            partialMargin
        )
        const theme = useTheme()

        const { nodes, xScale, yScale } = useSwarmPlot({
            width: innerWidth,
            height: innerHeight,
            data,
            groups,
            groupBy,
            identity,
            label,
            value,
            valueFormat,
            valueScale,
            size,
            spacing,
            layout,
            gap,
            colors,
            colorBy,
            forceStrength,
            simulationIterations,
        })

        const getBorderWidth = useBorderWidth(borderWidth)
        const getBorderColor = useInheritedColor(borderColor, theme)

        const layerById = {
            grid: (
                <Grid
                    key="grid"
                    width={innerWidth}
                    height={innerHeight}
                    xScale={enableGridX ? xScale : null}
                    xValues={gridXValues}
                    yScale={enableGridY ? yScale : null}
                    yValues={gridYValues}
                />
            ),
            axes: (
                <Axes
                    key="axes"
                    xScale={xScale}
                    yScale={yScale}
                    width={innerWidth}
                    height={innerHeight}
                    top={axisTop}
                    right={axisRight}
                    bottom={axisBottom}
                    left={axisLeft}
                />
            ),
            mesh: null,
            annotations: (
                <SwarmPlotAnnotations
                    key="annotations"
                    nodes={nodes}
                    annotations={annotations}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            ),
        }

        const enableNodeInteractivity = isInteractive && !useMesh
        const handlers = useNodeMouseHandlers({
            isEnabled: isInteractive,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
            onClick,
            tooltip,
        })

        if (animate) {
            layerById.nodes = (
                <AnimatedSwarmPlotNodes
                    key="nodes"
                    nodes={nodes}
                    renderNode={renderNode}
                    getBorderWidth={getBorderWidth}
                    getBorderColor={getBorderColor}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                    isInteractive={enableNodeInteractivity}
                    onMouseEnter={!useMesh ? handlers.onMouseEnter : undefined}
                    onMouseMove={!useMesh ? handlers.onMouseMove : undefined}
                    onMouseLeave={!useMesh ? handlers.onMouseLeave : undefined}
                    onClick={!useMesh ? handlers.onClick : undefined}
                />
            )
        } else {
            layerById.nodes = (
                <StaticSwarmPlotNodes
                    key="nodes"
                    nodes={nodes}
                    renderNode={renderNode}
                    getBorderWidth={getBorderWidth}
                    getBorderColor={getBorderColor}
                    isInteractive={enableNodeInteractivity}
                    onMouseEnter={!useMesh ? handlers.onMouseEnter : undefined}
                    onMouseMove={!useMesh ? handlers.onMouseMove : undefined}
                    onMouseLeave={!useMesh ? handlers.onMouseLeave : undefined}
                    onClick={!useMesh ? handlers.onClick : undefined}
                />
            )
        }

        if (isInteractive === true && useMesh === true) {
            layerById.mesh = (
                <Mesh
                    key="mesh"
                    nodes={nodes}
                    width={innerWidth}
                    height={innerHeight}
                    onMouseEnter={handlers.onMouseEnter}
                    onMouseMove={handlers.onMouseMove}
                    onMouseLeave={handlers.onMouseLeave}
                    onClick={handlers.onClick}
                    debug={debugMesh}
                />
            )
        }

        const layerContext = {
            nodes,
            xScale,
            yScale,
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
            margin,
            getBorderColor,
            getBorderWidth,
            animate,
            motionStiffness,
            motionDamping,
        }

        return (
            <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                {layers.map((layer, i) => {
                    if (layerById[layer] !== undefined) {
                        return layerById[layer]
                    }
                    if (typeof layer === 'function') {
                        return <Fragment key={i}>{layer(layerContext)}</Fragment>
                    }

                    return null
                })}
            </SvgWrapper>
        )
    }
)

SwarmPlot.displayName = 'SwarmPlot'
SwarmPlot.propTypes = SwarmPlotPropTypes
SwarmPlot.defaultProps = {
    ...SwarmPlotDefaultProps,
    renderNode: props => <SwarmPlotNode {...props} />, // eslint-disable-line react/display-name
}

export default withContainer(SwarmPlot)
