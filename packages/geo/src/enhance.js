/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isFunction, get } from 'lodash'
import {
    geoPath,
    geoAzimuthalEqualArea,
    geoAzimuthalEquidistant,
    geoGnomonic,
    geoOrthographic,
    geoStereographic,
    geoEqualEarth,
    geoEquirectangular,
    geoMercator,
    geoTransverseMercator,
    geoNaturalEarth1,
    geoGraticule,
} from 'd3-geo'
import { compose, defaultProps, withPropsOnChange, pure, setDisplayName } from 'recompose'
import { withDimensions, withTheme, guessQuantizeColorScale } from '@nivo/core'
import {
    GeoMapDefaultProps,
    GeoMapCanvasDefaultProps,
    ChoroplethDefaultProps,
    ChoroplethCanvasDefaultProps,
} from './props'

export const projectionById = {
    azimuthalEqualArea: geoAzimuthalEqualArea,
    azimuthalEquidistant: geoAzimuthalEquidistant,
    gnomonic: geoGnomonic,
    orthographic: geoOrthographic,
    stereographic: geoStereographic,
    equalEarth: geoEqualEarth,
    equirectangular: geoEquirectangular,
    mercator: geoMercator,
    transverseMercator: geoTransverseMercator,
    naturalEarth1: geoNaturalEarth1,
}

const commonEnhancers = [
    withTheme(),
    withDimensions(),
    withPropsOnChange(
        ['width', 'height', 'projectionType', 'projectionScale', 'projectionTranslation'],
        ({
            width,
            height,
            projectionType,
            projectionScale,
            projectionTranslation: [translateX, translateY],
        }) => {
            const projection = projectionById[projectionType]()
                .scale(projectionScale)
                .translate([width * translateX, height * translateY])
                .rotate([-10, 0])

            const pathHelper = geoPath(projection)

            return { projection, pathHelper }
        }
    ),
    withPropsOnChange(
        ['fillColor', 'borderWidth', 'borderColor'],
        ({ fillColor, borderWidth, borderColor }) => {
            return {
                getFillColor: typeof fillColor === 'function' ? fillColor : () => fillColor,
                getBorderWidth: typeof borderWidth === 'function' ? borderWidth : () => borderWidth,
                getBorderColor: typeof borderColor === 'function' ? borderColor : () => borderColor,
            }
        }
    ),
    withPropsOnChange(['enableGraticule'], ({ enableGraticule }) => {
        if (enableGraticule !== true) return

        const graticule = geoGraticule()

        return {
            graticule,
        }
    }),
]

export const enhanceGeoMap = Component => {
    if (Component.displayName === 'GeoMap') {
        return setDisplayName(Component.displayName)(
            compose(
                defaultProps(GeoMapDefaultProps),
                ...commonEnhancers,
                pure
            )(Component)
        )
    }

    if (Component.displayName === 'GeoMapCanvas') {
        return setDisplayName(Component.displayName)(
            compose(
                defaultProps(GeoMapCanvasDefaultProps),
                ...commonEnhancers,
                pure
            )(Component)
        )
    }
}

export const enhanceChoropleth = Component => {
    const defaultComponentProps =
        Component.displayName === 'Choropleth'
            ? ChoroplethDefaultProps
            : ChoroplethCanvasDefaultProps

    return setDisplayName(Component.displayName)(
        compose(
            defaultProps(defaultComponentProps),
            withPropsOnChange(
                ['features', 'data', 'matchOn', 'valueFrom'],
                ({ features, data, matchOn, valueFrom }) => {
                    let predicate
                    if (isFunction(matchOn)) {
                        predicate = matchOn
                    } else {
                        predicate = (feature, datum) => {
                            const featureKey = get(feature, matchOn)
                            const datumKey = get(datum, matchOn)

                            return featureKey && featureKey === datumKey
                        }
                    }

                    const valueAccessor = isFunction(valueFrom)
                        ? valueFrom
                        : datum => get(datum, valueFrom)

                    return {
                        features: features.map(feature => {
                            const datum = data.find(datum => predicate(feature, datum))
                            if (datum) {
                                return {
                                    ...feature,
                                    data: datum,
                                    value: valueAccessor(datum),
                                }
                            }

                            return feature
                        }),
                    }
                }
            ),
            withPropsOnChange(['colors', 'unknownColor'], ({ colors, unknownColor }) => {
                const colorScale = guessQuantizeColorScale(colors).domain([0, 1000000])

                return {
                    fillColor: feature => {
                        if (feature.value === undefined) return unknownColor
                        return colorScale(feature.value)
                    },
                }
            })
        )
    )(Component)
}
