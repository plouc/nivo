import { Fragment, useCallback, memo } from 'react'
import { SvgWrapper, withContainer, useDimensions, useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import GeoGraticule from './GeoGraticule'
import GeoMapFeature from './GeoMapFeature'
import { useGeoMap } from './hooks'

const GeoMap = memo(props => {
    const {
        width,
        height,
        margin: partialMargin,
        features,
        layers = ['graticule', 'features'],
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
        onClick = () => {},
        tooltip: Tooltip,
        role = 'img',
    } = props
    const { margin, outerWidth, outerHeight } = useDimensions(width, height, partialMargin)
    const { graticule, path, getFillColor, getBorderWidth, getBorderColor } = useGeoMap({
        width,
        height,
        projectionType,
        projectionScale,
        projectionTranslation,
        projectionRotation,
        fillColor,
        borderWidth,
        borderColor,
    })

    const theme = useTheme()

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleClick = useCallback(
        (feature, event) => isInteractive && onClick && onClick(feature, event),
        [isInteractive, onClick]
    )
    const handleMouseEnter = useCallback(
        (feature, event) =>
            isInteractive && Tooltip && showTooltipFromEvent(<Tooltip feature={feature} />, event),
        [isInteractive, showTooltipFromEvent, Tooltip]
    )
    const handleMouseMove = useCallback(
        (feature, event) =>
            isInteractive && Tooltip && showTooltipFromEvent(<Tooltip feature={feature} />, event),
        [isInteractive, showTooltipFromEvent, Tooltip]
    )
    const handleMouseLeave = useCallback(
        () => isInteractive && hideTooltip(),
        [isInteractive, hideTooltip]
    )

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            theme={theme}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layer === 'graticule') {
                    if (enableGraticule !== true) return null

                    return (
                        <GeoGraticule
                            key="graticule"
                            path={path}
                            graticule={graticule}
                            lineWidth={graticuleLineWidth}
                            lineColor={graticuleLineColor}
                        />
                    )
                }
                if (layer === 'features') {
                    return (
                        <Fragment key="features">
                            {features.map(feature => (
                                <GeoMapFeature
                                    key={feature.id}
                                    feature={feature}
                                    path={path}
                                    fillColor={getFillColor(feature)}
                                    borderWidth={getBorderWidth(feature)}
                                    borderColor={getBorderColor(feature)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClick}
                                />
                            ))}
                        </Fragment>
                    )
                }

                return <Fragment key={i}>{layer(props)}</Fragment>
            })}
        </SvgWrapper>
    )
})

export default withContainer(GeoMap)
