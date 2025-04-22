import { memo } from 'react'
import CartesianMarkersItem from './CartesianMarkersItem'

const CartesianMarkers = ({ markers, width, height, xScale, yScale }) => {
    if (!markers || markers.length === 0) return null

    return markers.map((marker, i) => (
        <CartesianMarkersItem
            key={i}
            {...marker}
            width={width}
            height={height}
            scale={marker.axis === 'y' ? yScale : xScale}
        />
    ))
}

export default memo(CartesianMarkers)
