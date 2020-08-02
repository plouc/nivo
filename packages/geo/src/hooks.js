/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { isFunction, get } from 'lodash'
import { format } from 'd3-format'
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
import { guessQuantizeColorScale, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useQuantizeColorScaleLegendData } from '@nivo/legends'

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

export const useGeoMap = ({
    width,
    height,
    projectionType,
    projectionScale,
    projectionTranslation,
    projectionRotation,
    fillColor,
    borderWidth,
    borderColor,
}) => {
    const projection = useMemo(() => {
        return projectionById[projectionType]()
            .scale(projectionScale)
            .translate([width * projectionTranslation[0], height * projectionTranslation[1]])
            .rotate(projectionRotation)
    }, [
        width,
        height,
        projectionType,
        projectionScale,
        projectionTranslation[0],
        projectionTranslation[1],
        projectionRotation[0],
        projectionRotation[1],
        projectionRotation[2],
    ])
    const path = useMemo(() => geoPath(projection), [projection])
    const graticule = useMemo(() => geoGraticule())

    const theme = useTheme()
    const getBorderWidth = useMemo(
        () => (typeof borderWidth === 'function' ? borderWidth : () => borderWidth),
        [borderWidth]
    )
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getFillColor = useMemo(
        () => (typeof fillColor === 'function' ? fillColor : () => fillColor),
        [fillColor]
    )

    return {
        projection,
        path,
        graticule,
        getBorderWidth,
        getBorderColor,
        getFillColor,
    }
}

export const useChoropleth = ({
    features,
    data,
    match,
    label,
    value,
    valueFormat,
    colors,
    unknownColor,
    domain,
}) => {
    const findMatchingDatum = useMemo(() => {
        if (isFunction(match)) return match
        return (feature, datum) => {
            const featureKey = get(feature, match)
            const datumKey = get(datum, match)

            return featureKey && featureKey === datumKey
        }
    }, [match])
    const getLabel = useMemo(() => (isFunction(label) ? label : datum => get(datum, label)), [
        label,
    ])
    const getValue = useMemo(() => (isFunction(value) ? value : datum => get(datum, value)), [
        value,
    ])
    const valueFormatter = useMemo(() => {
        if (valueFormat === undefined) return d => d
        if (isFunction(valueFormat)) return valueFormat
        return format(valueFormat)
    }, [valueFormat])

    const colorScale = useMemo(() => guessQuantizeColorScale(colors).domain(domain), [
        colors,
        domain,
    ])
    const getFillColor = useMemo(() => {
        return feature => {
            if (feature.value === undefined) return unknownColor
            return colorScale(feature.value)
        }
    }, [colorScale, unknownColor])

    const boundFeatures = useMemo(
        () =>
            features.map(feature => {
                const datum = data.find(datum => findMatchingDatum(feature, datum))
                const datumValue = getValue(datum)

                if (datum) {
                    const featureWithData = {
                        ...feature,
                        data: datum,
                        value: datumValue,
                        formattedValue: valueFormatter(datumValue),
                    }
                    featureWithData.color = getFillColor(featureWithData)
                    featureWithData.label = getLabel(featureWithData)

                    return featureWithData
                }

                return feature
            }),
        [features, data, findMatchingDatum, getValue, valueFormatter, getFillColor]
    )

    const legendData = useQuantizeColorScaleLegendData({
        scale: colorScale,
        valueFormat: valueFormatter,
    })

    return {
        colorScale,
        getFillColor,
        boundFeatures,
        valueFormatter,
        legendData,
    }
}
