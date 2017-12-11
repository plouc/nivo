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

const LineAreaCanvas = ({ ctx, data, generator, xScale, yScale }) => {
    ctx.beginPath()
    generator.context(ctx)(
        data.map(d => ({
            x: d.x !== null ? xScale(d.x) : null,
            y: d.y !== null ? yScale(d.y) : null,
        }))
    )
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.fill()

    return null
}

LineAreaCanvas.propTypes = {
    ctx: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    generator: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
}

export default LineAreaCanvas
