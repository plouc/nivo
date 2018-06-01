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
import {
    getHoveredArc,
    getRelativeCursor,
    getLabelGenerator,
    getInheritedColorGenerator,
    Container,
} from '@nivo/core'
import { arcPropType } from './props'
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
        const { centerX, centerY, margin, radius, innerRadius, arcs, theme } = this.props

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
        if (arc !== undefined) this.props.onClick(arc.data, event)
    }

    draw(props) {
        const {
            arcs,
            arcGenerator,

            // layout
            centerX,
            centerY,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,

            // slices labels
            enableSlicesLabels,
            sliceLabel,
            slicesLabelsSkipAngle,
            slicesLabelsTextColor,

            theme,

            legends,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.save()
        this.ctx.translate(margin.left, margin.top)

        arcGenerator.context(this.ctx)

        this.ctx.save()
        this.ctx.translate(centerX, centerY)

        arcs.forEach(arc => {
            this.ctx.beginPath()
            arcGenerator(arc)
            this.ctx.fillStyle = arc.color
            this.ctx.fill()
        })

        if (enableSlicesLabels === true) {
            const getSliceLabel = getLabelGenerator(sliceLabel)
            const getSliceLabelTextColor = getInheritedColorGenerator(
                slicesLabelsTextColor,
                'labels.textColor'
            )

            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'

            arcs
                .filter(arc => slicesLabelsSkipAngle === 0 || arc.angleDeg > slicesLabelsSkipAngle)
                .forEach(arc => {
                    const [centroidX, centroidY] = arcGenerator.centroid(arc)

                    const sliceLabel = getSliceLabel(arc.data)
                    const sliceLabelTextColor = getSliceLabelTextColor(arc, theme)

                    this.ctx.save()
                    this.ctx.translate(centroidX, centroidY)
                    this.ctx.fillStyle = sliceLabelTextColor
                    this.ctx.fillText(sliceLabel, 0, 0)
                    this.ctx.restore()
                })
        }

        this.ctx.restore()
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

export default PieCanvasRenderer
