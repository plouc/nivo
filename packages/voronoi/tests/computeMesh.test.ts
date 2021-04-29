import { computeMesh } from '../src'

it(`should be able to compute mesh for collinear points`, () => {
    const points: [number, number][] = [
        [0, 0],
        [50, 50],
        [100, 100],
    ]

    const { voronoi } = computeMesh({ points, width: 500, height: 500, debug: true })

    const cells = Array.from(voronoi!.cellPolygons())
    expect(cells).toHaveLength(3)
})

it(`should be able to compute mesh for a single point`, () => {
    const points: [number, number][] = [[50, 50]]

    const { voronoi } = computeMesh({ points, width: 500, height: 500, debug: true })

    const cells = Array.from(voronoi!.cellPolygons())
    expect(cells).toHaveLength(1)
})
