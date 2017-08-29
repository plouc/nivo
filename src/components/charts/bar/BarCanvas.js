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
import { BarPropTypes } from './props'
import enhance from './enhance'

class BarCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        this.draw(props)
        return false
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

    render() {
        const { outerWidth, outerHeight } = this.props

        return (
            <canvas
                ref={surface => {
                    this.surface = surface
                }}
                width={outerWidth}
                height={outerHeight}
            />
        )
    }
}

BarCanvas.propTypes = BarPropTypes

export default enhance(BarCanvas)
