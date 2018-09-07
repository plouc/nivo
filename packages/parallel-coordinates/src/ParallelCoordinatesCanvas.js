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
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { Container } from '@nivo/core'
import { renderAxisToCanvas } from '@nivo/axes'
import { commonPropTypes, commonDefaultProps } from './props'
import { commonEnhancers } from './enhance'
import { computeParallelCoordinatesLayout } from './compute'

export class ParallelCoordinatesCanvas extends Component {
    static propTypes = {
        ...commonPropTypes,
        pixelRatio: PropTypes.number.isRequired,
    }

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
            layout,
            dataWithPoints,
            variablesWithScale,
            variablesScale,
            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            getLineColor,
            margin,
            lineOpacity,
            strokeWidth,
            lineGenerator,
            axesTicksPosition,
            theme,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)
        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        lineGenerator.context(this.ctx)
        dataWithPoints.forEach(datum => {
            this.ctx.save()
            this.ctx.globalAlpha = lineOpacity

            this.ctx.beginPath()
            lineGenerator(datum.points)
            this.ctx.strokeStyle = getLineColor(datum)
            this.ctx.lineWidth = strokeWidth
            this.ctx.stroke()

            this.ctx.restore()
        })

        variablesWithScale.map(variable => {
            renderAxisToCanvas(this.ctx, {
                axis: layout === 'horizontal' ? 'y' : 'x',
                scale: variable.scale,
                x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
                y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
                length: layout === 'horizontal' ? height : width,
                ticksPosition: axesTicksPosition,
                theme,
            })
        })
    }

    render() {
        const { pixelRatio, outerWidth, outerHeight, theme, isInteractive } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
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

const enhance = compose(
    defaultProps({
        ...commonDefaultProps,
        pixelRatio:
            global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
    }),
    ...commonEnhancers,
    withPropsOnChange(
        ['width', 'height', 'data', 'variables', 'layout'],
        ({ width, height, data, variables, layout }) =>
            computeParallelCoordinatesLayout({
                width,
                height,
                data,
                variables,
                layout,
            })
    ),
    pure
)

export default setDisplayName('ParallelCoordinatesCanvas')(enhance(ParallelCoordinatesCanvas))
