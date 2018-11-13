/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import partial from 'lodash/partial'
import {
    midAngle,
    getPolarLabelProps,
    degreesToRadians,
    getRelativeCursor,
    getHoveredArc,
    Container,
} from '@nivo/core'
import { ChordPropTypes } from './props'
import enhance from './enhance'
import ChordArcTooltip from './ChordArcTooltip'

class ChordCanvas extends Component {
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

            width,
            height,
            margin,
            outerWidth,
            outerHeight,

            enableLabel,
            getLabel, // computed
            labelOffset,
            labelRotation,
            getLabelTextColor,

            arcGenerator, // computed
            ribbonGenerator, // computed

            theme,

            ribbons, // computed
            arcs, // computed
            radius, // computed
            getArcOpacity,
            getRibbonOpacity,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        const centerX = width / 2 + margin.left
        const centerY = height / 2 + margin.top

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)

        if (radius <= 0) return

        this.ctx.translate(centerX, centerY)

        this.ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily ||
            'sans-serif'}`

        ribbonGenerator.context(this.ctx)
        ribbons.forEach(ribbon => {
            this.ctx.save()
            this.ctx.globalAlpha = getRibbonOpacity(ribbon)

            this.ctx.beginPath()
            ribbonGenerator(ribbon)
            this.ctx.fillStyle = ribbon.source.color
            this.ctx.fill()

            this.ctx.restore()
        })

        arcGenerator.context(this.ctx)
        arcs.forEach(arc => {
            this.ctx.save()
            this.ctx.globalAlpha = getArcOpacity(arc)

            this.ctx.beginPath()
            arcGenerator(arc)
            this.ctx.fillStyle = arc.color
            this.ctx.fill()

            this.ctx.restore()

            if (enableLabel) {
                const labelTextColor = getLabelTextColor(arc, theme)
                const angle = midAngle(arc)
                const props = getPolarLabelProps(radius + labelOffset, angle, labelRotation)

                this.ctx.save()
                this.ctx.translate(props.x, props.y)
                this.ctx.rotate(degreesToRadians(props.rotate))

                this.ctx.textAlign = props.align
                this.ctx.textBaseline = props.baseline
                this.ctx.fillStyle = labelTextColor
                this.ctx.fillText(getLabel(arc), 0, 0)

                this.ctx.restore()
            }
        })
    }

    handleMouseHover = (showTooltip, hideTooltip, event) => {
        if (this.props.isInteractive !== true) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const {
            width,
            height,
            margin,
            radius,
            innerRadius,
            arcs,
            setCurrentArc,
            theme,
        } = this.props

        const centerX = width / 2 + margin.left
        const centerY = height / 2 + margin.top

        const arc = getHoveredArc(centerX, centerY, radius, innerRadius, arcs, x, y)
        if (arc) {
            setCurrentArc(arc)
            showTooltip(<ChordArcTooltip arc={arc} theme={theme} />, event)
        } else {
            setCurrentArc(null)
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => {
        if (this.props.isInteractive !== true) return

        this.props.setCurrentArc(null)
        hideTooltip()
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
                        onMouseEnter={partial(this.handleMouseHover, showTooltip, hideTooltip)}
                        onMouseMove={partial(this.handleMouseHover, showTooltip, hideTooltip)}
                        onMouseLeave={partial(this.handleMouseLeave, hideTooltip)}
                    />
                )}
            </Container>
        )
    }
}

ChordCanvas.propTypes = ChordPropTypes

export default enhance(ChordCanvas)
