import { memo, useRef, useEffect, useCallback } from 'react'
import { geoContains } from 'd3-geo'
import { getRelativeCursor, withContainer, useDimensions } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { useTooltip } from '@nivo/tooltip'
import { useGeoMap } from './hooks'

const getFeatureFromMouseEvent = (event, el, features, projection) => {
    const [x, y] = getRelativeCursor(el, event)

    return features.find(f => geoContains(f, projection.invert([x, y])))
}

const GeoMapCanvas = memo(props => {
    const {
        width,
        height,
        margin: partialMargin,
        pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        features,
        layers,

        projectionType = 'mercator',
        projectionScale = 100,
        projectionTranslation = [0.5, 0.5],
        projectionRotation = [0, 0, 0],

        fillColor = '#dddddd',
        borderWidth = 0,
        borderColor = '#000000',

        enableGraticule = false,
        graticuleLineWidth = 0.5,
        graticuleLineColor = '#999999',

        isInteractive = true,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick = () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseMove = () => {},
        tooltip: Tooltip,
    } = props

    const canvasEl = useRef(null)
    const theme = useTheme()
    const { margin, outerWidth, outerHeight } = useDimensions(width, height, partialMargin)
    const { projection, graticule, path, getFillColor, getBorderWidth, getBorderColor } = useGeoMap(
        {
            width,
            height,
            projectionType,
            projectionScale,
            projectionTranslation,
            projectionRotation,
            fillColor,
            borderWidth,
            borderColor,
        }
    )

    useEffect(() => {
        if (!canvasEl) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        path.context(ctx)

        layers.forEach(layer => {
            if (layer === 'graticule') {
                if (enableGraticule === true) {
                    ctx.lineWidth = graticuleLineWidth
                    ctx.strokeStyle = graticuleLineColor
                    ctx.beginPath()
                    path(graticule())
                    ctx.stroke()
                }
            } else if (layer === 'features') {
                features.forEach(feature => {
                    ctx.beginPath()
                    path(feature)
                    ctx.fillStyle = getFillColor(feature)
                    ctx.fill()

                    const borderWidth = getBorderWidth(feature)
                    if (borderWidth > 0) {
                        ctx.strokeStyle = getBorderColor(feature)
                        ctx.lineWidth = borderWidth
                        ctx.stroke()
                    }
                })
            } else {
                layer(ctx, props)
            }
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        margin,
        pixelRatio,
        theme,
        path,
        graticule,
        getFillColor,
        getBorderWidth,
        getBorderColor,
        features,
        layers,
        enableGraticule,
        graticuleLineColor,
        graticuleLineWidth,
        props,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseMove = useCallback(
        event => {
            if (!isInteractive || !Tooltip) return

            const feature = getFeatureFromMouseEvent(event, canvasEl.current, features, projection)
            if (feature) {
                showTooltipFromEvent(<Tooltip feature={feature} />, event)
            } else {
                hideTooltip()
            }
            onMouseMove?.(feature || null, event)
        },
        [
            showTooltipFromEvent,
            hideTooltip,
            isInteractive,
            Tooltip,
            canvasEl,
            features,
            projection,
            onMouseMove,
        ]
    )
    const handleMouseLeave = useCallback(
        () => isInteractive && hideTooltip(),
        [isInteractive, hideTooltip]
    )
    const handleClick = useCallback(
        event => {
            if (!isInteractive || !onClick) return

            const feature = getFeatureFromMouseEvent(event, canvasEl.current, features, projection)
            if (feature) {
                onClick(feature, event)
            }
        },
        [isInteractive, canvasEl, features, projection, onClick]
    )

    return (
        <canvas
            ref={canvasEl}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
                cursor: isInteractive ? 'auto' : 'normal',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    )
})

export default withContainer(GeoMapCanvas)
