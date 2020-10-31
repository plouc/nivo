/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { without } from 'lodash'
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

export const openedCurveInterpolationMapping = {
    basisOpen: curveBasisOpen,
    cardinalOpen: curveCardinalOpen,
    catmullRomOpen: curveCatmullRomOpen,
}
export type OpenedCurveInterpolationId = keyof typeof openedCurveInterpolationMapping

export const closedCurveInterpolationMapping = {
    basisClosed: curveBasisClosed,
    cardinalClosed: curveCardinalClosed,
    catmullRomClosed: curveCatmullRomClosed,
    linearClosed: curveLinearClosed,
}
export type ClosedCurveInterpolationId = keyof typeof closedCurveInterpolationMapping
export const closedCurvePropKeys = Object.keys(
    closedCurveInterpolationMapping
) as ClosedCurveInterpolationId[]
export const closedCurvePropType = PropTypes.oneOf(closedCurvePropKeys)

export const otherCurveInterpolationMapping = {
    basis: curveBasis,
    bundle: curveBundle,
    cardinal: curveCardinal,
    catmullRom: curveCatmullRom,
    linear: curveLinear,
    monotoneX: curveMonotoneX,
    monotoneY: curveMonotoneY,
    natural: curveNatural,
    step: curveStep,
    stepAfter: curveStepAfter,
    stepBefore: curveStepBefore,
}
export type OtherCurveInterpolationId = keyof typeof otherCurveInterpolationMapping

export const curveInterpolationMapping = {
    ...openedCurveInterpolationMapping,
    ...closedCurveInterpolationMapping,
    ...otherCurveInterpolationMapping,
}
export type CurveInterpolationId =
    | OpenedCurveInterpolationId
    | ClosedCurveInterpolationId
    | OtherCurveInterpolationId
export const curveInterpolationKeys = Object.keys(
    curveInterpolationMapping
) as CurveInterpolationId[]
export const curvePropType = PropTypes.oneOf(curveInterpolationKeys)

// Safe curves to be used with d3 area shape generator
export const areaCurvePropKeys = without(
    curveInterpolationKeys,
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

export type AreaCurve =
    | 'basis'
    | 'cardinal'
    | 'catmullRom'
    | 'linear'
    | 'monotoneX'
    | 'monotoneY'
    | 'natural'
    | 'step'
    | 'stepAfter'
    | 'stepBefore'

// Safe curves to be used with d3 line shape generator
export const lineCurvePropKeys = without(
    curveInterpolationKeys,
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
export const curveFromProp = (id: CurveInterpolationId) => {
    const curveInterpolator = curveInterpolationMapping[id]
    if (curveInterpolator === undefined) {
        throw new TypeError(`'${id}', is not a valid curve interpolator identifier.`)
    }

    return curveInterpolator
}
