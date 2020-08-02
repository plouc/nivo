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
import { getHoveredArc, getRelativeCursor, getLabelGenerator, Container } from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/colors'
import { renderLegendToCanvas } from '@nivo/legends'
import { arcPropType } from './props'
import { drawSliceLabels, drawRadialLabels } from './canvas'
import PieTooltip from './PieTooltip'

class PieCanvasRenderer extends Component {
    static propTypes = {
        arcs: PropTypes.arrayOf(arcPropType).isRequired,
        arcGenerator: PropTypes.func.isRequired,

        // resolution
        pixelRatio: PropTypes.number.isRequired,

        // dimensions/layout
        outerWidth: PropTypes.number.isRequired,
        outerHeight: PropTypes.number.isRequired,
        centerX: PropTypes.number.isRequired,
        centerY: PropTypes.number.isRequired,
        margin: PropTypes.object.isRequired,
        radius: PropTypes.number.isRequired,
        innerRadius: PropTypes.number.isRequired,

        // interactivity
        isInteractive: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,

        // theming
        theme: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        // only update if the DOM needs to be updated
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        }

        this.draw(props)
        return false
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    getArcFromMouse = event => {
        const [x, y] = getRelativeCursor(this.surface, event)
        const { centerX, centerY, margin, radius, innerRadius, arcs } = this.props

        return getHoveredArc(
            margin.left + centerX,
            margin.top + centerY,
            radius,
            innerRadius,
            arcs,
            x,
            y
        )
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        if (this.props.isInteractive !== true) return

        const arc = this.getArcFromMouse(event)
        if (arc) {
            showTooltip(
                <PieTooltip data={arc.data} color={arc.color} theme={this.props.theme} />,
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
        const arc = this.getArcFromMouse(event)
        if (arc) this.props.onClick(arc.data, event)
    }

    draw(props) {
        const {
            arcs,
            arcGenerator,

            // layout
            width,
            height,
            centerX,
            centerY,
            radius,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,

            borderWidth,
            borderColor,

            // labels
            enableSlicesLabels,
            enableRadialLabels,

            legends,

            theme,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.save()
        this.ctx.translate(margin.left, margin.top)

        arcGenerator.context(this.ctx)

        this.ctx.save()
        this.ctx.translate(centerX, centerY)

        const getBorderColor = getInheritedColorGenerator(borderColor, theme)

        arcs.forEach(arc => {
            this.ctx.beginPath()
            this.ctx.fillStyle = arc.color
            this.ctx.strokeStyle = getBorderColor({ ...arc.data, color: arc.color })
            this.ctx.lineWidth = borderWidth
            arcGenerator(arc)
            this.ctx.fill()
            if (borderWidth > 0) this.ctx.stroke()
        })

        if (enableSlicesLabels === true) {
            const { sliceLabel, slicesLabelsSkipAngle, slicesLabelsTextColor } = props

            drawSliceLabels(this.ctx, arcs, {
                arcGenerator,
                skipAngle: slicesLabelsSkipAngle,
                getLabel: getLabelGenerator(sliceLabel),
                getTextColor: getInheritedColorGenerator(slicesLabelsTextColor, theme),
                theme,
            })
        }

        if (enableRadialLabels === true) {
            const {
                radialLabel,
                radialLabelsSkipAngle,
                radialLabelsLinkOffset,
                radialLabelsLinkStrokeWidth,
                radialLabelsLinkDiagonalLength,
                radialLabelsLinkHorizontalLength,
                radialLabelsTextXOffset,
                radialLabelsTextColor,
                radialLabelsLinkColor,
            } = props

            drawRadialLabels(this.ctx, arcs, {
                radius,
                getLabel: getLabelGenerator(radialLabel),
                skipAngle: radialLabelsSkipAngle,
                linkOffset: radialLabelsLinkOffset,
                linkDiagonalLength: radialLabelsLinkDiagonalLength,
                linkHorizontalLength: radialLabelsLinkHorizontalLength,
                linkStrokeWidth: radialLabelsLinkStrokeWidth,
                textXOffset: radialLabelsTextXOffset,
                getTextColor: getInheritedColorGenerator(radialLabelsTextColor, theme),
                getLinkColor: getInheritedColorGenerator(radialLabelsLinkColor, theme),
                theme,
            })
        }

        this.ctx.restore()

        legends.forEach(legend => {
            renderLegendToCanvas(this.ctx, {
                ...legend,
                data: arcs.map(arc => ({
                    id: arc.data.id,
                    label: arc.data.id,
                    color: arc.color,
                })),
                containerWidth: width,
                containerHeight: height,
                theme,
            })
        })
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

export default PieCanvasRenderer
