/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { getRelativeCursor, isCursorInRect } from '@nivo/core'
import { Container } from '@nivo/core'
import { BasicTooltip } from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import { ScatterPlotPropTypes } from '../props'
import enhance from '../enhance'

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(
            node.x + margin.left - node.size / 2,
            node.y + margin.top - node.size / 2,
            node.size,
            node.size,
            x,
            y
        )
    )

class ScatterPlotCanvas extends Component {
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

    draw(props) {
        const {
            // data
            data,

            xScale,
            yScale,

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

        this.ctx.strokeStyle = '#dddddd'
        enableGridX &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: xScale,
                axis: 'x',
            })
        enableGridY &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: yScale,
                axis: 'y',
            })

        this.ctx.strokeStyle = '#000000'
        renderAxesToCanvas(this.ctx, {
            xScale,
            yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
        })

        const items = data.reduce(
            (agg, serie) => [
                ...agg,
                ...serie.data.map(d => ({
                    x: xScale(d.x),
                    y: yScale(d.y),
                    size: symbolSize,
                    color: getColor(serie),
                    data: { ...d, serie: serie.id },
                })),
            ],
            []
        )

        items.forEach(d => {
            this.ctx.fillStyle = d.color
            this.ctx.fillRect(d.x - symbolSize / 2, d.y - symbolSize / 2, symbolSize, symbolSize)
        })

        this.items = items

        const legendData = data.map(serie => ({
            label: serie.id,
            fill: getColor(serie),
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

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        if (!this.items) return

        const { margin, theme } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const item = findNodeUnderCursor(this.items, margin, x, y)
        if (item !== undefined) {
            showTooltip(
                <BasicTooltip
                    id={item.data.serie}
                    value={`x: ${item.data.x}, y: ${item.data.y}`}
                    enableChip={true}
                    color={item.color}
                    theme={theme}
                />,
                event
            )
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        hideTooltip()
    }

    handleClick = event => {
        if (!this.items) return

        const { margin, onClick } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const item = findNodeUnderCursor(this.items, margin, x, y)
        if (item !== undefined) onClick(item.data, event)
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
                        onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                        onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                        onMouseLeave={this.handleMouseLeave(hideTooltip)}
                        onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

ScatterPlotCanvas.propTypes = ScatterPlotPropTypes

export default enhance(ScatterPlotCanvas)
