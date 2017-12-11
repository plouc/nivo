/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'

class CanvasWrapper extends Component {
    state = {}

    componentDidMount() {
        this.setState({
            ctx: this.surface.getContext('2d'),
        })
    }

    render() {
        const { width, height, pixelRatio, children } = this.props
        const { ctx } = this.state

        if (ctx) ctx.scale(pixelRatio, pixelRatio)

        return (
            <Fragment>
                <canvas
                    ref={surface => {
                        this.surface = surface
                    }}
                    width={width * pixelRatio}
                    height={height * pixelRatio}
                    style={{
                        width,
                        height,
                    }}
                    //onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                    //onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                    //onMouseLeave={this.handleMouseLeave(hideTooltip)}
                    //onClick={this.handleClick}
                />
                {ctx && children(ctx)}
            </Fragment>
        )
    }
}

export default CanvasWrapper
