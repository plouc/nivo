/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDimensions, useTheme, withContainer } from '@nivo/core'
import { renderAxisToCanvas } from '@nivo/axes'
import { commonPropTypes, commonDefaultProps } from './props'
import { useParallelCoordinates } from './hooks'

const ParallelCoordinatesCanvas = ({
    data,
    layout,
    variables,
    width,
    height,
    margin: partialMargin,
    curve,
    colors,
    lineOpacity,
    strokeWidth,
    axesTicksPosition,
    pixelRatio,
}) => {
    const canvasEl = useRef(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        variablesScale,
        variablesWithScale,
        dataWithPoints,
        lineGenerator,
        getLineColor,
    } = useParallelCoordinates({
        width: innerWidth,
        height: innerHeight,
        data,
        variables,
        layout,
        colors,
        curve,
    })

    const theme = useTheme()

    useEffect(() => {
        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        lineGenerator.context(ctx)
        dataWithPoints.forEach(datum => {
            ctx.save()
            ctx.globalAlpha = lineOpacity

            ctx.beginPath()
            lineGenerator(datum.points)
            ctx.strokeStyle = getLineColor(datum)
            ctx.lineWidth = strokeWidth
            ctx.stroke()

            ctx.restore()
        })

        variablesWithScale.map(variable => {
            renderAxisToCanvas(ctx, {
                axis: layout === 'horizontal' ? 'y' : 'x',
                scale: variable.scale,
                x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
                y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
                length: layout === 'horizontal' ? innerHeight : innerWidth,
                ticksPosition: axesTicksPosition,
                theme,
            })
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        margin,
        lineGenerator,
        getLineColor,
        lineOpacity,
        strokeWidth,
        dataWithPoints,
        variablesWithScale,
        layout,
        axesTicksPosition,
        theme,
        pixelRatio,
    ])

    return (
        <canvas
            ref={canvasEl}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
            }}
        />
    )
}

ParallelCoordinatesCanvas.propTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

const WrappedParallelCoordinatesCanvas = withContainer(ParallelCoordinatesCanvas)
WrappedParallelCoordinatesCanvas.defaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}

export default WrappedParallelCoordinatesCanvas
