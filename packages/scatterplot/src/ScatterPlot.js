/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment, useMemo } from 'react'
import {
    SvgWrapper,
    withContainer,
    useDimensions,
    useTheme,
    useMotionConfig,
    CartesianMarkers,
} from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { useScatterPlot } from './hooks'
import { ScatterPlotPropTypes, ScatterPlotDefaultProps } from './props'
import AnimatedNodes from './AnimatedNodes'
import ScatterPlotAnnotations from './ScatterPlotAnnotations'
import StaticNodes from './StaticNodes'
import Mesh from './Mesh'

const ScatterPlot = props => {
    const {
        data,
        xScale: xScaleSpec,
        xFormat,
        yScale: yScaleSpec,
        yFormat,

        width,
        height,
        margin: partialMargin,

        layers,

        colors,
        blendMode,

        nodeSize,
        renderNode,

        enableGridX,
        enableGridY,
        gridXValues,
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

        markers,

        legends,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const theme = useTheme()
    const { animate } = useMotionConfig()

    const { xScale, yScale, nodes, legendData } = useScatterPlot({
        data,
        xScaleSpec,
        xFormat,
        yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        nodeSize,
        colors,
    })

    const customLayerProps = useMemo(
        () => ({
            ...props,
            xScale,
            yScale,
            nodes,
            margin,
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
        }),
        [xScale, yScale, nodes, margin, innerWidth, innerHeight, outerWidth, outerHeight]
    )

    const Nodes = animate ? AnimatedNodes : StaticNodes

    const layerById = {
        grid: (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
                xValues={gridXValues}
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
        nodes: React.createElement(Nodes, {
            key: 'nodes',
            nodes,
            renderNode,
            isInteractive,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
            onClick,
            tooltip,
            blendMode,
        }),
        markers: (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale}
                yScale={yScale}
            />
        ),
        mesh: null,
        annotations: (
            <ScatterPlotAnnotations
                key="annotations"
                nodes={nodes}
                annotations={annotations}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                animate={animate}
            />
        ),
        legends: legends.map((legend, i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={innerWidth}
                containerHeight={innerHeight}
                data={legendData}
                theme={theme}
            />
        )),
    }

    if (isInteractive === true && useMesh === true) {
        layerById.mesh = (
            <Mesh
                key="mesh"
                nodes={nodes}
                width={innerWidth}
                height={innerHeight}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
                debug={debugMesh}
            />
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
            {layers.map((layer, i) => {
                if (layerById[layer] !== undefined) {
                    return layerById[layer]
                }

                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>{React.createElement(layer, customLayerProps)}</Fragment>
                    )
                }

                throw new Error(`Unknown layer (${layer})`)
            })}
        </SvgWrapper>
    )
}

ScatterPlot.propTypes = ScatterPlotPropTypes
ScatterPlot.defaultProps = ScatterPlotDefaultProps

export default memo(withContainer(ScatterPlot))
