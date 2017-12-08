/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/core'
import { getRelativeCursor, isCursorInRect } from '@nivo/core'
import { Container } from '@nivo/core'
import { BasicTooltip } from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import { ScatterPlotPropTypes } from './props'
import enhance from './enhance'

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
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

        data.forEach(serie => {
            serie.data.forEach(d => {
                this.ctx.fillStyle = getColor(serie)
                this.ctx.fillRect(xScale(d.x) - 2, yScale(d.y) - 2, 4, 4)
            })
        })

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
        if (!this.bars) return

        const { margin, theme } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const bar = findNodeUnderCursor(this.bars, margin, x, y)

        if (bar !== undefined) {
            showTooltip(
                <BasicTooltip
                    id={`${bar.data.id} - ${bar.data.indexValue}`}
                    value={bar.data.value}
                    enableChip={true}
                    color={bar.color}
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
        if (!this.bars) return

        const { margin, onClick } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const node = findNodeUnderCursor(this.bars, margin, x, y)
        if (node !== undefined) onClick(node.data, event)
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
