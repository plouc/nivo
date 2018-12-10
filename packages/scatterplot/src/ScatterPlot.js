/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { Container, SvgWrapper, Grid, CartesianMarkers } from '@nivo/core'
import { Axes } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Mesh } from '@nivo/voronoi'
import { enhanceSvg } from './enhance'
import { ScatterPlotPropTypes } from './props'
import ScatterPlotItem from './ScatterPlotItem'
import ScatterPlotTooltip from './ScatterPlotTooltip'

class ScatterPlot extends Component {
    static propTypes = ScatterPlotPropTypes

    showTooltip = (showTooltip, point, event) => {
        const { tooltipFormat, tooltip, theme, getColor } = this.props

        showTooltip(
            <ScatterPlotTooltip
                point={point}
                color={getColor(point.data)}
                format={tooltipFormat}
                tooltip={tooltip}
                theme={theme}
            />,
            event
        )
    }

    handleMouseEnter = showTooltip => (point, event) => {
        const { isInteractive, onMouseEnter } = this.props

        if (!isInteractive) return

        onMouseEnter && onMouseEnter(point, event)
        this.showTooltip(showTooltip, point, event)
    }

    handleMouseMove = showTooltip => (point, event) => {
        const { isInteractive, onMouseMove } = this.props

        if (!isInteractive) return

        onMouseMove && onMouseMove(point, event)
        this.showTooltip(showTooltip, point, event)
    }

    handleMouseLeave = hideTooltip => (point, event) => {
        const { isInteractive, onMouseLeave } = this.props

        if (!isInteractive) return

        onMouseLeave && onMouseLeave(point, event)
        hideTooltip()
    }

    handleClick = (point, event) => {
        const { isInteractive, onClick } = this.props
        if (!isInteractive || onClick === undefined) return

        onClick(point.data, event)
    }

    render() {
        const {
            data,

            computedData,
            points,

            layers,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            axisTop,
            axisRight,
            axisBottom,
            axisLeft,

            enableGridX,
            enableGridY,

            markers,

            theme,
            getSymbolSize,
            getColor,

            animate,
            motionStiffness,
            motionDamping,

            isInteractive,
            useMesh,
            debugMesh,

            legends,
        } = this.props
        const { xScale, yScale } = computedData

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }
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
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => {
                    const onMouseEnter = this.handleMouseEnter(showTooltip)
                    const onMouseMove = this.handleMouseMove(showTooltip)
                    const onMouseLeave = this.handleMouseLeave(hideTooltip)

                    const layerById = {
                        grid: (
                            <Grid
                                key="grid"
                                theme={theme}
                                width={width}
                                height={height}
                                xScale={enableGridX ? xScale : null}
                                yScale={enableGridY ? yScale : null}
                                {...motionProps}
                            />
                        ),
                        axes: (
                            <Axes
                                key="axes"
                                xScale={xScale}
                                yScale={yScale}
                                width={width}
                                height={height}
                                theme={theme}
                                top={axisTop}
                                right={axisRight}
                                bottom={axisBottom}
                                left={axisLeft}
                                {...motionProps}
                            />
                        ),
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
                                points={points}
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

export default enhanceSvg(ScatterPlot)
