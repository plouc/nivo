/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment, useMemo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { SvgWrapper, withContainer, useDimensions, useTheme, useMotionConfig, CartesianMarkers } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Mesh } from '@nivo/voronoi'
import { useScatterPlot } from './hooks'
import { ScatterPlotPropTypes, ScatterPlotDefaultProps } from './props'
import AnimatedNodes from './AnimatedNodes'
import StaticNodes from './StaticNodes'

const ScatterPlot = props => {
    const {
        data,
        xScale: xScaleSpec,
        yScale: yScaleSpec,

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
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,

        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const theme = useTheme()
    const { animate } = useMotionConfig()

    const { xScale, yScale, nodes } = useScatterPlot({
        data,
        xScaleSpec,
        yScaleSpec,
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
        }),
        [props, xScale, yScale, nodes]
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
        markers: null,
        mesh: null,
        legends: null,
        /*
        markers: (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={width}
                height={height}
                xScale={xScale}
                yScale={yScale}
                theme={theme}
            />
        ),
        mesh: null,
        legends: legends.map((legend, i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={legendData}
                theme={theme}
            />
        )),
        */
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
            {layers.map((layer, i) => {
                if (layerById[layer] !== undefined) {
                    return layerById[layer]
                }

                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {React.createElement(layer, customLayerProps)}
                        </Fragment>
                    )
                }

                throw new Error(`Unknown layer (${layer})`)
            })}
        </SvgWrapper>
    )
}

/*
    render() {
        const {
            markers,

            theme,

            useMesh,
            debugMesh,

            legends,
        } = this.props
        const { xScale, yScale } = computedData

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        const legendData = data.map(serie => ({
            id: serie.id,
            label: serie.id,
            color: getColor({ serie }),
        }))

        return (
            <Container
                isInteractive={isInteractive}
                theme={theme}
                animate={animate}
                motionDamping={motionDamping}
                motionStiffness={motionStiffness}
            >
                {({ showTooltip, hideTooltip }) => {
                    const onMouseEnter = this.handleMouseEnter(showTooltip)
                    const onMouseMove = this.handleMouseMove(showTooltip)
                    const onMouseLeave = this.handleMouseLeave(hideTooltip)

                    const layerById = {
                    }

                    if (animate === true) {
                        layerById.points = (
                            <TransitionMotion
                                key="points"
                                styles={points.map(point => ({
                                    key: point.id,
                                    data: point,
                                    style: {
                                        x: spring(point.x, springConfig),
                                        y: spring(point.y, springConfig),
                                        size: spring(getSymbolSize(point.data), springConfig),
                                    },
                                }))}
                            >
                                {interpolatedStyles => (
                                    <g>
                                        {interpolatedStyles.map(({ key, style, data: point }) => (
                                            <ScatterPlotItem
                                                key={key}
                                                point={point}
                                                x={style.x}
                                                y={style.y}
                                                size={style.size}
                                                color={getColor(point.data)}
                                                onMouseEnter={onMouseEnter}
                                                onMouseMove={onMouseMove}
                                                onMouseLeave={onMouseLeave}
                                                onClick={this.handleClick}
                                                theme={theme}
                                            />
                                        ))}
                                    </g>
                                )}
                            </TransitionMotion>
                        )
                    } else {
                        layerById.points = points.map(point => (
                            <ScatterPlotItem
                                key={point.id}
                                point={point}
                                x={point.x}
                                y={point.y}
                                size={getSymbolSize(point.data)}
                                color={getColor(point.data)}
                                data={point.data}
                                onMouseEnter={onMouseEnter}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                                onClick={this.handleClick}
                                theme={theme}
                            />
                        ))
                    }

                    if (isInteractive === true && useMesh === true) {
                        layerById.mesh = (
                            <Mesh
                                key="mesh"
                                nodes={points}
                                width={width}
                                height={height}
                                onMouseEnter={onMouseEnter}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                                onClick={this.handleClick}
                                debug={debugMesh}
                            />
                        )
                    }

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            theme={theme}
                        >
                            {layers.map((layer, i) => {
                                if (typeof layer === 'function') {
                                    return (
                                        <Fragment key={i}>
                                            {layer({ ...this.props, xScale, yScale })}
                                        </Fragment>
                                    )
                                }
                                return layerById[layer]
                            })}
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}
*/

ScatterPlot.propTypes = ScatterPlotPropTypes
ScatterPlot.defaultProps = ScatterPlotDefaultProps

export default withContainer(memo(ScatterPlot))
