/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import without from 'lodash/without'
import {
    curveBasis,
    curveBasisClosed,
    curveBasisOpen,
    curveBundle,
    curveCardinal,
    curveCardinalClosed,
    curveCardinalOpen,
    curveCatmullRom,
    curveCatmullRomClosed,
    curveCatmullRomOpen,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveMonotoneY,
    curveNatural,
    curveStep,
    curveStepAfter,
    curveStepBefore,
} from 'd3-shape'

export const curvePropMapping = {
    basis: curveBasis,
    basisClosed: curveBasisClosed,
    basisOpen: curveBasisOpen,
    bundle: curveBundle,
    cardinal: curveCardinal,
    cardinalClosed: curveCardinalClosed,
    cardinalOpen: curveCardinalOpen,
    catmullRom: curveCatmullRom,
    catmullRomClosed: curveCatmullRomClosed,
    catmullRomOpen: curveCatmullRomOpen,
    linear: curveLinear,
    linearClosed: curveLinearClosed,
    monotoneX: curveMonotoneX,
    monotoneY: curveMonotoneY,
    natural: curveNatural,
    step: curveStep,
    stepAfter: curveStepAfter,
    stepBefore: curveStepBefore,
}

export const curvePropKeys = Object.keys(curvePropMapping)

export const curvePropType = PropTypes.oneOf(curvePropKeys)

export const closedCurvePropKeys = curvePropKeys.filter(c => c.endsWith('Closed'))

export const closedCurvePropType = PropTypes.oneOf(closedCurvePropKeys)

// Safe curves to be used with d3 area shape generator
export const areaCurvePropKeys = without(
    curvePropKeys,
    'bundle',
    'basisClosed',
    'basisOpen',
    'cardinalClosed',
    'cardinalOpen',
    'catmullRomClosed',
    'catmullRomOpen',
    'linearClosed'
)

export const areaCurvePropType = PropTypes.oneOf(areaCurvePropKeys)

// Safe curves to be used with d3 line shape generator
export const lineCurvePropKeys = without(
    curvePropKeys,
    'bundle',
    'basisClosed',
    'basisOpen',
    'cardinalClosed',
    'cardinalOpen',
    'catmullRomClosed',
    'catmullRomOpen',
    'linearClosed'
)

export const lineCurvePropType = PropTypes.oneOf(lineCurvePropKeys)

/**
 * Returns curve interpolator from given identifier.
 *
 * @param {string} id - Curve interpolator identifier
 * @return {Function}
 */
export const curveFromProp = id => {
    const curveInterpolator = curvePropMapping[id]
    if (!curveInterpolator) {
        throw new TypeError(`'${id}', is not a valid curve interpolator identifier.`)
    }

    return curvePropMapping[id]
}
