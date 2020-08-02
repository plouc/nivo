/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useCallback, memo } from 'react'
import { SvgWrapper, withContainer, useDimensions, useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { GeoMapPropTypes, GeoMapDefaultProps } from './props'
import GeoGraticule from './GeoGraticule'
import GeoMapFeature from './GeoMapFeature'
import { useGeoMap } from './hooks'

const GeoMap = memo(props => {
    const {
        width,
        height,
        margin: partialMargin,
        features,
        layers,
        projectionType,
        projectionScale,
        projectionTranslation,
        projectionRotation,
        fillColor,
        borderWidth,
        borderColor,
        enableGraticule,
        graticuleLineWidth,
        graticuleLineColor,
        isInteractive,
        onClick,
        tooltip: Tooltip,
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
    const handleMouseLeave = useCallback(() => isInteractive && hideTooltip(), [
        isInteractive,
        hideTooltip,
    ])

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
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

GeoMap.displayName = 'GeoMap'
GeoMap.propTypes = GeoMapPropTypes
GeoMap.defaultProps = GeoMapDefaultProps

export default withContainer(GeoMap)
