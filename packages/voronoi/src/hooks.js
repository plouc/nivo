/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { computeMeshPoints, computeMesh } from './computeMesh'

export const useVoronoiMesh = ({ points, x, y, width, height, debug }) => {
    const points2d = useMemo(() => computeMeshPoints({ points, x, y }), [points, x, y])

    return useMemo(() => computeMesh({ points: points2d, width, height, debug }), [
        points2d,
        width,
        height,
        debug,
    ])
}
