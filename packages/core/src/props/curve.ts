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

export const CurveInterpolators = {
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

export const curveInterpolatorIds = Object.keys(CurveInterpolators)
export type CurveFactoryId = keyof typeof CurveInterpolators

export const closedCurveInterpolatorIds = [
    'basisClosed',
    'cardinalClosed',
    'catmullRomClosed',
    'linearClosed',
] as const
export type ClosedCurveFactoryId = typeof closedCurveInterpolatorIds[number]

// Safe curves to be used with d3 line and area generators
export const lineCurveInterpolatorIds = [
    'basis',
    'cardinal',
    'catmullRom',
    'linear',
    'monotoneX',
    'monotoneY',
    'natural',
    'step',
    'stepAfter',
    'stepBefore',
] as const
export type AreaCurveFactoryId = typeof lineCurveInterpolatorIds[number]
export type LineCurveFactoryId = typeof lineCurveInterpolatorIds[number]

/** get curve interpolator from given identifier. */
export const curveFromProp = (id: CurveFactoryId) => {
    const curveInterpolator = CurveInterpolators[id]
    if (!curveInterpolator) {
        throw new TypeError(`'${id}', is not a valid curve interpolator identifier.`)
    }
    return curveInterpolator
}
