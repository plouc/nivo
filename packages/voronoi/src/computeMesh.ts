import { Delaunay } from 'd3-delaunay'
import { Margin } from '@nivo/core'
import { NodePositionAccessor } from './types'
import { defaultNodePositionAccessor, defaultMargin } from './defaults'

/**
 * The delaunay generator requires an array
 * where each point is defined as an array
 * of 2 elements: [x: number, y: number].
 *
 * Points represent the raw input data
 * and x/y represent accessors to x & y.
 */
export const computeMeshPoints = <Node>({
    points,
    getNodePosition = defaultNodePositionAccessor as NodePositionAccessor<Node>,
    margin = defaultMargin,
}: {
    points: readonly Node[]
    getNodePosition?: NodePositionAccessor<Node>
    margin?: Margin
}): [number, number][] => {
    return points.map(node => {
        const [x, y] = getNodePosition(node)

        return [x + margin.left, y + margin.top]
    })
}

export const computeMesh = ({
    points,
    width,
    height,
    margin = defaultMargin,
    debug,
}: {
    points: readonly [number, number][]
    width: number
    height: number
    margin?: Margin
    debug?: boolean
}) => {
    const delaunay = Delaunay.from(points)
    const voronoi = debug
        ? delaunay.voronoi([
              0,
              0,
              margin.left + width + margin.right,
              margin.top + height + margin.bottom,
          ])
        : undefined

    return { points, delaunay, voronoi }
}
