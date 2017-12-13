/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { line, area } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import setDisplayName from 'recompose/setDisplayName'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import {
    withTheme,
    withColors,
    withDimensions,
    curveFromProp,
    Container,
    lineCurvePropType,
} from '@nivo/core'
import { renderLegendToCanvas, LegendPropShape } from '@nivo/legends'
import { generateStackedLines } from '../compute'
import { scalesFromConfig } from '@nivo/scales'

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
                line.data.map(d => ({
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
                line.data.map(d => ({
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
            renderLegendToCanvas(ctx, {
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

LineChartCanvas.propTypes = {
    // data
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                })
            ).isRequired,
        })
    ).isRequired,

    stacked: PropTypes.bool.isRequired,
    curve: lineCurvePropType.isRequired,

    lines: PropTypes.array.isRequired,
    slices: PropTypes.array.isRequired,

    xScale: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    yScale: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // dots
    enableDots: PropTypes.bool.isRequired,
    dotsEveryNth: PropTypes.number.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number.isRequired,
    dotColor: PropTypes.any.isRequired,
    dotBorderWidth: PropTypes.number.isRequired,
    dotBorderColor: PropTypes.any.isRequired,
    enableDotLabel: PropTypes.bool.isRequired,

    // markers
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    // styling
    getColor: PropTypes.func.isRequired,
    enableArea: PropTypes.bool.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    lineWidth: PropTypes.number.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
    enableStackTooltip: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

const enhance = compose(
    setDisplayName('LineChartCanvas'),
    defaultProps({
        // scales
        xScale: {
            type: 'linear',
        },
        yScale: {
            type: 'linear',
            min: 0,
        },

        stacked: false,
        curve: 'linear',

        // grid
        enableGridX: true,
        enableGridY: true,

        // dots
        enableDots: true,
        dotsEveryNth: 1,
        dotSize: 6,
        dotColor: 'inherit',
        dotBorderWidth: 0,
        dotBorderColor: 'inherit',
        enableDotLabel: false,

        // styling
        colors: 'nivo',
        colorBy: 'id',
        enableArea: false,
        areaOpacity: 0.2,
        lineWidth: 2,
        defs: [],

        // interactivity
        isInteractive: true,
        enableStackTooltip: true,

        legends: [],
    }),
    withTheme(),
    withColors(),
    withDimensions(),
    withPropsOnChange(['curve', 'height'], ({ curve, height }) => ({
        areaGenerator: area()
            .defined(d => d && d.x !== null && d.y !== null)
            .x(d => d.x)
            .y0(height)
            .y1(d => d.y)
            .curve(curveFromProp(curve)),
        lineGenerator: line()
            .defined(d => d && d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    withPropsOnChange(
        ['data', 'stacked', 'width', 'height', 'xScale', 'yScale'],
        ({ data, stacked, width, height, xScale, yScale }) => {
            const scales = scalesFromConfig([
                {
                    ...xScale,
                    id: 'x',
                    property: 'x',
                    range: [0, width],
                    data: data.map(data => data.data),
                },
                {
                    ...yScale,
                    id: 'y',
                    property: 'y',
                    range: [height, 0],
                    stacked,
                    data: data.map(data => data.data),
                },
            ])

            return {
                xScale: scales.x,
                yScale: scales.y,
            }
        }
    ),
    withPropsOnChange(['data', 'stacked', 'getColor'], ({ data, stacked, getColor }) => {
        let lines
        if (stacked === true) {
            lines = generateStackedLines(data).map(serie => ({ ...serie, color: getColor(serie) }))
        } else {
            lines = data.map(serie => ({
                ...serie,
                color: getColor(serie),
            }))
        }

        const slices = []

        return { lines, slices }
    }),
    pure
)

export default enhance(LineChartCanvas)
