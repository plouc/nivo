/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import range from 'lodash/range'
import { Container } from '@nivo/core'
import enhance from './enhance'
import { WafflePropTypes } from './props'
import { computeGrid } from './compute'
import { isCursorInRect, getRelativeCursor } from '@nivo/core'

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

            // data
            total,
            data,

            // layout
            rows,
            columns,
            padding,

            // dimensions
            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            // styling
            getColor,
            emptyColor,
            emptyOpacity,
            borderWidth,
            getBorderColor,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        const cellCount = rows * columns
        const unit = total / cellCount

        const { cells, cellSize, origin } = computeGrid(width, height, rows, columns, padding)

        this.cells = cells
        this.cellSize = cellSize
        this.origin = origin

        cells.forEach(cell => {
            cell.color = emptyColor
        })

        let previous = 0
        data.forEach((datum, groupIndex) => {
            const startAt = previous
            const endAt = startAt + Math.round(datum.value / unit)
            range(startAt, endAt).forEach(position => {
                const cell = cells[position]
                if (cell !== undefined) {
                    cell.data = datum
                    cell.groupIndex = groupIndex
                    cell.color = getColor(datum)
                }
            })
            previous = endAt
        })

        cells.forEach(cell => {
            this.ctx.fillStyle = cell.color
            this.ctx.fillRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize)

            if (borderWidth > 0) {
                this.ctx.strokeStyle = getBorderColor(cell)
                this.ctx.lineWidth = borderWidth
                this.ctx.strokeRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize)
            }
        })
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        const { isInteractive, margin, theme } = this.props

        if (!isInteractive) return
    }

    handleMouseLeave = hideTooltip => () => {
        hideTooltip()
    }

    handleClick = event => {
        const { isInteractive, margin, onClick } = this.props

        if (!isInteractive || !this.cells) return

        const [x, y] = getRelativeCursor(this.surface, event)

        const cell = findCellUnderCursor(this.cells, this.cellSize, this.origin, margin, x, y)
        if (cell !== undefined) onClick(cell, event)
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

WaffleCanvas.propTypes = WafflePropTypes
WaffleCanvas.displayName = 'WaffleCanvas'

export default enhance(WaffleCanvas)
