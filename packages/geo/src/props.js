/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { quantizeColorScalePropType } from '@nivo/core'
import { inheritedColorPropType } from '@nivo/colors'
import { projectionById } from './hooks'
import ChoroplethTooltip from './ChoroplethTooltip'

const commonPropTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['Feature']).isRequired,
            properties: PropTypes.object,
            geometry: PropTypes.object.isRequired,
        })
    ).isRequired,

    projectionType: PropTypes.oneOf(Object.keys(projectionById)).isRequired,
    projectionScale: PropTypes.number.isRequired,
    projectionTranslation: PropTypes.arrayOf(PropTypes.number).isRequired,
    projectionRotation: PropTypes.arrayOf(PropTypes.number).isRequired,

    fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    borderColor: inheritedColorPropType.isRequired,

    enableGraticule: PropTypes.bool.isRequired,
    graticuleLineWidth: PropTypes.number.isRequired,
    graticuleLineColor: PropTypes.string.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.any,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['graticule', 'features']), PropTypes.func])
    ).isRequired,
}

export const GeoMapPropTypes = {
    ...commonPropTypes,
}

export const GeoMapCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    ...commonPropTypes,
}

const commonChoroplethPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    valueFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    colors: quantizeColorScalePropType.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    unknownColor: PropTypes.string.isRequired,
    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['graticule', 'features', 'legends']), PropTypes.func])
    ).isRequired,
}

export const ChoroplethPropTypes = {
    ...GeoMapPropTypes,
    ...commonChoroplethPropTypes,
}

export const ChoroplethCanvasPropTypes = {
    ...GeoMapCanvasPropTypes,
    ...commonChoroplethPropTypes,
}

const commonDefaultProps = {
    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: false,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#999999',

    fillColor: '#dddddd',
    borderWidth: 0,
    borderColor: '#000000',

    isInteractive: true,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseMove: () => {},
    onClick: () => {},

    layers: ['graticule', 'features'],
    legends: [],
}

export const GeoMapDefaultProps = {
    ...commonDefaultProps,
}

export const GeoMapCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}

const commonChoroplethDefaultProps = {
    match: 'id',
    label: 'id',
    value: 'value',
    colors: 'PuBuGn',
    unknownColor: '#999',
    tooltip: ChoroplethTooltip,
    layers: ['graticule', 'features', 'legends'],
}

export const ChoroplethDefaultProps = {
    ...GeoMapDefaultProps,
    ...commonChoroplethDefaultProps,
}

export const ChoroplethCanvasDefaultProps = {
    ...GeoMapCanvasDefaultProps,
    ...commonChoroplethDefaultProps,
}
