import { createElement } from 'react'
import { BumpDatum, BumpPoint, BumpPointComponent } from './types'

interface PointsProps<D extends BumpDatum> {
    points: BumpPoint<D>[]
    pointComponent: BumpPointComponent<D>
}

export const Points = <D extends BumpDatum>({ points, pointComponent }: PointsProps<D>) => {
    return (
        <>
            {points.map(point =>
                createElement(pointComponent, {
                    key: point.id,
                    point,
                })
            )}
        </>
    )
}
