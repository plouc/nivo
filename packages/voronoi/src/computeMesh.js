import { Delaunay } from 'd3-delaunay'

const getAccessor = directive => (typeof directive === 'function' ? directive : d => d[directive])

export const computeMeshPoints = ({ points, xAccessor, yAccessor }) => {
    const getX = getAccessor(xAccessor)
    const getY = getAccessor(yAccessor)

    return {
        points: points.map(p => [getX(p), getY(p)]),
    }
}

export const computeMesh = ({ points, width, height, debug }) => {
    const delaunay = Delaunay.from(points)
    const voronoi = debug === true ? delaunay.voronoi([0, 0, width, height]) : undefined

    return { delaunay, voronoi }
}
