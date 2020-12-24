import { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { Delaunay } from 'd3-delaunay'
import { computeMeshPoints, computeMesh, XYAccessor } from './computeMesh'
import { VoronoiCommonProps, VoronoiDatum, VoronoiCustomLayerProps } from './types'

export const useVoronoiMesh = <Datum>({
    points,
    x,
    y,
    width,
    height,
    debug,
}: {
    points: Datum[]
    x?: XYAccessor<Datum>
    y?: XYAccessor<Datum>
    width: number
    height: number
    debug?: boolean
}) => {
    const points2d = useMemo(
        () => computeMeshPoints<Datum>({ points, x, y }),
        [points, x, y]
    )

    return useMemo(() => computeMesh({ points: points2d, width, height, debug }), [
        points2d,
        width,
        height,
        debug,
    ])
}

export const useVoronoi = ({
    data,
    width,
    height,
    xDomain,
    yDomain,
}: {
    data: VoronoiDatum[]
    width: number
    height: number
    xDomain: VoronoiCommonProps['xDomain']
    yDomain: VoronoiCommonProps['yDomain']
}) => {
    const xScale = useMemo(() => scaleLinear().domain(xDomain).range([0, width]), [xDomain, width])
    const yScale = useMemo(() => scaleLinear().domain(yDomain).range([0, height]), [
        yDomain,
        height,
    ])

    const points = useMemo(
        () =>
            data.map(d => ({
                x: xScale(d.x),
                y: yScale(d.y),
                data: d,
            })),
        [data, xScale, yScale]
    )

    return useMemo(() => {
        const delaunay = Delaunay.from(points.map(p => [p.x, p.y]))
        const voronoi = delaunay.voronoi([0, 0, width, height])

        return {
            points,
            delaunay,
            voronoi,
        }
    }, [points, width, height])
}

/**
 * Memoize the context to pass to custom layers.
 */
export const useVoronoiLayerContext = ({
    points,
    delaunay,
    voronoi,
}: VoronoiCustomLayerProps): VoronoiCustomLayerProps =>
    useMemo(
        () => ({
            points,
            delaunay,
            voronoi,
        }),
        [points, delaunay, voronoi]
    )
