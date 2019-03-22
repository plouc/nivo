/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import {
    isCursorInRect,
    getRelativeCursor,
    Container,
    degreesToRadians,
    BasicTooltip,
} from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import enhance from './enhance'
import { CalendarCanvasPropTypes } from './props'

const findDayUnderCursor = (days, size, spacing, margin, x, y) => {
    return days.find(day => {
        return (
            day.value !== undefined &&
            isCursorInRect(
                day.x + margin.left - spacing / 2,
                day.y + margin.top - spacing / 2,
                size + spacing,
                size + spacing,
                x,
                y
            )
        )
    })
}

class CalendarCanvas extends Component {
    static propTypes = CalendarCanvasPropTypes

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
            pixelRatio,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            colorScale,

            yearLegends,
            yearLegend,

            monthLegends,
            monthLegend,

            days,
            dayBorderWidth,
            dayBorderColor,

            legends,

            theme,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        days.forEach(day => {
            this.ctx.fillStyle = day.color
            if (dayBorderWidth > 0) {
                this.ctx.strokeStyle = dayBorderColor
                this.ctx.lineWidth = dayBorderWidth
            }

            this.ctx.beginPath()
            this.ctx.rect(day.x, day.y, day.size, day.size)
            this.ctx.fill()

            if (dayBorderWidth > 0) {
                this.ctx.stroke()
            }
        })

        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = theme.labels.text.fill
        this.ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

        monthLegends.forEach(month => {
            this.ctx.save()
            this.ctx.translate(month.x, month.y)
            this.ctx.rotate(degreesToRadians(month.rotation))
            this.ctx.fillText(monthLegend(month.year, month.month, month.date), 0, 0)
            this.ctx.restore()
        })

        yearLegends.forEach(year => {
            this.ctx.save()
            this.ctx.translate(year.x, year.y)
            this.ctx.rotate(degreesToRadians(year.rotation))
            this.ctx.fillText(yearLegend(year.year), 0, 0)
            this.ctx.restore()
        })

        legends.forEach(legend => {
            const legendData = colorScale.ticks(legend.itemCount).map(value => ({
                id: value,
                label: value,
                color: colorScale(value),
            }))

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
            days,
            daySpacing,
            tooltipFormat,
            tooltip,
        } = this.props

        if (!isInteractive || !days || days.length === 0) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const currentDay = findDayUnderCursor(days, days[0].size, daySpacing, margin, x, y)

        if (currentDay !== undefined) {
            showTooltip(
                <BasicTooltip
                    id={`${currentDay.day}`}
                    value={currentDay.value}
                    enableChip={true}
                    color={currentDay.color}
                    theme={theme}
                    format={tooltipFormat}
                    renderContent={
                        typeof tooltip === 'function' ? tooltip.bind(null, currentDay) : null
                    }
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
        const { isInteractive, margin, onClick, days, daySpacing } = this.props

        if (!isInteractive || !days || days.length === 0) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const currentDay = findDayUnderCursor(days, days[0].size, daySpacing, margin, x, y)
        if (currentDay !== undefined) onClick(currentDay, event)
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

CalendarCanvas.displayName = 'CalendarCanvas'

export default setDisplayName(CalendarCanvas.displayName)(enhance(CalendarCanvas))
