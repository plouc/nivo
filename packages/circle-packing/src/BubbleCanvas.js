/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Container } from '@nivo/core'
import enhance from './enhance'

class BubbleCanvas extends Component {
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
            nodes,

            pixelRatio,

            margin,
            outerWidth,
            outerHeight,

            theme,
            borderWidth,
            getBorderColor,

            enableLabel,
            getLabel,
            labelSkipRadius,
            getLabelTextColor,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        nodes.forEach(node => {
            this.ctx.save()

            if (borderWidth > 0) {
                this.ctx.strokeStyle = getBorderColor(node)
                this.ctx.lineWidth = borderWidth
            }

            this.ctx.beginPath()
            this.ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI)
            this.ctx.fillStyle = node.color
            this.ctx.fill()

            if (borderWidth > 0) {
                this.ctx.stroke()
            }
        })

        if (enableLabel) {
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

            // draw labels on top
            nodes
                .filter(({ r }) => r > labelSkipRadius)
                .forEach(node => {
                    const label = getLabel(node)
                    const labelTextColor = getLabelTextColor(node)

                    this.ctx.fillStyle = labelTextColor
                    this.ctx.fillText(label, node.x, node.y)
                })
        }
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme} animate={false}>
                {() => (
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
                    />
                )}
            </Container>
        )
    }
}

BubbleCanvas.displayName = 'BubbleCanvas'

const enhancedBubbleCanvas = enhance(BubbleCanvas)
enhancedBubbleCanvas.displayName = 'BubbleCanvas'

export default enhancedBubbleCanvas
