import { CartesianMarkersItem } from './CartesianMarkersItem'
import { CartesianMarkersProps } from './types'
import { DatumValue } from '../../../types'

export const CartesianMarkers = <
    X extends DatumValue = DatumValue,
    Y extends DatumValue = DatumValue
>({
    markers,
    width,
    height,
    xScale,
    yScale,
}: CartesianMarkersProps<X, Y>) => {
    if (!markers || markers.length === 0) return null
    const items = markers.map((marker, i) => (
        <CartesianMarkersItem
            key={i}
            {...marker}
            width={width}
            height={height}
            // @ts-ignore
            scale={marker.axis === 'y' ? yScale : xScale}
        />
    ))
    return <>{items}</>
}
