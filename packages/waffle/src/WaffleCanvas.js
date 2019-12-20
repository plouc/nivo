/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import range from 'lodash.range'
import setDisplayName from 'recompose/setDisplayName'
import { isCursorInRect, getRelativeCursor, Container } from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import enhance from './enhance'
import { WaffleCanvasPropTypes } from './props'
import WaffleCellTooltip from './WaffleCellTooltip'

const findCellUnderCursor = (cells, cellSize, origin, margin, x, y) =>
    cells.find(cell =>
        isCursorInRect(
            cell.x + origin.x + margin.left,
            cell.y + origin.y + margin.top,
            cellSize,
            cellSize,
            x,
            y
        )
    )

class WaffleCanvas extends Component {
    static propTypes = WaffleCanvasPropTypes

    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    draw(props) {
        const {
            pixelRatio,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            getColor,
            emptyColor,
            emptyOpacity,
            borderWidth,
            getBorderColor,

            cells,
            cellSize,
            origin,
            computedData,
            legendData,

            legends,

            theme,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        cells.forEach(cell => {
            cell.color = emptyColor
        })

        computedData.forEach(datum => {
            range(datum.startAt, datum.endAt).forEach(position => {
                const cell = cells[position]
                if (cell !== undefined) {
                    cell.data = datum
                    cell.groupIndex = datum.groupIndex
                    cell.color = getColor(datum)
                }
            })
        })

        cells.forEach(cell => {
            this.ctx.save()
            this.ctx.globalAlpha = cell.data ? 1 : emptyOpacity

            this.ctx.fillStyle = cell.color
            this.ctx.fillRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize)

            if (borderWidth > 0) {
                this.ctx.strokeStyle = getBorderColor(cell)
                this.ctx.lineWidth = borderWidth
                this.ctx.strokeRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize)
            }

            this.ctx.restore()
        })

        legends.forEach(legend => {
            renderLegendToCanvas(this.ctx, {
                ...legend,
                data: legendData,
                containerWidth: width,
                containerHeight: height,
                theme,
            })
        })
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        const {
            isInteractive,
            margin,
            theme,
            cells,
            cellSize,
            origin,
            tooltipFormat,
            tooltip,
        } = this.props

        if (!isInteractive || !cells) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y)

        if (cell !== undefined && cell.data) {
            showTooltip(
                <WaffleCellTooltip
                    position={cell.position}
                    row={cell.row}
                    column={cell.column}
                    color={cell.color}
                    data={cell.data}
                    theme={theme}
                    tooltipFormat={tooltipFormat}
                    tooltip={tooltip}
                />,
                event
            )
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        if (this.props.isInteractive !== true) return

        hideTooltip()
    }

    handleClick = event => {
        const { isInteractive, margin, onClick, cells, cellSize, origin } = this.props

        if (!isInteractive || !cells) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y)
        if (cell !== undefined) onClick(cell, event)
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme} animate={false}>
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

WaffleCanvas.displayName = 'WaffleCanvas'

export default setDisplayName(WaffleCanvas.displayName)(enhance(WaffleCanvas))
