import { createElement } from 'react'
import { BumpDatum, BumpPoint, BumpPointComponent, BumpSerieExtraProps } from './types'

interface PointsProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    points: BumpPoint<Datum, ExtraProps>[]
    pointComponent: BumpPointComponent<Datum, ExtraProps>
}

export const Points = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    points,
    pointComponent,
}: PointsProps<Datum, ExtraProps>) => (
    <>
        {points.map(point =>
            createElement(pointComponent, {
                key: point.id,
                point,
            })
        )}
    </>
)
