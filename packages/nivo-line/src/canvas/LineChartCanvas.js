/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { sortBy } from 'lodash'
import { line, area } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import setDisplayName from 'recompose/setDisplayName'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { withTheme, withColors, withDimensions, curveFromProp, Container } from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import { getScales, getStackedScales, generateLines, generateStackedLines } from '../compute'
import { LinePropTypes, LineDefaultProps } from '../props'

class LineChartCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    renderGrid(ctx, { enableGridX, enableGridY, xScale, yScale, width, height }) {
        ctx.strokeStyle = '#dddddd'
        enableGridX &&
            renderGridLinesToCanvas(ctx, {
                width,
                height,
                scale: xScale,
                axis: 'x',
            })
        enableGridY &&
            renderGridLinesToCanvas(ctx, {
                width,
                height,
                scale: yScale,
                axis: 'y',
            })
    }

    renderAxes(ctx, { xScale, yScale, width, height, axisTop, axisRight, axisBottom, axisLeft }) {
        this.ctx.strokeStyle = '#000000'
        renderAxesToCanvas(ctx, {
            xScale,
            yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
        })
    }

    renderAreas(ctx, { generator, lines, xScale, yScale, opacity }) {
        const boundGenerator = generator.context(ctx)

        ctx.save()
        ctx.globalAlpha = opacity

        lines.forEach(line => {
            ctx.beginPath()
            boundGenerator(
                line.points.map(d => ({
                    x: d.x !== null ? xScale(d.x) : null,
                    y: d.y !== null ? yScale(d.y) : null,
                }))
            )
            ctx.fillStyle = line.color
            ctx.fill()
        })

        ctx.restore()
    }

    renderLines(ctx, { generator, lines, xScale, yScale, lineWidth }) {
        const boundGenerator = generator.context(ctx)

        lines.forEach(line => {
            ctx.beginPath()
            boundGenerator(
                line.points.map(d => ({
                    x: d.x !== null ? xScale(d.x) : null,
                    y: d.y !== null ? yScale(d.y) : null,
                }))
            )
            ctx.lineWidth = lineWidth
            ctx.strokeStyle = line.color
            ctx.stroke()
        })
    }

    renderLegends(ctx, { lines, legends, width, height }) {
        const legendData = lines.map(line => ({
            label: line.id,
            fill: line.color,
        }))

        legends.forEach(legend => {
            renderLegendToCanvas(this.ctx, {
                ...legend,
                data: legendData,
                containerWidth: width,
                containerHeight: height,
            })
        })
    }

    draw(props) {
        const {
            lines,

            xScale,
            yScale,

            areaGenerator,
            lineGenerator,

            lineWidth,

            enableArea,
            areaOpacity,

            // dimensions
            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,

            // axes
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,
            enableGridX,
            enableGridY,

            // symbols
            symbolSize,

            // theming
            getColor,

            legends,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        this.renderGrid(this.ctx, {
            enableGridX,
            enableGridY,
            xScale,
            yScale,
            width,
            height,
        })

        this.renderAxes(this.ctx, {
            xScale,
            yScale,
            width,
            height,
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,
        })

        enableArea &&
            this.renderAreas(this.ctx, {
                lines,
                generator: areaGenerator,
                xScale,
                yScale,
                opacity: areaOpacity,
            })

        this.renderLines(this.ctx, {
            lines,
            generator: lineGenerator,
            xScale,
            yScale,
            lineWidth,
        })

        this.renderLegends(this.ctx, {
            lines,
            legends,
            width,
            height,
        })
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <canvas
                        ref={surface => {
                            this.surface = surface
                        }}
                        width={outerWidth * pixelRatio}
                        height={outerHeight * pixelRatio}
                        style={{
                            width: outerWidth,
                            height: outerHeight,
                        }}
                        //onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                        //onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                        //onMouseLeave={this.handleMouseLeave(hideTooltip)}
                        //onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

LineChartCanvas.propTypes = LinePropTypes

const enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withPropsOnChange(['curve', 'height'], ({ curve, height }) => ({
        areaGenerator: area()
            .x(d => d.x)
            .y0(height)
            .y1(d => d.y)
            .curve(curveFromProp(curve)),
        lineGenerator: line()
            .defined(d => d.value !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    withPropsOnChange(
        ['data', 'stacked', 'width', 'height', 'minY', 'maxY', 'xScaleType'],
        ({ data, stacked, width, height, margin, minY, maxY, xScaleType }) => {
            let scales
            const args = { data, width, height, minY, maxY, xScaleType }
            if (stacked === true) {
                scales = getStackedScales(args)
            } else {
                scales = getScales(args)
            }

            return {
                margin,
                width,
                height,
                ...scales,
            }
        }
    ),
    withPropsOnChange(
        ['getColor', 'xScale', 'yScale'],
        ({ data, stacked, xScale, yScale, getColor }) => {
            let lines
            if (stacked === true) {
                lines = generateStackedLines(data, xScale, yScale, getColor)
            } else {
                lines = generateLines(data, xScale, yScale, getColor)
            }

            const slices = xScale.domain().map((id, i) => {
                let points = sortBy(
                    lines.map(line => ({
                        id: line.id,
                        value: line.points[i].value,
                        y: line.points[i].y,
                        color: line.color,
                    })),
                    'y'
                )

                return {
                    id,
                    x: xScale(id),
                    points,
                }
            })

            return { lines, slices }
        }
    ),
    pure
)

export default setDisplayName('LineChartCanvas')(enhance(LineChartCanvas))
