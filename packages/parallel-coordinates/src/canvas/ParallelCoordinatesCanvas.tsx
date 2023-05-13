import { useEffect, useRef } from 'react'
import { Container, useDimensions } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { renderAxisToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useParallelCoordinates } from '../hooks'
import { BaseDatum, DatumGroupKeys, ParallelCoordinatesCanvasProps } from '../types'
import { canvasDefaultProps } from '../defaults'

type InnerParallelCoordinatesCanvasProps<
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
> = Omit<ParallelCoordinatesCanvasProps<Datum, GroupBy>, 'renderWrapper' | 'theme'>

export const InnerParallelCoordinatesCanvas = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
>({
    data,
    layout = canvasDefaultProps.layout,
    variables,
    groupBy,
    groups,
    width,
    height,
    margin: partialMargin,
    curve = canvasDefaultProps.curve,
    colors = canvasDefaultProps.colors,
    lineOpacity = canvasDefaultProps.lineOpacity,
    lineWidth = canvasDefaultProps.lineWidth,
    axesTicksPosition = canvasDefaultProps.axesTicksPosition,
    legends = canvasDefaultProps.legends,
    forwardLegendData,
    layers = canvasDefaultProps.layers,
    role = canvasDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    pixelRatio = canvasDefaultProps.pixelRatio,
}: InnerParallelCoordinatesCanvasProps<Datum, GroupBy>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        variablesScale,
        variablesWithScale,
        computedData,
        lineGenerator,
        legendData,
        customLayerContext,
    } = useParallelCoordinates<Datum, GroupBy>({
        width: innerWidth,
        height: innerHeight,
        data,
        variables,
        groupBy,
        groups,
        layout,
        colors,
        curve,
        forwardLegendData,
    })

    const theme = useTheme()

    useEffect(() => {
        if (canvasEl.current === null) return

        const ctx = canvasEl.current.getContext('2d')
        if (ctx === null) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (layer === 'axes') {
                variablesWithScale.forEach(variable => {
                    renderAxisToCanvas(ctx, {
                        axis: layout === 'horizontal' ? 'y' : 'x',
                        scale: variable.scale,
                        x: layout === 'horizontal' ? variablesScale(variable.id) : 0,
                        y: layout === 'horizontal' ? 0 : variablesScale(variable.id),
                        length: layout === 'horizontal' ? innerHeight : innerWidth,
                        ticksPosition: axesTicksPosition,
                        theme,
                    })
                })
            } else if (layer === 'lines') {
                lineGenerator.context(ctx)

                computedData.forEach(datum => {
                    ctx.save()
                    ctx.globalAlpha = lineOpacity

                    ctx.beginPath()
                    lineGenerator(datum.points)
                    ctx.strokeStyle = datum.color
                    ctx.lineWidth = lineWidth
                    ctx.stroke()

                    ctx.restore()
                })
            } else if (layer === 'legends') {
                legends.forEach(legend => {
                    renderLegendToCanvas(ctx, {
                        ...legend,
                        data: legendData,
                        containerWidth: innerWidth,
                        containerHeight: innerHeight,
                        theme,
                    })
                })
            } else if (typeof layer === 'function') {
                layer(ctx, customLayerContext)
            }
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        margin,
        layers,
        customLayerContext,
        lineGenerator,
        lineOpacity,
        lineWidth,
        computedData,
        variablesScale,
        variablesWithScale,
        layout,
        axesTicksPosition,
        legends,
        legendData,
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
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        />
    )
}

export const ParallelCoordinatesCanvas = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined = undefined
>({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: ParallelCoordinatesCanvasProps<Datum, GroupBy>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerParallelCoordinatesCanvas<Datum, GroupBy>
            isInteractive={isInteractive}
            {...otherProps}
        />
    </Container>
)
