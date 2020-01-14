/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { curveFromProp, CurveInterpolationId } from '../props'

/**
 * Transform d3 curve interpolation identifier
 * to its corresponding interpolator.
 */
export const useCurveInterpolation = (interpolation: CurveInterpolationId) => {
    return useMemo(() => {
        return curveFromProp(interpolation)
    }, [interpolation])
}
