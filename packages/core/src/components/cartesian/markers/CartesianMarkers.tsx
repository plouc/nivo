import { memo } from 'react'
import { CartesianMarkersItem } from './CartesianMarkersItem'
import { CartesianMarkersProps } from './types'

export const CartesianMarkers = memo(
    ({ markers, width, height, xScale, yScale }: CartesianMarkersProps) => {
        if (!markers || markers.length === 0) return null
        const items = markers.map((marker, i) => (
            <CartesianMarkersItem
                key={i}
                {...marker}
                width={width}
                height={height}
                scale={marker.axis === 'y' ? yScale : xScale}
            />
        ))
        return <>{items}</>
    }
)
