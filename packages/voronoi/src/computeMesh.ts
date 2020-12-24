import { Delaunay } from 'd3-delaunay'

type NumberPropertyNames<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export type XYAccessor<Datum> = NumberPropertyNames<Datum> | ((datum: Datum) => number)

const getAccessor = <Datum>(directive: XYAccessor<Datum>) =>
    typeof directive === 'function' ? directive : (datum: Datum) => datum[directive]

/**
 * The delaunay generator requires an array
 * where each point is defined as an array
 * of 2 elements: [x: number, y: number].
 *
 * Points represent the raw input data
 * and x/y represent accessors to x & y.
 */
export const computeMeshPoints = <Datum>({
    points,
    x = 'x' as NumberPropertyNames<Datum>,
    y = 'y' as NumberPropertyNames<Datum>,
}: {
    points: Datum[]
    x?: XYAccessor<Datum>
    y?: XYAccessor<Datum>
}): [number, number][] => {
    const getX = getAccessor<Datum>(x)
    const getY = getAccessor<Datum>(y)

    return points.map(point => [getX(point) as number, getY(point) as number])
}

export const computeMesh = ({
    points,
    width,
    height,
    debug,
}: {
    points: [number, number][]
    width: number
    height: number
    debug?: boolean
}) => {
    const delaunay = Delaunay.from(points)
    const voronoi = debug ? delaunay.voronoi([0, 0, width, height]) : undefined

    return { delaunay, voronoi }
}
