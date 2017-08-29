/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import { renderAxes } from '../../../lib/canvas/axes'
import Container from '../Container'
import BasicTooltip from '../../tooltip/BasicTooltip'
import { BarPropTypes } from './props'
import enhance from './enhance'
import { getRelativeCursor, cursorInRect } from '../../../lib/interactivity'

class BarCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        if (this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
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
            keys,
            getIndex,

            // dimensions
            width,
            height,
            outerWidth,
            outerHeight,
            margin,

            // layout
            layout,
            groupMode,
            xPadding,

            // axes
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,

            // theming
            getColor,
        } = props

        this.surface.width = outerWidth
        this.surface.height = outerHeight

        let result
        if (groupMode === 'grouped') {
            result = generateGroupedBars(layout, data, getIndex, keys, width, height, getColor, {
                xPadding,
            })
        } else if (groupMode === 'stacked') {
            result = generateStackedBars(layout, data, getIndex, keys, width, height, getColor, {
                xPadding,
            })
        }

        this.bars = result.bars

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        renderAxes(this.ctx, {
            xScale: result.xScale,
            yScale: result.yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
        })

        result.bars.forEach(({ x, y, color, width, height }) => {
            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, width, height)
        })
    }

    handleMouseHover = event => {
        if (!this.bars || !this.showTooltip) return

        const [x, y] = getRelativeCursor(this.surface, event)

        const { margin, theme } = this.props
        const bar = this.bars.find(bar =>
            cursorInRect(bar.x + margin.left, bar.y + margin.top, bar.width, bar.height, x, y)
        )

        if (bar !== undefined) {
            this.showTooltip(
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
            this.hideTooltip()
        }
    }

    handleMouseLeave = () => {
        if (!this.hideTooltip) return
        this.hideTooltip()
    }

    render() {
        const { outerWidth, outerHeight, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => {
                    this.showTooltip = showTooltip
                    this.hideTooltip = hideTooltip

                    return (
                        <canvas
                            ref={surface => {
                                this.surface = surface
                            }}
                            width={outerWidth}
                            height={outerHeight}
                            onMouseEnter={this.handleMouseHover}
                            onMouseMove={this.handleMouseHover}
                            onMouseLeave={this.handleMouseLeave}
                        />
                    )
                }}
            </Container>
        )
    }
}

BarCanvas.propTypes = BarPropTypes

export default enhance(BarCanvas)
