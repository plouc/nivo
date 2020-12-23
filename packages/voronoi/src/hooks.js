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
